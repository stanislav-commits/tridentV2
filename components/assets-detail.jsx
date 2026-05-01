/* global React, Icon, SFI_ASSETS_SAMPLE */
const { useState: uAD, useMemo: uMAD } = React;

// inline sparkline path
function sparkPath(values, w, h, pad = 2) {
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1);
  return values.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

function genSeries(seed, base, jitter, n = 48) {
  const out = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    v = base + (r - 0.5) * jitter * 2 + Math.sin(i / 6 + seed) * jitter * 0.5;
    out.push(v);
  }
  return out;
}

window.AssetDetailFull = function AssetDetailFull({ asset, onBack }) {
  const [tab, setTab] = uAD('overview');

  const metrics = uMAD(() => [
    { name: 'engines.port.rpm', value: '1,840', unit: 'rpm', series: genSeries(11, 1840, 80), low: '1,720', high: '1,920', trend: '+1.4%' },
    { name: 'engines.port.coolant.temp', value: '82.3', unit: '°C', series: genSeries(22, 82, 4), low: '78.1', high: '85.7', trend: '+0.8°', warn: false },
    { name: 'engines.port.oil.pressure', value: '5.4', unit: 'bar', series: genSeries(33, 5.4, 0.3), low: '5.1', high: '5.7', trend: 'stable' },
    { name: 'engines.port.exhaust.temp', value: '412', unit: '°C', series: genSeries(44, 412, 25), low: '388', high: '441', trend: '+2.1%' },
    { name: 'engines.port.fuel.rate', value: '78.2', unit: 'L/h', series: genSeries(55, 78, 8), low: '64.0', high: '88.4', trend: '−4.0%' },
    { name: 'engines.port.load', value: '74', unit: '%', series: genSeries(66, 74, 12), low: '52', high: '88', trend: '+5%' },
    { name: 'engines.port.battery.voltage', value: '27.8', unit: 'V', series: genSeries(77, 27.8, 0.4), low: '27.2', high: '28.4', trend: 'stable' },
    { name: 'engines.port.charge.amps', value: '38', unit: 'A', series: genSeries(88, 38, 6), low: '24', high: '52', trend: 'stable' },
  ], []);

  return (
    <div className="content" style={{padding: 0}}>
      <div className="asset-hero">
        <button className="btn btn-sm" onClick={onBack}><Icon name="chevron-left" size={12} /> Asset Register</button>
        <div className="asset-hero-image">
          PHOTO<br/>96×96
        </div>
        <div className="asset-hero-meta">
          <div className="crumb-line">
            <span>Sea Wolf X</span><Icon name="chevron-right" size={10} />
            <span className="mono">03</span><span>Machinery</span><Icon name="chevron-right" size={10} />
            <span className="mono">03.1</span><span>Engines & Generators</span><Icon name="chevron-right" size={10} />
            <span className="mono" style={{color: 'var(--text-1)'}}>{asset.sfi}</span>
          </div>
          <div className="asset-hero-title">
            {asset.name}
            <span className="pill pill-ok"><span className="dot dot-ok" /> Operational</span>
          </div>
          <div className="asset-hero-sub">
            <span><strong>{asset.mfr}</strong> · {asset.model}</span>
            <span>S/N <span className="mono" style={{color: 'var(--text-2)'}}>{asset.serial}</span></span>
            <span>{asset.location}</span>
            <span><strong>{asset.running_hrs?.toLocaleString()}</strong> running hours</span>
            <span>Last service <span className="mono" style={{color: 'var(--text-2)'}}>{asset.last_service}</span></span>
          </div>
        </div>
        <div className="asset-hero-actions">
          <button className="btn btn-primary"><Icon name="sparkle" size={12} /> Ask AI about this asset</button>
          <div className="row gap-12">
            <button className="btn btn-sm" style={{flex: 1, justifyContent: 'center'}}><Icon name="edit" size={11} /> Edit</button>
            <button className="btn btn-sm" style={{flex: 1, justifyContent: 'center'}}><Icon name="history" size={11} /> History</button>
          </div>
        </div>
      </div>

      <div className="asset-tabs">
        <div className="tabs">
          {[['overview', 'Overview'], ['metrics', 'Live metrics', metrics.length], ['manuals', 'Manuals', asset.manuals], ['pms', 'PMS', asset.tasks_open], ['spares', 'Spares', asset.spares], ['certs', 'Certificates', asset.certs], ['history', 'Service history']].map(([k, l, c]) => (
            <div key={k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>
              {l} {c !== undefined && <span className="tab-count">{c}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="asset-cols">
        <div>
          {tab === 'overview' && <OverviewBlock metrics={metrics} asset={asset} />}
          {tab === 'metrics' && <MetricsBlock metrics={metrics} />}
          {tab === 'manuals' && <ManualsBlock />}
          {tab === 'pms' && <PMSBlock />}
          {tab === 'spares' && <SparesBlock />}
          {tab === 'certs' && <CertsBlock />}
          {tab === 'history' && <HistoryBlock />}
        </div>

        <aside style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Identity</div>
                <div className="card-sub">SFI {asset.sfi}</div>
              </div>
              <button className="btn btn-sm btn-ghost" style={{marginLeft: 'auto'}}><Icon name="edit" size={11} /></button>
            </div>
            <div style={{padding: '8px 16px 14px'}}>
              <div className="kv-list">
                <div className="kv-row"><span className="kv-key">Manufacturer</span><span className="kv-val">{asset.mfr}</span></div>
                <div className="kv-row"><span className="kv-key">Model</span><span className="kv-val">{asset.model}</span></div>
                <div className="kv-row"><span className="kv-key">Serial</span><span className="kv-val mono">{asset.serial}</span></div>
                <div className="kv-row"><span className="kv-key">Location</span><span className="kv-val">{asset.location}</span></div>
                <div className="kv-row"><span className="kv-key">Install date</span><span className="kv-val mono">2018-06-12</span></div>
                <div className="kv-row" style={{borderBottom: 'none'}}><span className="kv-key">Class society</span><span className="kv-val">Lloyd's Register</span></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Linked surfaces</div></div>
            <div style={{padding: '4px 0'}}>
              {[
                ['metrics', 'Live metrics', '14 bound', 'accent'],
                ['kb', 'Manuals', `${asset.manuals} documents`, null],
                ['pms', 'Open PMS tasks', `${asset.tasks_open} due`, asset.tasks_open ? 'warn' : null],
                ['compliance', 'Certificates', `${asset.certs} valid`, null],
                ['box', 'Spares on board', `${asset.spares} items`, null],
                ['analytics', 'Mentioned in chat', '23 times (30d)', null],
              ].map(([icon, label, val, tone]) => (
                <div key={label} style={{padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5, borderBottom: '1px solid var(--line)', cursor: 'pointer'}}>
                  <Icon name={icon} size={13} style={{color: 'var(--text-3)'}} />
                  <span style={{color: 'var(--text-1)', flex: 1}}>{label}</span>
                  <span className={tone === 'accent' ? 'pill pill-accent' : tone === 'warn' ? 'pill pill-warn' : 'pill pill-soft'}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Recent alerts</div></div>
            <div style={{padding: '4px 16px 14px'}}>
              <div className="timeline">
                <div className="timeline-item tl-warn">
                  <div className="timeline-date">2026-04-28 14:22</div>
                  <div className="timeline-title">Coolant temp 87.2°C — above warn (85°C)</div>
                  <div className="timeline-sub">Auto-acknowledged after 4 min · Returned to normal</div>
                </div>
                <div className="timeline-item tl-info">
                  <div className="timeline-date">2026-04-12 09:08</div>
                  <div className="timeline-title">Soft-start cycle longer than baseline</div>
                  <div className="timeline-sub">No action required</div>
                </div>
                <div className="timeline-item tl-ok">
                  <div className="timeline-date">2026-03-12 11:00</div>
                  <div className="timeline-title">Service completed — 4,200h</div>
                  <div className="timeline-sub">Oil + filters · Eng. M. Barros</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

function OverviewBlock({ metrics, asset }) {
  return (
    <div>
      <div className="card mb-16">
        <div className="card-header">
          <div>
            <div className="card-title">Live snapshot</div>
            <div className="card-sub">Last 48 readings · refreshed 12s ago</div>
          </div>
          <span className="pill pill-ok" style={{marginLeft: 'auto'}}><span className="dot dot-ok" /> STREAMING</span>
        </div>
        <div style={{padding: 14, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
          {metrics.slice(0, 4).map(m => <MiniMetric key={m.name} m={m} />)}
        </div>
      </div>

      <div className="card mb-16">
        <div className="card-header">
          <div>
            <div className="card-title">Performance — last 7 days</div>
            <div className="card-sub">RPM, fuel rate and engine load</div>
          </div>
          <div className="seg" style={{marginLeft: 'auto'}}>
            <button className="seg-btn">24h</button>
            <button className="seg-btn active">7d</button>
            <button className="seg-btn">30d</button>
          </div>
        </div>
        <div style={{padding: 16}}>
          <BigChart series={metrics[0].series} series2={metrics[5].series} />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Open PMS tasks</div>
          <button className="btn btn-sm" style={{marginLeft: 'auto'}}><Icon name="plus" size={11} /> New task</button>
        </div>
        <table className="dt dt-compact">
          <thead><tr><th style={{width: 24}}></th><th>Task</th><th style={{width: 110}}>Due</th><th style={{width: 90}}>Interval</th><th style={{width: 100}}>Status</th></tr></thead>
          <tbody>
            <tr><td><span className="checkbox" /></td><td className="cell-strong">500h inspection</td><td className="cell-mono">2026-04-30</td><td className="cell-mono">500 h</td><td><span className="pill pill-danger">OVERDUE</span></td></tr>
            <tr><td><span className="checkbox" /></td><td className="cell-strong">Oil & filter change</td><td className="cell-mono">2026-05-12</td><td className="cell-mono">250 h</td><td><span className="pill pill-warn">DUE SOON</span></td></tr>
            <tr><td><span className="checkbox" /></td><td className="cell-strong">Coolant analysis</td><td className="cell-mono">2026-06-04</td><td className="cell-mono">1000 h</td><td><span className="pill pill-soft">UPCOMING</span></td></tr>
            <tr><td><span className="checkbox" /></td><td className="cell-strong">Injector inspection</td><td className="cell-mono">2026-08-22</td><td className="cell-mono">2000 h</td><td><span className="pill pill-soft">UPCOMING</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MiniMetric({ m }) {
  return (
    <div className="metric-card">
      <div className="metric-card-head">
        <div>
          <div className="metric-card-name">{m.name.split('.').slice(-2).join('.')}</div>
          <div className="metric-card-value">{m.value}<span className="metric-card-unit">{m.unit}</span></div>
        </div>
        <span className="text-3 mono" style={{fontSize: 10.5}}>{m.trend}</span>
      </div>
      <svg className="metric-card-spark" viewBox="0 0 200 36" preserveAspectRatio="none">
        <path d={sparkPath(m.series, 200, 36)} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      </svg>
      <div className="metric-card-foot"><span>min {m.low}</span><span>max {m.high}</span></div>
    </div>
  );
}

function BigChart({ series, series2 }) {
  return (
    <svg viewBox="0 0 800 220" style={{width: '100%', height: 220}}>
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="0" x2="800" y1={i * 55 + 10} y2={i * 55 + 10} stroke="var(--line)" strokeWidth="1" />
      ))}
      <path d={sparkPath(series, 800, 220, 10).replace(/^M/, 'M')} fill="none" stroke="var(--accent)" strokeWidth="1.8" />
      <path d={sparkPath(series, 800, 220, 10) + ' L800,220 L0,220 Z'} fill="var(--accent-dim)" stroke="none" opacity="0.6" />
      <path d={sparkPath(series2, 800, 220, 10)} fill="none" stroke="var(--info)" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.7" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <text key={i} x={i * 130 + 10} y="215" fill="var(--text-4)" fontSize="9" fontFamily="JetBrains Mono">D-{6 - i}</text>
      ))}
    </svg>
  );
}

function MetricsBlock({ metrics }) {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12}}>
      {metrics.map(m => <MiniMetric key={m.name} m={m} />)}
    </div>
  );
}

function ManualsBlock() {
  const list = [
    { name: 'MN_MTU_16V_4000_Operating_Manual.pdf', size: '12.4 MB', chunks: 412, conf: 96, date: '2026-03-12', mentions: 184 },
    { name: 'MN_MTU_16V_4000_Service_Schedule_2026.pdf', size: '4.1 MB', chunks: 188, conf: 94, date: '2026-03-12', mentions: 62 },
    { name: 'MN_MTU_Spare_Parts_Catalogue_2026.pdf', size: '8.6 MB', chunks: 86, conf: 88, date: '2026-02-04', mentions: 41 },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Linked manuals</div>
        <button className="btn btn-sm" style={{marginLeft: 'auto'}}><Icon name="link" size={11} /> Link existing</button>
        <button className="btn btn-sm btn-primary"><Icon name="upload" size={11} /> Upload</button>
      </div>
      <table className="dt dt-compact">
        <thead><tr><th>Document</th><th style={{width: 80}}>Size</th><th style={{width: 80}}>Chunks</th><th style={{width: 110}}>Date</th><th style={{width: 100}}>Mentions</th><th style={{width: 80}}>Match</th><th style={{width: 40}}></th></tr></thead>
        <tbody>
          {list.map(m => (
            <tr key={m.name}>
              <td className="cell-strong"><Icon name="doc" size={11} style={{marginRight: 6, color: 'var(--text-3)'}} />{m.name}</td>
              <td className="cell-mono">{m.size}</td>
              <td className="cell-mono">{m.chunks}</td>
              <td className="cell-mono">{m.date}</td>
              <td className="cell-mono">{m.mentions}</td>
              <td><span className="pill pill-accent">{m.conf}%</span></td>
              <td style={{textAlign: 'right'}}><button className="btn btn-sm btn-icon-only btn-ghost"><Icon name="eye" size={11} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PMSBlock() {
  return <OverviewBlock metrics={[]} asset={{}} />.props.children[2];
}

function SparesBlock() {
  const list = [
    ['Oil filter', 'P/N 5004060', 4, 'min 2', 'ER Storage A3'],
    ['Fuel filter (primary)', 'P/N 0040921', 6, 'min 4', 'ER Storage A3'],
    ['Fuel filter (secondary)', 'P/N 0040922', 6, 'min 4', 'ER Storage A3'],
    ['V-belt 13×1500', 'P/N V13-1500', 2, 'min 1', 'ER Storage B1'],
    ['Impeller — raw water', 'P/N IMP-455', 1, 'min 2', 'ER Storage B1', 'low'],
    ['Coolant 50/50 (5L)', 'P/N CL-5050-5', 8, 'min 4', 'Lazarette'],
    ['Injector seal kit', 'P/N MTU-IS-016', 2, 'min 1', 'ER Storage A4'],
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Spares on board</div>
        <button className="btn btn-sm" style={{marginLeft: 'auto'}}><Icon name="plus" size={11} /> Add spare</button>
      </div>
      <table className="dt dt-compact">
        <thead><tr><th>Part</th><th style={{width: 120}}>P/N</th><th style={{width: 60, textAlign: 'right'}}>Qty</th><th style={{width: 70}}>Min</th><th>Location</th><th style={{width: 80}}></th></tr></thead>
        <tbody>
          {list.map((r, i) => (
            <tr key={i}>
              <td className="cell-strong">{r[0]}</td>
              <td className="cell-mono">{r[1]}</td>
              <td className="cell-mono" style={{textAlign: 'right'}}>×{r[2]}</td>
              <td className="cell-mono text-3">{r[3]}</td>
              <td>{r[4]}</td>
              <td>{r[5] === 'low' && <span className="pill pill-warn">LOW</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CertsBlock() {
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Certificates</div></div>
      <table className="dt dt-compact">
        <thead><tr><th>Certificate</th><th style={{width: 140}}>Issuer</th><th style={{width: 110}}>Issued</th><th style={{width: 110}}>Expires</th><th style={{width: 100}}>Status</th></tr></thead>
        <tbody>
          <tr><td className="cell-strong">EIAPP — Engine NOx</td><td>Lloyd's Register</td><td className="cell-mono">2018-06-12</td><td className="cell-mono">2028-06-12</td><td><span className="pill pill-ok">VALID</span></td></tr>
          <tr><td className="cell-strong">Type approval — Marine diesel</td><td>MTU / IMO Tier II</td><td className="cell-mono">2017-11-04</td><td className="cell-mono">—</td><td><span className="pill pill-ok">VALID</span></td></tr>
        </tbody>
      </table>
    </div>
  );
}

function HistoryBlock() {
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Service history</div></div>
      <div style={{padding: '14px 18px'}}>
        <div className="timeline">
          {[
            { d: '2026-03-12', t: '4,200h scheduled service', sub: 'Oil + filters · Eng. M. Barros · 2.5h labour', tone: 'ok' },
            { d: '2025-11-18', t: '3,500h inspection', sub: 'Coolant analysis passed · Belt re-tensioned', tone: 'ok' },
            { d: '2025-08-04', t: 'Coolant pump replaced', sub: 'Impeller failure at 3,180h · P/N IMP-455 · €428', tone: 'warn' },
            { d: '2025-05-22', t: '3,000h major service', sub: 'Injectors inspected · 2 replaced · Eng. M. Barros + yard tech', tone: 'ok' },
            { d: '2024-12-09', t: '2,500h service', sub: 'Standard interval', tone: 'ok' },
            { d: '2024-04-18', t: '2,000h service + injector audit', sub: 'Manufacturer-recommended at 2,000h interval', tone: 'ok' },
            { d: '2023-09-02', t: 'Yard refit — engine alignment', sub: 'Tilghman Yard · 4 days · realignment + new mounts', tone: 'info' },
            { d: '2018-06-12', t: 'Asset commissioned', sub: 'Sea trials passed · Lloyd\'s Register sign-off', tone: 'info' },
          ].map((h, i) => (
            <div key={i} className={`timeline-item tl-${h.tone}`}>
              <div className="timeline-date">{h.d}</div>
              <div className="timeline-title">{h.t}</div>
              <div className="timeline-sub">{h.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
