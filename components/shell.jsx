/* global React, Icon, TridentMark, SFI_GROUPS, SHIP_INFO */
const { useState: uS, useEffect: uE, useMemo: uM } = React;

// =================== ADMIN SHELL ===================
window.AdminShell = function AdminShell({ active, setActive, children, mode, setMode, vessel, setVessel }) {
  const vesselOptionsSeed = [
    { name: 'Sea Wolf X', meta: 'IMO 1234567 · 52.4 m · 2018' },
    { name: 'Aquila One', meta: 'IMO 7654321 · 47.8 m · 2021' },
    { name: 'Odyssey Blue', meta: 'IMO 8844210 · 61.2 m · 2020' },
  ];
  const [vessels, setVessels] = uS(vesselOptionsSeed);
  const [shipMenuOpen, setShipMenuOpen] = uS(false);
  const [vesselModalOpen, setVesselModalOpen] = uS(false);
  const activeVessel = vessel || vessels[0];
  const emptySections = new Set(['assets', 'alerts', 'certificates', 'metrics', 'kb', 'pms', 'finance', 'users']);
  const showEmptyWorkspace = activeVessel.empty && emptySections.has(active);

  const addVessel = (event) => {
    event.stopPropagation();
    setShipMenuOpen(false);
    setVesselModalOpen(true);
  };

  const createVessel = (draft) => {
    const name = draft.name.trim() || `New Vessel ${vessels.length + 1}`;
    const length = draft.length.trim();
    const buildYear = draft.buildYear.trim();
    const imo = draft.imo.trim();
    const next = {
      ...draft,
      name,
      meta: `IMO ${imo || 'pending'} · ${length || '—'} m · ${buildYear || '—'}`,
      empty: true,
      createdAt: 'just now',
    };
    setVessels(prev => [...prev, next]);
    setVessel?.(next);
    setActive('assets');
    setVesselModalOpen(false);
  };

  const navItems = [
    { group: 'Vessel data', items: [
      { id: 'assets', label: 'Asset Register', icon: 'asset', badge: '2.2k' },
      { id: 'alerts', label: 'Alerts', icon: 'alert', badge: 3 },
      { id: 'certificates', label: 'Certificates', icon: 'doc', badge: 181 },
      { id: 'metrics', label: 'Metrics catalog', icon: 'metrics', badge: '1.2k' },
      { id: 'kb', label: 'Knowledge Base', icon: 'kb', badge: 172 },
      { id: 'pms', label: 'PMS', icon: 'pms', badge: 18 },
      { id: 'finance', label: 'Accounting', icon: 'finance' },
    ]},
    { group: 'People', items: [
      { id: 'users', label: 'Crew users', icon: 'users' },
    ]},
    { group: 'Platform', items: [
      { id: 'adminUsers', label: 'Admin users', icon: 'users' },
      { id: 'fleetManagers', label: 'Fleet managers', icon: 'users' },
      { id: 'rag', label: 'RAG / AI settings', icon: 'rag' },
    ]},
  ];

  const childrenToRender = showEmptyWorkspace
    ? React.Children.map(children, child => (
        child?.props?.className === 'content'
          ? <div className="content"><EmptyVesselPage active={active} vessel={activeVessel} /></div>
          : child
      ))
    : children;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-brand-mark">
            <img className="sb-brand-logo" src="assets/trident-virtual-mark.png" alt="Trident Virtual mark" />
          </div>
          <div>
            <div className="sb-brand-text">Trident<br/>Intelligence<br/>Platform</div>
            <div className="sb-brand-sub">Admin Panel</div>
          </div>
        </div>

        <div className={`sb-ship ${shipMenuOpen ? 'open' : ''}`} onClick={() => setShipMenuOpen(open => !open)}>
          <div className="sb-ship-label">Active Vessel</div>
          <div className="sb-ship-name">{activeVessel.name} <Icon name="chevron-down" size={14} /></div>
          <div className="sb-ship-meta">{activeVessel.meta}</div>
          {shipMenuOpen && (
            <div className="sb-ship-dropdown" onClick={(event) => event.stopPropagation()}>
              <div className="sb-ship-dropdown-title">Yachts</div>
              {vessels.map(option => (
                <button
                  key={option.name}
                  className={`vessel-option ${activeVessel.name === option.name ? 'active' : ''}`}
                  onClick={() => { setVessel?.(option); setShipMenuOpen(false); }}
                >
                  <span>{option.name}</span>
                  <small>{option.meta}</small>
                </button>
              ))}
              <button className="vessel-add-btn" onClick={addVessel}>
                <Icon name="plus" size={13} /> Add vessel
              </button>
            </div>
          )}
        </div>

        <nav className="sb-nav">
          {navItems.map(g => (
            <div className="sb-section" key={g.group}>
              <div className="sb-section-title">{g.group}</div>
              {g.items.map(it => (
                <div key={it.id} className={`sb-link ${active === it.id ? 'active' : ''}`} onClick={() => setActive(it.id)}>
                  <Icon name={it.icon} size={15} />
                  <span>{it.label}</span>
                  {it.badge && !(activeVessel.empty && emptySections.has(it.id)) && <span className="sb-badge">{it.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sb-foot">
          <div className="sb-link" onClick={() => setMode('user')}>
            <Icon name="chevron-left" size={14} /> <span>Back to app</span>
          </div>
        </div>
      </aside>

      <main className="main">
        {childrenToRender}
      </main>

      {vesselModalOpen && (
        <VesselOnboardingModal
          onClose={() => setVesselModalOpen(false)}
          onCreate={createVessel}
        />
      )}
    </div>
  );
};

function VesselOnboardingModal({ onClose, onCreate }) {
  const awsOrgs = [
    'aws-prod-seawolfx-metrics',
    'aws-med-yacht-ops',
    'aws-charter-fleet-live',
    'aws-newbuild-commissioning',
  ];
  const [draft, setDraft] = uS({
    name: '',
    organization: awsOrgs[0],
    imo: '',
    mmsi: '',
    callSign: '',
    flag: '',
    length: '',
    buildYear: '',
    shipyard: '',
    classSociety: '',
    homePort: '',
    metricsBucket: '',
    managerEmail: '',
  });
  const setField = (field, value) => setDraft(prev => ({ ...prev, [field]: value }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-vessel" onClick={event => event.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-icon"><Icon name="ship" size={16} /></div>
          <div>
            <div className="modal-title">Add vessel workspace</div>
            <div className="modal-sub">Create an empty yacht profile and connect it to the AWS organization that stores live metrics.</div>
          </div>
          <button className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-body vessel-form-grid">
          <VesselField label="Vessel / group name">
            <input className="input" value={draft.name} onChange={event => setField('name', event.target.value)} placeholder="Project Atlas" autoFocus />
          </VesselField>
          <VesselField label="AWS organization">
            <select className="input" value={draft.organization} onChange={event => setField('organization', event.target.value)}>
              {awsOrgs.map(org => <option key={org}>{org}</option>)}
            </select>
          </VesselField>
          <VesselField label="IMO">
            <input className="input" value={draft.imo} onChange={event => setField('imo', event.target.value)} placeholder="pending" />
          </VesselField>
          <VesselField label="MMSI">
            <input className="input" value={draft.mmsi} onChange={event => setField('mmsi', event.target.value)} placeholder="319000000" />
          </VesselField>
          <VesselField label="Call sign">
            <input className="input" value={draft.callSign} onChange={event => setField('callSign', event.target.value)} placeholder="ZCXA7" />
          </VesselField>
          <VesselField label="Flag">
            <input className="input" value={draft.flag} onChange={event => setField('flag', event.target.value)} placeholder="Cayman Islands" />
          </VesselField>
          <VesselField label="Length, m">
            <input className="input" value={draft.length} onChange={event => setField('length', event.target.value)} placeholder="52.4" />
          </VesselField>
          <VesselField label="Build year">
            <input className="input" value={draft.buildYear} onChange={event => setField('buildYear', event.target.value)} placeholder="2026" />
          </VesselField>
          <VesselField label="Shipyard">
            <input className="input" value={draft.shipyard} onChange={event => setField('shipyard', event.target.value)} placeholder="Lurssen" />
          </VesselField>
          <VesselField label="Class society">
            <input className="input" value={draft.classSociety} onChange={event => setField('classSociety', event.target.value)} placeholder="Lloyd's Register" />
          </VesselField>
          <VesselField label="Home port">
            <input className="input" value={draft.homePort} onChange={event => setField('homePort', event.target.value)} placeholder="George Town" />
          </VesselField>
          <VesselField label="Metrics bucket">
            <input className="input" value={draft.metricsBucket} onChange={event => setField('metricsBucket', event.target.value)} placeholder="nmea/project-atlas/live" />
          </VesselField>
          <VesselField label="Fleet manager email">
            <input className="input" value={draft.managerEmail} onChange={event => setField('managerEmail', event.target.value)} placeholder="manager@example.com" />
          </VesselField>
          <div className="vessel-empty-note">
            <strong>New vessel starts empty.</strong>
            <span>Asset Register, certificates, metrics, manuals, PMS, accounting and crew users will show zero records until imports are uploaded.</span>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onCreate(draft)}><Icon name="plus" size={13} /> Create vessel</button>
        </div>
      </div>
    </div>
  );
}

function VesselField({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function EmptyVesselPage({ active, vessel }) {
  const config = {
    assets: ['Asset Register', 'Import the SFI hierarchy or add the first asset manually.', 'Import asset register', 'Add first asset'],
    alerts: ['Alerts', 'No telemetry rules are configured yet.', 'Create alert rule', 'Connect metrics'],
    certificates: ['Certificates', 'Upload the vessel certificate list with issue and expiry dates.', 'Upload certificates', 'Add certificate'],
    metrics: ['Metrics catalog', 'Connect the AWS organization and map live metric names to SFI assets.', 'Connect AWS metrics', 'Import mapping'],
    kb: ['Knowledge Base', 'Upload manuals, SOPs and procedures for this vessel.', 'Upload documents', 'Auto-categorize'],
    pms: ['Planned Maintenance', 'Import the existing PMS export and map tasks back to Asset Register.', 'Import PMS', 'New task'],
    finance: ['Accounting', 'Import the first monthly finance workbook for this vessel.', 'Import finance xlsx', 'Add invoice'],
    users: ['Crew users', 'Invite crew after the vessel profile is ready.', 'Invite crew user', 'Import crew list'],
  }[active] || ['New vessel', 'This section is empty for the new vessel.', 'Start import', 'Add record'];

  return (
    <div className="page empty-vessel-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{config[0]}</h1>
          <p className="page-subtitle">{vessel.name} is a fresh vessel workspace. {config[1]}</p>
        </div>
      </div>
      <div className="empty-vessel-card">
        <div className="empty-vessel-icon"><Icon name="ship" size={22} /></div>
        <div>
          <h2>0 records loaded</h2>
          <p>All vessel data and people sections are intentionally blank for this new yacht. Load source files from the vessel to populate the admin panel.</p>
        </div>
        <div className="empty-vessel-actions">
          <button className="btn btn-primary"><Icon name="upload" size={13} /> {config[2]}</button>
          <button className="btn"><Icon name="plus" size={13} /> {config[3]}</button>
        </div>
      </div>
      <div className="empty-vessel-meta">
        <div><span>AWS organization</span><strong>{vessel.organization || 'Not selected'}</strong></div>
        <div><span>Metrics bucket</span><strong>{vessel.metricsBucket || 'Pending'}</strong></div>
        <div><span>Class society</span><strong>{vessel.classSociety || 'Pending'}</strong></div>
        <div><span>Home port</span><strong>{vessel.homePort || 'Pending'}</strong></div>
      </div>
    </div>
  );
}

// =================== TOPBAR ===================
window.Topbar = function Topbar({ crumbs = [], actions, theme, setTheme }) {
  return (
    <div className="topbar">
      <div className="crumbs">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Icon name="chevron-right" size={12} />}
            {i === crumbs.length - 1 ? <strong>{c}</strong> : <span>{c}</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="actions">
        {actions}
        <button className="icon-btn" title="Search" onClick={() => {}}><Icon name="search" size={15} /></button>
        <button className="icon-btn" title="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
        </button>
        <div className="avatar">S</div>
      </div>
    </div>
  );
};
