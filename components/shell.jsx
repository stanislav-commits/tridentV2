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
  const activeVessel = vessel || vessels[0];

  const addVessel = (event) => {
    event.stopPropagation();
    const next = {
      name: `New Vessel ${vessels.length + 1}`,
      meta: 'IMO pending · Draft profile',
    };
    setVessels(prev => [...prev, next]);
    setVessel?.(next);
    setShipMenuOpen(false);
  };

  const navItems = [
    { group: 'Operations', items: [
      { id: 'dashboard', label: 'Overview', icon: 'dashboard' },
      { id: 'alerts', label: 'Alerts', icon: 'alert', badge: 3 },
      { id: 'audit', label: 'Audit log', icon: 'audit' },
    ]},
    { group: 'Vessel data', items: [
      { id: 'assets', label: 'Asset Register', icon: 'asset', badge: '2.2k' },
      { id: 'metrics', label: 'Metrics catalog', icon: 'metrics', badge: '1.2k' },
      { id: 'kb', label: 'Knowledge Base', icon: 'kb', badge: 172 },
      { id: 'pms', label: 'PMS', icon: 'pms', badge: 18 },
      { id: 'compliance', label: 'Compliance', icon: 'compliance' },
      { id: 'finance', label: 'Accounting', icon: 'finance' },
    ]},
    { group: 'People', items: [
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'crew', label: 'Crew & Watch', icon: 'crew' },
    ]},
    { group: 'Platform', items: [
      { id: 'rag', label: 'RAG / AI settings', icon: 'rag' },
    ]},
  ];

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
                  {it.badge && <span className="sb-badge">{it.badge}</span>}
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
        {children}
      </main>
    </div>
  );
};

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
