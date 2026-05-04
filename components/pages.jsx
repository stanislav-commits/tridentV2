/* global React, Icon, CERTIFICATE_GROUPS */
const { useState: usMisc, useMemo: umMisc } = React;

// ============ METRICS CATALOG ============
window.MetricsPage = function MetricsPage() {
  const buckets = ['All buckets', 'NMEA', 'Engines', 'Tanks', 'HVAC', 'Electrical', 'Bilge', 'Navigation', 'Environment'];
  const rows = [
    ['NMEA', 'environment.depth.belowKeel::value', 'Measures the water depth below the vessel\'s keel, based on NMEA standards.', '02.4', 'live'],
    ['NMEA', 'environment.depth.belowSurface::value', 'Measures the water depth below the surface at the vessel\'s current location.', '02.4', 'live'],
    ['NMEA', 'environment.depth.belowTransducer::value', 'Measures the water depth directly beneath the depth transducer.', '09.6', 'live'],
    ['NMEA', 'environment.mode::value', 'Indicates the current operational mode of the vessel\'s environment system.', null, 'live'],
    ['NMEA', 'environment.moon.angle::value', 'Measures the current angle of the moon relative to a reference point.', null, 'live'],
    ['NMEA', 'environment.moon.fraction::value', 'Represents the current visible fraction of the moon.', null, 'live'],
    ['NMEA', 'environment.moon.phaseName::value', 'Indicates the current phase of the moon as a descriptive name.', null, 'disabled'],
    ['NMEA', 'engines.port.rpm', 'Main engine port RPM.', '02.1.001', 'live'],
    ['NMEA', 'engines.port.coolant.temp', 'Coolant temperature, port main engine.', '02.1.001', 'live'],
    ['NMEA', 'engines.port.fuel.rate', 'Fuel consumption rate, port main engine.', '02.1.001', 'live'],
    ['NMEA', 'engines.stbd.rpm', 'Main engine starboard RPM.', '02.1.002', 'live'],
    ['NMEA', 'tanks.fuel.port.level', 'Fuel level in port main tank.', '02.4', 'live'],
    ['NMEA', 'tanks.fuel.stbd.level', 'Fuel level in starboard main tank.', '02.4', 'live'],
    ['NMEA', 'tanks.bilge.alarm', 'Bilge level alarm.', '04.4', 'live'],
    ['NMEA', 'electrical.shore.connected', 'Shore power connection status.', '05.2', 'live'],
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Metrics catalog</h1>
          <p className="page-subtitle">Manage both the raw InfluxDB metric catalog and the semantic concepts that power chat resolution.</p>
        </div>
        <div className="page-actions">
          <span className="seg">
            <button className="seg-btn active">Raw catalog</button>
            <button className="seg-btn">Semantic layer</button>
          </span>
          <button className="btn"><Icon name="rag" size={13} /> Sync from Influx</button>
        </div>
      </div>

      <div className="card" style={{marginBottom: 16}}>
        <div style={{padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, borderBottom: '1px solid var(--line)'}}>
          <label className="field" style={{margin: 0}}>
            <span className="field-label">Ship</span>
            <select className="input"><option>Sea Wolf X — SeaWolfX</option></select>
          </label>
          <label className="field" style={{margin: 0}}>
            <span className="field-label">Bucket</span>
            <select className="input">{buckets.map(b => <option key={b}>{b}</option>)}</select>
          </label>
          <label className="field" style={{margin: 0}}>
            <span className="field-label">Search</span>
            <input className="input input-search" placeholder="Search by key, bucket, field, or description" />
          </label>
        </div>
        <div style={{padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12}}>
          <span className="seg">
            <button className="seg-btn active">All</button>
            <button className="seg-btn">Enabled</button>
            <button className="seg-btn">Disabled</button>
            <button className="seg-btn">Linked to SFI</button>
          </span>
          <button className="btn btn-sm">Enable all</button>
          <button className="btn btn-sm">Disable all</button>
          <span style={{flex: 1}} />
          <span className="text-3 mono" style={{fontSize: 11}}>Last sync 19 Apr 2026, 17:21</span>
          <span className="text-3" style={{fontSize: 12}}>1–25 of 1,207</span>
        </div>
        <table className="dt dt-compact">
          <thead>
            <tr>
              <th style={{width: 28}}><span className="checkbox checked" /></th>
              <th style={{width: 80}}>Bucket</th>
              <th style={{width: 320}}>Key</th>
              <th>Description</th>
              <th style={{width: 80}}>SFI</th>
              <th style={{width: 80}}>Status</th>
              <th style={{width: 60}}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td><span className="checkbox checked" /></td>
                <td><span className="pill pill-info">{r[0]}</span></td>
                <td className="cell-mono">{r[1]}</td>
                <td>{r[2]}</td>
                <td>{r[3] ? <span className="pill mono">{r[3]}</span> : <span className="text-4" style={{fontSize: 11}}>—</span>}</td>
                <td>{r[4] === 'live' ? <span className="pill pill-ok"><span className="dot dot-ok" /> LIVE</span> : <span className="pill pill-soft">OFF</span>}</td>
                <td><button className="btn btn-sm btn-ghost"><Icon name="edit" size={11} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ USERS ============
window.UsersPage = function UsersPage() {
  const initialUsers = [
    { id: 'temp-admin-2026@trident-virtual.com', name: 'Temporary Admin', role: 'Admin', ship: '—', lastSeen: '1m ago', twoFactor: 'ON', status: 'Active', initial: 'T' },
    { id: 'crew-047e06', name: 'Jogn Sina', role: 'Crew', ship: 'Sea Wolf X', lastSeen: '14m ago', twoFactor: 'OFF', status: 'Invite pending', initial: 'J' },
    { id: 'stanislav@trident-virtual.com', name: 'Stanislav', role: 'Admin', ship: '—', lastSeen: 'now', twoFactor: 'ON', status: 'Active', initial: 'S' },
  ];
  const [users, setUsers] = usMisc(initialUsers);
  const [query, setQuery] = usMisc('');
  const [roleFilter, setRoleFilter] = usMisc('All');
  const [showAdd, setShowAdd] = usMisc(false);
  const [notice, setNotice] = usMisc('');
  const [draft, setDraft] = usMisc({ name: '', id: '', role: 'Crew', ship: 'Sea Wolf X' });

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'All' || `${user.role}s` === roleFilter;
    const haystack = `${user.name} ${user.id} ${user.role} ${user.ship}`.toLowerCase();
    return matchesRole && haystack.includes(query.trim().toLowerCase());
  });

  const addUser = () => {
    const name = draft.name.trim() || 'New Crew Member';
    const id = draft.id.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setUsers(prev => [...prev, {
      id,
      name,
      role: draft.role,
      ship: draft.ship || '—',
      lastSeen: 'never',
      twoFactor: 'OFF',
      status: 'Invite pending',
      initial: name.charAt(0).toUpperCase(),
    }]);
    setDraft({ name: '', id: '', role: 'Crew', ship: 'Sea Wolf X' });
    setNotice(`Invite prepared for ${name}`);
    setShowAdd(false);
  };

  const resetPassword = (user) => {
    setUsers(prev => prev.map(row => row.id === user.id ? { ...row, status: 'Reset pending' } : row));
    setNotice(`Password reset link prepared for ${user.name}`);
  };

  const removeUser = (user) => {
    setUsers(prev => prev.filter(row => row.id !== user.id));
    setNotice(`${user.name} removed from this view`);
  };

  const counts = {
    total: users.length,
    admins: users.filter(user => user.role === 'Admin').length,
    crew: users.filter(user => user.role === 'Crew').length,
    captains: users.filter(user => user.role === 'Captain').length,
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Manage crew accounts, invitations, vessel assignment and role-based access.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Icon name="plus" size={13} /> Add user</button>
        </div>
      </div>
      <div className="user-summary-grid">
        <div className="mini-stat"><span>Total users</span><strong>{counts.total}</strong></div>
        <div className="mini-stat"><span>Admins</span><strong>{counts.admins}</strong></div>
        <div className="mini-stat"><span>Crew</span><strong>{counts.crew}</strong></div>
        <div className="mini-stat"><span>Captains</span><strong>{counts.captains}</strong></div>
      </div>
      <div className="card">
        <div className="users-toolbar">
          <input className="input input-search" value={query} onChange={event => setQuery(event.target.value)} style={{maxWidth: 320}} placeholder="Search users…" />
          <span className="seg">
            {['All', 'Admins', 'Crew', 'Captains'].map(label => (
              <button key={label} className={`seg-btn ${roleFilter === label ? 'active' : ''}`} onClick={() => setRoleFilter(label)}>{label}</button>
            ))}
          </span>
          <span style={{flex: 1}} />
          {notice && <span className="pill pill-info">{notice}</span>}
          <span className="text-3" style={{fontSize: 12}}>{filteredUsers.length} users</span>
        </div>
        <table className="dt">
          <thead>
            <tr>
              <th style={{width: 32}}>#</th>
              <th>User ID</th>
              <th style={{width: 160}}>Name</th>
              <th style={{width: 100}}>Role</th>
              <th style={{width: 140}}>Ship</th>
              <th style={{width: 90}}>2FA</th>
              <th style={{width: 140}}>Last seen</th>
              <th style={{width: 130}}>Status</th>
              <th style={{width: 260, textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td><div className="avatar" style={{width: 24, height: 24, fontSize: 10}}>{user.initial}</div></td>
                <td className="cell-mono" style={{fontSize: 11.5}}>{user.id}</td>
                <td className="cell-strong">{user.name}</td>
                <td><span className={user.role === 'Admin' ? 'pill pill-info' : user.role === 'Captain' ? 'pill pill-accent' : 'pill pill-soft'}>{user.role.toUpperCase()}</span></td>
                <td className={user.ship === '—' ? 'text-3' : ''}>{user.ship}</td>
                <td>{user.twoFactor === 'ON' ? <span className="pill pill-ok">ON</span> : <span className="pill pill-warn">OFF</span>}</td>
                <td className="text-3 mono" style={{fontSize: 11}}>{user.lastSeen}</td>
                <td><span className={user.status === 'Active' ? 'pill pill-ok' : 'pill pill-warn'}>{user.status}</span></td>
                <td className="cell-actions">
                  <button className="btn btn-sm" onClick={() => resetPassword(user)}>Reset password</button>
                  <button className="btn btn-sm btn-danger" onClick={() => removeUser(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAdd && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-head">
              <div className="modal-icon"><Icon name="users" size={16} /></div>
              <div><div className="modal-title">Add user</div><div className="modal-sub">Create an invitation and assign the user to a vessel role.</div></div>
              <button className="modal-close" onClick={() => setShowAdd(false)}><Icon name="x" size={16} /></button>
            </div>
            <div className="modal-body user-form-grid">
              <label className="field"><span className="field-label">Name</span><input className="input" value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} placeholder="Full name" /></label>
              <label className="field"><span className="field-label">User ID / email</span><input className="input" value={draft.id} onChange={event => setDraft({ ...draft, id: event.target.value })} placeholder="crew@example.com" /></label>
              <label className="field"><span className="field-label">Role</span><select className="input" value={draft.role} onChange={event => setDraft({ ...draft, role: event.target.value })}><option>Admin</option><option>Crew</option><option>Captain</option></select></label>
              <label className="field"><span className="field-label">Ship</span><select className="input" value={draft.ship} onChange={event => setDraft({ ...draft, ship: event.target.value })}><option>Sea Wolf X</option><option>Aquila One</option><option>Odyssey Blue</option><option>—</option></select></label>
            </div>
            <div className="modal-foot">
              <button className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addUser}><Icon name="plus" size={13} /> Add user</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ SHIPS ============
window.ShipsPage = function ShipsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Ships</h1>
          <p className="page-subtitle">Vessel registry — add ships, edit base data, and assign crew.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary"><Icon name="plus" size={13} /> Add ship</button>
        </div>
      </div>
      <div className="card">
        <table className="dt">
          <thead>
            <tr>
              <th>Ship name</th>
              <th>Organization</th>
              <th>IMO</th>
              <th>Build</th>
              <th>Assets</th>
              <th>Crew</th>
              <th>Updated</th>
              <th style={{width: 140, textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cell-strong">Sea Wolf X</td>
              <td>SeaWolfX</td>
              <td className="cell-mono">1234567</td>
              <td className="cell-mono">2018</td>
              <td className="cell-mono">2,247</td>
              <td className="cell-mono">14</td>
              <td className="cell-mono" style={{fontSize: 11}}>21 Apr 2026</td>
              <td className="cell-actions">
                <button className="btn btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ ALERTS ============
window.AlertsPage = function AlertsPage() {
  const alerts = [
    { sev: 'danger', src: '02.1.010', msg: 'Engine Mount Stbd AFT — vibration above threshold (8.2 mm/s)', when: '14:31:02', cat: 'Vibration' },
    { sev: 'warn', src: '04.4.003', msg: 'Bilge Lazarette — water level rising trend (last 30 min)', when: '13:48:11', cat: 'Bilge' },
    { sev: 'warn', src: '02.1.005', msg: 'Emergency Generator — preheat circuit fault during weekly test', when: '12:02:54', cat: 'Electrical' },
    { sev: 'info', src: 'F01', msg: 'Certificate IOPP expires in 62 days', when: '08:00:00', cat: 'Compliance' },
    { sev: 'info', src: '06.1', msg: 'Chiller 2 — refrigerant pressure approaching low limit', when: 'Yesterday 22:14', cat: 'HVAC' },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Alerts</h1>
          <p className="page-subtitle">Live alerts from telemetry and rule engine.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="filter" size={13} /> Filter</button>
          <button className="btn">Acknowledge all</button>
          <button className="btn btn-primary"><Icon name="plus" size={13} /> Add alert rule</button>
        </div>
      </div>
      <div className="alerts-list">
        {alerts.map((a, i) => (
          <div key={i} className={`alert-row alert-${a.sev}`}>
            {a.sev === 'danger' && <span className="dot dot-danger" />}
            {a.sev === 'warn' && <span className="dot dot-warn" />}
            {a.sev === 'info' && <span className="dot dot-info" />}
            <span className="alert-source">{a.src}</span>
            <span className="alert-msg">{a.msg}</span>
            <span><span className="pill pill-soft">{a.cat}</span></span>
            <span className="alert-time">{a.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ PMS BOARD ============
window.PMSPage = function PMSPage() {
  const cols = [
    { id: 'overdue', title: 'Overdue', count: 3, color: 'var(--danger)', cards: [
      { sfi: '02.1.001', t: '500h Service — ME Port', due: '−4d', who: 'Eng. M.', tags: ['Engines'] },
      { sfi: '07.1.001', t: 'Watermaker membrane flush', due: '−2d', who: '—', tags: ['Watermaker'] },
      { sfi: '08.3.014', t: 'Extinguisher annual — Galley', due: '−1d', who: 'Eng. M.', tags: ['Safety'] },
    ]},
    { id: 'thisweek', title: 'Due this week', count: 7, color: 'var(--warn)', cards: [
      { sfi: '02.1.003', t: 'Oil filter change — Gen 1', due: 'May 1', who: 'Eng. K.', tags: ['Generator'] },
      { sfi: '02.1.004', t: 'Oil filter change — Gen 2', due: 'May 1', who: 'Eng. K.', tags: ['Generator'] },
      { sfi: '02.4', t: 'Fuel tank inspection', due: 'May 2', who: '—', tags: ['Tanks'] },
      { sfi: '06.1.002', t: 'Chiller 2 refrigerant top-up', due: 'May 3', who: 'Eng. M.', tags: ['HVAC'] },
    ]},
    { id: 'inprogress', title: 'In progress', count: 4, color: 'var(--info)', cards: [
      { sfi: '02.1.005', t: 'Emergency Genset preheat circuit', due: 'started', who: 'Eng. M.', tags: ['Electrical'] },
      { sfi: '11.3.002', t: 'Hydraulic crane — annual', due: 'started', who: 'Bosun', tags: ['Deck'] },
    ]},
    { id: 'done', title: 'Done — last 7d', count: 14, color: 'var(--ok)', cards: [
      { sfi: '02.1.001', t: 'Daily inspection', due: '✓ Apr 28', who: 'Eng. M.', tags: ['Engines'] },
      { sfi: '02.1.002', t: 'Daily inspection', due: '✓ Apr 28', who: 'Eng. M.', tags: ['Engines'] },
      { sfi: '08.1', t: 'Fire panel test', due: '✓ Apr 27', who: 'Capt.', tags: ['Safety'] },
    ]},
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Planned Maintenance System</h1>
          <p className="page-subtitle">All maintenance tasks across SFI assets. Triggered by hours, calendar, or alerts.</p>
        </div>
        <div className="page-actions">
          <span className="seg">
            <button className="seg-btn active">Board</button>
            <button className="seg-btn">List</button>
            <button className="seg-btn">Calendar</button>
          </span>
          <button className="btn btn-primary"><Icon name="plus" size={13} /> New task</button>
        </div>
      </div>
      <div className="pms-board">
        {cols.map(c => (
          <div key={c.id} className="pms-col">
            <div className="pms-col-head">
              <span className="dot" style={{background: c.color}} />
              <span className="pms-col-title">{c.title}</span>
              <span className="pms-col-count">{c.count}</span>
            </div>
            <div className="pms-col-body">
              {c.cards.map((card, i) => (
                <div key={i} className="pms-card">
                  <span className="pms-asset">{card.sfi}</span>
                  <span className="pms-title">{card.t}</span>
                  <span className="pms-meta">
                    <span className="mono">{card.due}</span>
                    <span style={{flex: 1}} />
                    {card.tags.map(t => <span key={t} className="tag-soft">{t}</span>)}
                    <span>· {card.who}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ CERTIFICATES ============
window.CertificatesPage = function CertificatesPage() {
  const groups = window.CERTIFICATE_GROUPS || [];
  const [activeGroup, setActiveGroup] = usMisc('all');
  const [query, setQuery] = usMisc('');
  const [docs, setDocs] = usMisc({
    A01: 'CERT_A01_Registry.pdf',
    C05: 'CERT_C05_Safety_Equipment.pdf',
    F01: 'CERT_F01_IOPP.pdf',
    G01: 'CERT_G01_SMC.pdf',
  });
  const [issued, setIssued] = usMisc({
    A01: '2024-04-21',
    C05: '2025-02-15',
    F01: '2024-06-30',
    G01: '2025-03-01',
  });
  const [expires, setExpires] = usMisc({
    A01: '2027-04-21',
    C05: '2026-08-15',
    F01: '2026-06-30',
    G01: '2027-03-01',
  });

  const rows = umMisc(() => groups.flatMap(group => group.items.map(item => ({
    ...item,
    groupCode: group.code,
    groupTitle: group.title,
    section: group.section,
    id: item.code || `${group.code}-${item.title}`,
  }))), [groups]);

  const certRows = rows.filter(row => row.kind !== 'section');
  const filteredRows = rows.filter(row => {
    const inGroup = activeGroup === 'all' || row.groupCode === activeGroup;
    const haystack = `${row.code || ''} ${row.title} ${row.groupTitle} ${row.section || ''}`.toLowerCase();
    return inGroup && haystack.includes(query.trim().toLowerCase());
  });

  const setValue = (setter, key, value) => setter(prev => ({ ...prev, [key]: value }));
  const statusFor = (date) => {
    if (!date) return { label: 'NO DATE', className: 'pill pill-soft', days: null };
    const days = Math.ceil((new Date(`${date}T00:00:00`) - new Date()) / 86400000);
    if (days < 0) return { label: 'EXPIRED', className: 'pill pill-danger', days };
    if (days <= 90) return { label: `${days}D LEFT`, className: 'pill pill-warn', days };
    return { label: 'VALID', className: 'pill pill-ok', days };
  };

  const stats = {
    total: certRows.length,
    withDocs: certRows.filter(row => docs[row.id]).length,
    withDates: certRows.filter(row => issued[row.id] && expires[row.id]).length,
    expiring: certRows.filter(row => {
      const s = statusFor(expires[row.id]);
      return s.days !== null && s.days >= 0 && s.days <= 90;
    }).length,
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Certificates</h1>
          <p className="page-subtitle">Full vessel certificate register with issue dates, expiry dates and linked document uploads.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="download" size={13} /> Export</button>
          <button className="btn btn-primary"><Icon name="plus" size={13} /> Add certificate</button>
        </div>
      </div>

      <div className="cert-summary-grid">
        <div className="mini-stat"><span>Total certificates</span><strong>{stats.total}</strong></div>
        <div className="mini-stat"><span>Documents linked</span><strong>{stats.withDocs}</strong></div>
        <div className="mini-stat"><span>Dated records</span><strong>{stats.withDates}</strong></div>
        <div className="mini-stat"><span>Expiring soon</span><strong>{stats.expiring}</strong></div>
      </div>

      <div className="cert-layout">
        <div className="card cert-groups">
          <div className="cert-groups-head">Certificate groups</div>
          <button className={`cert-group-btn ${activeGroup === 'all' ? 'active' : ''}`} onClick={() => setActiveGroup('all')}>
            <span>All certificates</span>
            <small>{stats.total}</small>
          </button>
          {groups.map(group => (
            <button key={group.code} className={`cert-group-btn ${activeGroup === group.code ? 'active' : ''}`} onClick={() => setActiveGroup(group.code)}>
              <span className="mono">{group.code}</span>
              <span>{group.title}</span>
              <small>{group.items.filter(item => item.kind !== 'section').length}</small>
            </button>
          ))}
        </div>

        <div className="card cert-register">
          <div className="cert-toolbar">
            <input className="input input-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search certificates..." />
            <span className="text-3" style={{fontSize: 12}}>{filteredRows.filter(row => row.kind !== 'section').length} records</span>
          </div>
          <table className="dt cert-table">
            <thead>
              <tr>
                <th style={{width: 88}}>Code</th>
                <th>Certificate</th>
                <th style={{width: 145}}>Issue date</th>
                <th style={{width: 145}}>Expiry date</th>
                <th style={{width: 190}}>Document</th>
                <th style={{width: 110}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => {
                if (row.kind === 'section') {
                  return <tr key={row.id} className="cert-section-row"><td colSpan="6">{row.title}</td></tr>;
                }
                const status = statusFor(expires[row.id]);
                return (
                  <tr key={row.id}>
                    <td className="cell-mono">{row.code}</td>
                    <td>
                      {row.section && <div className="cert-section-label">{row.section}</div>}
                      <div className="cell-strong">{row.title}</div>
                      <div className="text-3" style={{fontSize: 11}}>{row.groupCode} · {row.groupTitle}</div>
                    </td>
                    <td>
                      <input className="input cert-date-input mono" type="date" value={issued[row.id] || ''} onChange={event => setValue(setIssued, row.id, event.target.value)} />
                    </td>
                    <td>
                      <input className="input cert-date-input mono" type="date" value={expires[row.id] || ''} onChange={event => setValue(setExpires, row.id, event.target.value)} />
                    </td>
                    <td>
                      <label className="btn btn-sm cert-upload-btn">
                        <Icon name="upload" size={11} /> {docs[row.id] ? 'Replace' : 'Upload'}
                        <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={event => setValue(setDocs, row.id, event.target.files?.[0]?.name || docs[row.id] || '')} />
                      </label>
                      {docs[row.id] ? <div className="cert-doc-name mono">{docs[row.id]}</div> : <div className="text-3" style={{fontSize: 11}}>No document</div>}
                    </td>
                    <td><span className={status.className}>{status.label}</span></td>
                  </tr>
                );
              })}
              {filteredRows.length === 0 && (
                <tr><td colSpan="6" className="text-3" style={{padding: 18}}>No certificates match this search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============ COMPLIANCE ============
window.CompliancePage = function CompliancePage() {
  const certs = [
    { name: 'SOLAS Safety Construction', issued: '2025-02-15', expires: '2027-02-15', issuer: 'BV', status: 'valid', daysLeft: 656 },
    { name: 'SOLAS Safety Equipment', issued: '2025-02-15', expires: '2026-08-15', issuer: 'BV', status: 'expiring', daysLeft: 108 },
    { name: 'IOPP (MARPOL Annex I)', issued: '2024-06-30', expires: '2026-06-30', issuer: 'BV', status: 'expiring', daysLeft: 62 },
    { name: 'Sewage (MARPOL Annex IV)', issued: '2024-09-01', expires: '2026-09-01', issuer: 'BV', status: 'expiring', daysLeft: 125 },
    { name: 'Garbage Mgmt Plan', issued: '2024-01-01', expires: '2027-01-01', issuer: 'Flag', status: 'valid', daysLeft: 612 },
    { name: 'MLC 2006', issued: '2024-04-01', expires: '2027-04-01', issuer: 'BV', status: 'valid', daysLeft: 702 },
    { name: 'Class — Hull', issued: '2023-04-01', expires: '2028-04-01', issuer: 'BV', status: 'valid', daysLeft: 1067 },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Compliance</h1>
          <p className="page-subtitle">ISM, SOPs, MARPOL and statutory certificates. The assistant uses these to answer compliance questions in real time.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="upload" size={13} /> Upload cert</button>
          <button className="btn btn-primary"><Icon name="plus" size={13} /> Add requirement</button>
        </div>
      </div>
      <div className="sub-tabs">
        <button className="sub-tab active">Certificates <span className="pill pill-soft" style={{padding:'0 5px'}}>28</span></button>
        <button className="sub-tab">ISM <span className="pill pill-soft" style={{padding:'0 5px'}}>4 sections</span></button>
        <button className="sub-tab">SOPs <span className="pill pill-soft" style={{padding:'0 5px'}}>12</span></button>
        <button className="sub-tab">MARPOL <span className="pill pill-soft" style={{padding:'0 5px'}}>5 annexes</span></button>
        <button className="sub-tab">Surveys</button>
      </div>
      <div className="card">
        <table className="dt">
          <thead>
            <tr>
              <th>Certificate</th>
              <th style={{width: 110}}>Issuer</th>
              <th style={{width: 110}}>Issued</th>
              <th style={{width: 110}}>Expires</th>
              <th style={{width: 200}}>Validity</th>
              <th style={{width: 100}}>Status</th>
              <th style={{width: 140, textAlign:'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.map(c => {
              const pct = Math.min(100, Math.max(0, c.daysLeft / 1095 * 100));
              return (
                <tr key={c.name}>
                  <td className="cell-strong">{c.name}</td>
                  <td>{c.issuer}</td>
                  <td className="cell-mono" style={{fontSize: 11}}>{c.issued}</td>
                  <td className="cell-mono" style={{fontSize: 11}}>{c.expires}</td>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <div style={{flex: 1, height: 4, background: 'var(--bg-3)', borderRadius: 4}}>
                        <div style={{height: '100%', width: `${pct}%`, background: c.status === 'expiring' ? 'var(--warn)' : 'var(--ok)', borderRadius: 4}} />
                      </div>
                      <span className="text-3 mono" style={{fontSize: 11, minWidth: 60, textAlign: 'right'}}>{c.daysLeft}d left</span>
                    </div>
                  </td>
                  <td>{c.status === 'valid' ? <span className="pill pill-ok">VALID</span> : <span className="pill pill-warn">EXPIRING</span>}</td>
                  <td className="cell-actions">
                    <button className="btn btn-sm"><Icon name="eye" size={11} /></button>
                    <button className="btn btn-sm">Renew</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ SIMPLE PLACEHOLDERS for remaining sections ============
window.AuditPage = function AuditPage() {
  const log = [
    ['2026-04-29 14:32:11', 'Stanislav', 'kb.upload', 'Uploaded MN_MASE_IS44_rev2.pdf'],
    ['2026-04-29 14:21:05', 'system', 'rag.index', 'Completed indexing CERT_SOLAS_2026.pdf — 18 chunks'],
    ['2026-04-29 13:48:32', 'system', 'alert.fire', 'Bilge Lazarette water level alarm'],
    ['2026-04-29 12:14:08', 'Capt. Aliyev', 'pms.close', 'Closed task #2018 — Oil filter Generator 1'],
    ['2026-04-29 11:02:50', 'Stanislav', 'asset.link', 'Linked 12 manuals to SFI 02.1'],
    ['2026-04-29 09:18:00', 'Jogn Sina', 'auth.login', 'Login from 95.46.x.x'],
    ['2026-04-28 22:00:01', 'system', 'metric.sync', 'Synced 24 new metrics from NMEA bucket'],
    ['2026-04-28 18:44:21', 'Stanislav', 'user.reset', 'Reset password for crew-047e06'],
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit log</h1>
          <p className="page-subtitle">Every action — uploads, edits, logins, system events.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="download" size={13} /> Export CSV</button>
        </div>
      </div>
      <div className="card">
        <div style={{padding: '12px 16px', display: 'flex', gap: 12, borderBottom: '1px solid var(--line)', alignItems: 'center'}}>
          <input className="input input-search" style={{maxWidth: 280}} placeholder="Search audit log…" />
          <span className="seg">
            <button className="seg-btn active">All</button>
            <button className="seg-btn">Auth</button>
            <button className="seg-btn">Data</button>
            <button className="seg-btn">RAG</button>
            <button className="seg-btn">Alerts</button>
          </span>
        </div>
        <table className="dt dt-compact">
          <thead>
            <tr>
              <th style={{width: 170}}>Timestamp</th>
              <th style={{width: 130}}>Actor</th>
              <th style={{width: 130}}>Action</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {log.map((r, i) => (
              <tr key={i}>
                <td className="cell-mono" style={{fontSize: 11}}>{r[0]}</td>
                <td className="cell-strong">{r[1]}</td>
                <td><span className="pill pill-soft">{r[2]}</span></td>
                <td>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.CrewPage = function CrewPage() {
  const crew = [
    { name: 'Capt. M. Aliyev', rank: 'Master', cert: 'STCW II/2', expires: '2028-03-01', watch: 'Day' },
    { name: 'C. Nikolić', rank: 'Chief Engineer', cert: 'STCW III/2', expires: '2027-06-12', watch: 'Day' },
    { name: 'Eng. M. Petrov', rank: '2nd Engineer', cert: 'STCW III/1', expires: '2027-09-08', watch: 'Night' },
    { name: 'Eng. K. Holm', rank: '3rd Engineer', cert: 'STCW III/1', expires: '2026-12-04', watch: 'Day' },
    { name: 'Bosun J. Sina', rank: 'Bosun', cert: 'STCW II/4', expires: '2028-01-14', watch: 'Day' },
    { name: 'Stewardess A.', rank: 'Stewardess', cert: 'STCW V', expires: '2028-04-22', watch: '—' },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Crew & Watchkeeping</h1>
          <p className="page-subtitle">Crew list, qualifications, watch schedules.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary"><Icon name="plus" size={13} /> Add crew</button>
        </div>
      </div>
      <div className="card">
        <table className="dt">
          <thead>
            <tr><th>Name</th><th>Rank</th><th>STCW</th><th>Expires</th><th>Watch</th><th style={{width: 140, textAlign:'right'}}>Actions</th></tr>
          </thead>
          <tbody>
            {crew.map(c => (
              <tr key={c.name}>
                <td className="cell-strong">{c.name}</td>
                <td>{c.rank}</td>
                <td><span className="pill pill-soft mono">{c.cert}</span></td>
                <td className="cell-mono" style={{fontSize: 11}}>{c.expires}</td>
                <td>{c.watch === 'Day' ? <span className="pill pill-info">DAY</span> : c.watch === 'Night' ? <span className="pill pill-soft">NIGHT</span> : <span className="text-4">—</span>}</td>
                <td className="cell-actions"><button className="btn btn-sm">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.FinancePage = function FinancePage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Accounting</h1>
          <p className="page-subtitle">Operating budget, fuel costs, maintenance spend, crew payroll.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="download" size={13} /> Export</button>
        </div>
      </div>
      <div className="stat-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
        <div className="stat-card"><div className="stat-label">YTD Operating</div><div className="stat-value">€482k</div><div className="stat-foot">vs €510k budget</div></div>
        <div className="stat-card"><div className="stat-label">Fuel</div><div className="stat-value">€124k</div><div className="stat-foot">28,402 L · €4.36/L avg</div></div>
        <div className="stat-card"><div className="stat-label">Maintenance</div><div className="stat-value">€88k</div><div className="stat-foot">142 invoices</div></div>
        <div className="stat-card"><div className="stat-label">Payroll</div><div className="stat-value">€186k</div><div className="stat-foot">14 crew</div></div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Recent invoices</div></div>
        <table className="dt">
          <thead><tr><th>Date</th><th>Vendor</th><th>Category</th><th>SFI</th><th style={{textAlign:'right'}}>Amount</th><th style={{width: 100}}>Status</th></tr></thead>
          <tbody>
            {[
              ['2026-04-26','MTU Service Mediterranean','Spares','02.1.001','€4,212','paid'],
              ['2026-04-22','Allios Bunker','Fuel','04.1','€18,940','paid'],
              ['2026-04-19','MASE Generators','Service','02.1.003','€2,150','pending'],
              ['2026-04-15','Bureau Veritas','Survey','01','€6,800','paid'],
            ].map((r,i) => (
              <tr key={i}>
                <td className="cell-mono" style={{fontSize: 11}}>{r[0]}</td>
                <td className="cell-strong">{r[1]}</td>
                <td>{r[2]}</td>
                <td><span className="pill mono">{r[3]}</span></td>
                <td className="cell-mono" style={{textAlign:'right'}}>{r[4]}</td>
                <td>{r[5]==='paid'?<span className="pill pill-ok">PAID</span>:<span className="pill pill-warn">PENDING</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.AnalyticsPage = function AnalyticsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Chat analytics</h1>
          <p className="page-subtitle">What does the crew ask the AI? Which questions get answered? Which fail?</p>
        </div>
        <div className="page-actions">
          <span className="seg"><button className="seg-btn">Today</button><button className="seg-btn active">7 days</button><button className="seg-btn">30 days</button></span>
        </div>
      </div>
      <div className="stat-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
        <div className="stat-card"><div className="stat-label">Sessions</div><div className="stat-value">218</div><div className="stat-foot">142 today</div></div>
        <div className="stat-card"><div className="stat-label">Messages</div><div className="stat-value">1,402</div><div className="stat-foot">avg 6.4 / session</div></div>
        <div className="stat-card"><div className="stat-label">Avg latency</div><div className="stat-value">1.8s</div><div className="stat-foot">P95 4.1s</div></div>
        <div className="stat-card stat-warn"><div className="stat-label">Unanswered</div><div className="stat-value">38</div><div className="stat-foot">2.7% of total</div></div>
      </div>
      <div className="dash-row">
        <div className="card">
          <div className="card-header"><div className="card-title">Top queried topics</div></div>
          <div style={{padding: '6px 16px 16px'}}>
            {[['Bilge alarms', 78],['Generator running hours', 64],['Tank levels', 51],['Certificate expiry', 32],['MTU oil specs', 28],['SOP for bunkering', 22]].map(([t, c]) => (
              <div key={t} style={{padding: '8px 0', borderBottom: '1px solid var(--line)'}}>
                <div className="row spread" style={{marginBottom: 4}}>
                  <span style={{fontSize: 12.5}}>{t}</span>
                  <span className="mono text-3" style={{fontSize: 11}}>{c}</span>
                </div>
                <div style={{height: 3, background: 'var(--bg-3)', borderRadius: 3}}><div style={{height: '100%', width: `${c}%`, background: 'var(--accent)', borderRadius: 3}} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Unanswered questions</div></div>
          <div style={{padding: 0}}>
            {['What is the procedure for ballast exchange in zone X?','When is next dry dock?','Spare prop pitch for Wesmar?','Annual gas cylinder inspection date'].map((q,i) => (
              <div key={i} style={{padding: '10px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems:'center', gap: 10}}>
                <Icon name="alert" size={13} style={{color: 'var(--warn)'}} />
                <span style={{flex: 1, fontSize: 12.5}}>{q}</span>
                <button className="btn btn-sm">Train</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

window.RagPage = function RagPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">RAG / AI settings</h1>
          <p className="page-subtitle">Chunking, embeddings, retrieval, and live data tools available to the assistant.</p>
        </div>
      </div>
      <div className="dash-row">
        <div className="card">
          <div className="card-header"><div className="card-title">Retrieval</div></div>
          <div className="card-body">
            <label className="field"><span className="field-label">Embedding model</span><select className="input"><option>text-embedding-3-large</option></select></label>
            <label className="field"><span className="field-label">Chunk size</span><input className="input mono" defaultValue="800" /></label>
            <label className="field"><span className="field-label">Chunk overlap</span><input className="input mono" defaultValue="120" /></label>
            <label className="field"><span className="field-label">Top-K</span><input className="input mono" defaultValue="8" /></label>
            <label className="field"><span className="field-label">Re-ranker</span><select className="input"><option>cohere-rerank-3</option><option>none</option></select></label>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Generation</div></div>
          <div className="card-body">
            <label className="field"><span className="field-label">Primary model</span><select className="input"><option>claude-sonnet-4.5</option><option>gpt-5</option></select></label>
            <label className="field"><span className="field-label">Fallback model</span><select className="input"><option>claude-haiku-4.5</option></select></label>
            <label className="field"><span className="field-label">Temperature</span><input className="input mono" defaultValue="0.2" /></label>
            <label className="field"><span className="field-label">System prompt</span><textarea className="input" rows="4" defaultValue="You are the Trident Intelligence assistant for Sea Wolf X. Cite SFI codes. Use live telemetry when relevant…" style={{fontFamily: 'inherit', resize: 'vertical'}}></textarea></label>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Tools available to the assistant</div></div>
        <table className="dt">
          <thead><tr><th>Tool</th><th>Source</th><th>Description</th><th style={{width: 90}}>Status</th></tr></thead>
          <tbody>
            {[
              ['live_telemetry', 'InfluxDB · NMEA', 'Read live metrics by key', 'on'],
              ['search_kb', 'RAG', 'Vector search across all manuals & docs', 'on'],
              ['get_asset', 'Asset Register', 'Lookup by SFI code', 'on'],
              ['list_pms', 'PMS', 'Read scheduled & overdue tasks', 'on'],
              ['create_pms_task', 'PMS', 'Write — create a maintenance task', 'on'],
              ['lookup_cert', 'Compliance', 'Look up certificate validity', 'on'],
              ['send_alert', 'Alerts', 'Push alert to crew', 'off'],
            ].map(r => (
              <tr key={r[0]}>
                <td className="cell-mono">{r[0]}</td>
                <td>{r[1]}</td>
                <td className="text-3">{r[2]}</td>
                <td>{r[3]==='on'?<span className="pill pill-ok">ON</span>:<span className="pill pill-soft">OFF</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.SettingsPage = function SettingsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Organization, branding, integrations.</p></div>
      </div>
      <div className="dash-row">
        <div className="card"><div className="card-header"><div className="card-title">Organization</div></div><div className="card-body">
          <label className="field"><span className="field-label">Name</span><input className="input" defaultValue="SeaWolfX" /></label>
          <label className="field"><span className="field-label">Time zone</span><select className="input"><option>UTC</option><option>Europe/Monaco</option></select></label>
          <label className="field"><span className="field-label">Locale</span><select className="input"><option>English</option><option>Russian</option></select></label>
        </div></div>
        <div className="card"><div className="card-header"><div className="card-title">Integrations</div></div><div style={{padding: 0}}>
          {[['InfluxDB','Connected','ok'],['NMEA bridge','Connected','ok'],['Email (SES)','Connected','ok'],['Slack','Not connected','off'],['SatCom alerts','Connected','ok']].map(r => (
            <div key={r[0]} style={{padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems:'center'}}>
              <span style={{flex: 1}}><strong>{r[0]}</strong> <span className="text-3" style={{marginLeft: 8, fontSize: 11.5}}>{r[1]}</span></span>
              {r[2]==='ok'?<span className="pill pill-ok">ON</span>:<button className="btn btn-sm">Connect</button>}
            </div>
          ))}
        </div></div>
      </div>
    </div>
  );
};
