/* global React, Icon, SFI_GROUPS, SFI_ASSETS_SAMPLE, SHIP_INFO */

// =================== DASHBOARD ===================
window.DashboardPage = function DashboardPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="page-subtitle">Sea Wolf X — system health, indexing status, and what the AI assistant has been doing.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="download" size={13} /> Export</button>
          <button className="btn btn-primary"><Icon name="plus" size={13} /> Add asset</button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Assets tracked</div>
          <div className="stat-value">2,247</div>
          <div className="stat-foot"><span style={{color:'var(--ok)'}}>+12</span> this week · 21 categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Live metrics</div>
          <div className="stat-value">1,207</div>
          <div className="stat-foot"><span className="dot dot-ok" /> NMEA stream healthy · last sync 14s</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Documents indexed</div>
          <div className="stat-value">172</div>
          <div className="stat-foot">12,431 RAG chunks · 4 pending</div>
        </div>
        <div className="stat-card stat-warn">
          <div className="stat-label">Open PMS tasks</div>
          <div className="stat-value">18</div>
          <div className="stat-foot"><span style={{color:'var(--warn)'}}>3 overdue</span> · 7 due this week</div>
        </div>
        <div className="stat-card stat-danger">
          <div className="stat-label">Active alarms</div>
          <div className="stat-value">3</div>
          <div className="stat-foot"><span className="dot dot-danger" /> 1 critical · 2 warnings</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Crew online</div>
          <div className="stat-value">8 / 14</div>
          <div className="stat-foot">142 chat sessions today</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Live vessel telemetry</div>
              <div className="card-sub">From NMEA bucket — last 60s</div>
            </div>
            <div style={{marginLeft: 'auto'}} className="row gap-12">
              <span className="pill pill-ok"><span className="dot dot-ok" /> LIVE</span>
              <span className="text-3 mono" style={{fontSize: 11}}>14:32:18 UTC</span>
            </div>
          </div>
          <div className="card-body">
            <div className="gauge-row">
              <div className="gauge-cell">
                <div className="gauge-label">SOG</div>
                <div className="gauge-value">12.4<span className="gauge-unit">kn</span></div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '52%'}} /></div>
              </div>
              <div className="gauge-cell">
                <div className="gauge-label">Heading</div>
                <div className="gauge-value">284<span className="gauge-unit">°</span></div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '78%'}} /></div>
              </div>
              <div className="gauge-cell">
                <div className="gauge-label">Depth</div>
                <div className="gauge-value">38.6<span className="gauge-unit">m</span></div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '38%'}} /></div>
              </div>
              <div className="gauge-cell">
                <div className="gauge-label">Wind</div>
                <div className="gauge-value">14.2<span className="gauge-unit">kn</span></div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '36%'}} /></div>
              </div>
              <div className="gauge-cell">
                <div className="gauge-label">ME Port RPM</div>
                <div className="gauge-value">1,840</div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '74%'}} /></div>
              </div>
              <div className="gauge-cell">
                <div className="gauge-label">ME Stbd RPM</div>
                <div className="gauge-value">1,852</div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '74%'}} /></div>
              </div>
              <div className="gauge-cell">
                <div className="gauge-label">Fuel total</div>
                <div className="gauge-value">68<span className="gauge-unit">%</span></div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '68%'}} /></div>
              </div>
              <div className="gauge-cell">
                <div className="gauge-label">Bilge</div>
                <div className="gauge-value">OK</div>
                <div className="gauge-bar"><div className="gauge-fill" style={{width: '8%', background:'var(--ok)'}} /></div>
              </div>
            </div>
            <div className="divider" />
            <Sparklines />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">RAG indexation</div>
            <span style={{marginLeft: 'auto'}} className="pill pill-info">4 jobs queued</span>
          </div>
          <div className="card-body" style={{padding: 0}}>
            {[
              { f: 'MN_VolvoPenta_D5A_v3.pdf', s: 100, st: 'done', chunks: 453 },
              { f: 'CERT_SOLAS_2026.pdf', s: 100, st: 'done', chunks: 18 },
              { f: 'PMS_export_Apr2026.csv', s: 72, st: 'parsing', chunks: null },
              { f: 'MN_MASE_IS44_rev2.pdf', s: 38, st: 'parsing', chunks: null },
              { f: 'SOP_BunkeringV4.docx', s: 0, st: 'queued', chunks: null },
              { f: 'ISM_Manual_2026_Q2.pdf', s: 0, st: 'queued', chunks: null },
            ].map((row, i) => (
              <div key={i} style={{padding: '10px 16px', borderBottom: '1px solid var(--line)'}}>
                <div className="row spread" style={{marginBottom: 6}}>
                  <span style={{fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 240}}>{row.f}</span>
                  <span className={`pill ${row.st === 'done' ? 'pill-ok' : row.st === 'parsing' ? 'pill-info' : 'pill-soft'}`}>
                    {row.st === 'done' ? `${row.chunks} CHUNKS` : row.st.toUpperCase()}
                  </span>
                </div>
                <div style={{height: 3, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${row.s}%`, background: row.st === 'done' ? 'var(--ok)' : 'var(--info)'}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-row">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Latest chat queries</div>
            <button className="btn btn-ghost btn-sm" style={{marginLeft: 'auto'}}>View all <Icon name="arrow-up-right" size={12} /></button>
          </div>
          <div className="card-body" style={{padding: 0}}>
            {[
              { q: 'are there any active bilge alarms right now?', user: 'Jogn S.', t: '2m', src: ['NMEA live', '08.1 Fire'], ok: true },
              { q: 'how many running hours has port generator?', user: 'Jogn S.', t: '14m', src: ['NMEA live', '03.1 Engines'], ok: true },
              { q: 'what is the bilge level in tanks?', user: 'Jogn S.', t: '32m', src: ['NMEA live'], ok: true },
              { q: 'when does the SOLAS cert expire?', user: 'M. Aliyev', t: '1h', src: ['CERT_SOLAS_2026.pdf'], ok: true },
              { q: 'what oil for MTU 16V', user: 'M. Aliyev', t: '2h', src: ['MN_MTU_16V.pdf'], ok: true },
              { q: 'PMS schedule for next week', user: 'Capt.', t: '4h', src: ['PMS export'], ok: true },
            ].map((q, i) => (
              <div key={i} style={{padding: '10px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5}}>
                <Icon name="chat" size={14} style={{color: 'var(--text-3)'}} />
                <span style={{flex: 1, color: 'var(--text-1)'}}>{q.q}</span>
                <span className="text-3" style={{fontSize: 11.5}}>{q.user}</span>
                {q.src.map(s => <span key={s} className="pill pill-soft">{s}</span>)}
                <span className="text-3 mono" style={{fontSize: 11}}>{q.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent activity</div>
          </div>
          <div className="card-body" style={{padding: 0}}>
            {[
              { who: 'Stanislav', what: 'Reset password for Jogn Sina', when: '12m ago', icon: 'users' },
              { who: 'System', what: 'Indexed MN_VolvoPenta_D5A_v3.pdf — 453 chunks', when: '38m ago', icon: 'kb' },
              { who: 'Capt. Aliyev', what: 'Closed PMS task #2018 — Oil filter Generator 1', when: '2h ago', icon: 'pms' },
              { who: 'System', what: 'Auto-mapped 24 new metrics from NMEA', when: '4h ago', icon: 'metrics' },
              { who: 'Stanislav', what: 'Linked 12 manuals to SFI 03.1', when: 'yesterday', icon: 'link' },
            ].map((a, i) => (
              <div key={i} style={{padding: '10px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5}}>
                <div style={{width: 26, height: 26, background: 'var(--bg-3)', borderRadius: 5, display: 'grid', placeItems: 'center', color: 'var(--text-2)'}}><Icon name={a.icon} size={13} /></div>
                <div style={{flex: 1}}>
                  <div><strong style={{color: 'var(--text-1)'}}>{a.who}</strong> <span className="text-3">{a.what}</span></div>
                </div>
                <span className="text-3 mono" style={{fontSize: 11}}>{a.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Sparklines() {
  const series = [
    { label: 'Main Engine Port — Coolant T°', vals: [78, 79, 81, 82, 81, 80, 81, 82, 82, 83, 82, 81, 82, 82, 81] },
    { label: 'Main Engine Stbd — Coolant T°', vals: [79, 80, 80, 81, 82, 81, 81, 82, 82, 83, 83, 82, 82, 82, 82] },
    { label: 'Fuel Tank Port — level %', vals: [72, 72, 71, 71, 70, 70, 70, 69, 69, 69, 68, 68, 68, 68, 68] },
    { label: 'Generator 1 — load %', vals: [38, 41, 44, 42, 38, 36, 39, 41, 42, 38, 36, 35, 39, 41, 42] },
  ];
  const sparkPath = (v) => {
    const max = Math.max(...v), min = Math.min(...v);
    const range = max - min || 1;
    const w = 100 / (v.length - 1);
    return v.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * w} ${30 - ((y - min) / range) * 26}`).join(' ');
  };
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12}}>
      {series.map(s => (
        <div key={s.label} style={{background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '10px 12px'}}>
          <div className="row spread" style={{marginBottom: 6}}>
            <span style={{fontSize: 11, color: 'var(--text-3)'}}>{s.label}</span>
            <span className="mono" style={{fontSize: 11, color: 'var(--text-1)'}}>{s.vals[s.vals.length - 1]}</span>
          </div>
          <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="spark">
            <path d={sparkPath(s.vals)} fill="none" stroke="oklch(0.78 0.13 175)" strokeWidth="1.2" />
          </svg>
        </div>
      ))}
    </div>
  );
}
