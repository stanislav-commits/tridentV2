/* global React, Icon, SFI_GROUPS, SFI_ASSETS_SAMPLE, SHIP_INFO */
const { useState: aS, useMemo: aM } = React;

// =================== DASHBOARD / OVERVIEW ===================
window.PageDashboard = function PageDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="page-subtitle">Sea Wolf X — fleet snapshot, live telemetry health, and outstanding admin work.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="download" size={13} /> Export report</button>
          <button className="btn btn-primary"><Icon name="plus" size={13} /> New chat</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Assets registered" value="2,247" foot={<><span className="dot dot-ok"/> 99.4% mapped to SFI</>} />
        <StatCard label="Live metrics" value="1,207" foot={<><span className="mono">1,189 streaming</span> · 18 stale</>} />
        <StatCard label="Documents indexed" value="172" foot={<><span className="mono">17,481 chunks</span> · all healthy</>} />
        <StatCard label="Open PMS tasks" value="18" foot={<>4 overdue · 2 due this week</>} cls="stat-warn" />
        <StatCard label="Active alerts" value="3" foot={<><span className="dot dot-danger"/> 1 critical · 2 warning</>} cls="stat-danger" />
        <StatCard label="Crew online" value="7 / 12" foot={<>3 watch · 4 day shift</>} />
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Live telemetry — last 24 hours</div>
              <div className="card-sub">Pulled from InfluxDB · NMEA + sensors bucket</div>
            </div>
            <div className="seg" style={{marginLeft:'auto'}}>
              <button className="seg-btn">1h</button>
              <button className="seg-btn active">24h</button>
              <button className="seg-btn">7d</button>
            </div>
          </div>
          <div className="card-body">
            <div className="gauge-row" style={{marginBottom:14}}>
              <Gauge label="Engine load — Port" value="64" unit="%" pct={0.64} />
              <Gauge label="Engine load — Stbd" value="61" unit="%" pct={0.61} />
              <Gauge label="Fuel" value="78" unit="%" pct={0.78} />
              <Gauge label="Fresh water" value="42" unit="%" pct={0.42} />
            </div>
            <Sparkline />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent alerts</div>
            <button className="btn btn-ghost btn-sm" style={{marginLeft:'auto'}}>View all</button>
          </div>
          <div style={{padding:'4px 0'}}>
            <MiniAlert level="danger" code="03.1.010" msg="Engine Mount — Stbd AFT vibration over threshold" time="04:12" />
            <MiniAlert level="warn" code="04.4.003" msg="Bilge level — Engine Room exceeding daily avg" time="03:48" />
            <MiniAlert level="warn" code="07.1.001" msg="Watermaker pre-filter pressure rising" time="01:22" />
            <MiniAlert level="info" code="08.1" msg="Fire Detection self-test completed" time="00:00" />
          </div>
        </div>
      </div>

      <div className="dash-row">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top chat questions (this week)</div>
            <button className="btn btn-ghost btn-sm" style={{marginLeft:'auto'}}>Open analytics</button>
          </div>
          <table className="dt dt-compact">
            <thead><tr><th>Question</th><th style={{width:80}}>Asks</th><th style={{width:120}}>Source</th></tr></thead>
            <tbody>
              {[
                ['What are the port generator running hours?', 47, 'Live + Manual'],
                ['Is any active bilge alarm right now?', 32, 'Live'],
                ['How many running hours has the emergency generator?', 21, 'Live'],
                ['What is the bilge level in tanks?', 18, 'Live'],
                ['Where is the fire pump manual?', 14, 'Manual'],
              ].map((r,i) => (
                <tr key={i}>
                  <td className="cell-strong">{r[0]}</td>
                  <td className="cell-mono">{r[1]}</td>
                  <td><span className="pill pill-soft">{r[2]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Compliance & certificates</div>
            <span className="pill pill-warn">2 expiring</span>
          </div>
          <div style={{padding:'8px 12px'}}>
            <CertRow name="Safety Construction Certificate" expires="14 May 2026" days={15} status="warn" />
            <CertRow name="MARPOL — IOPP" expires="22 May 2026" days={23} status="warn" />
            <CertRow name="Class — Lloyd's Register" expires="08 Aug 2026" days={101} status="ok" />
            <CertRow name="ISM — DOC" expires="30 Sep 2026" days={154} status="ok" />
            <CertRow name="MLC 2006" expires="11 Nov 2026" days={196} status="ok" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, foot, cls='' }) => (
  <div className={`stat-card ${cls}`}>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-foot">{foot}</div>
  </div>
);

const Gauge = ({ label, value, unit, pct }) => (
  <div className="gauge-cell">
    <div className="gauge-label">{label}</div>
    <div className="gauge-value">{value}<span className="gauge-unit">{unit}</span></div>
    <div className="gauge-bar"><div className="gauge-fill" style={{width: `${pct*100}%`}}/></div>
  </div>
);

const Sparkline = () => {
  const pts = useMemo(() => {
    const arr = [];
    let y = 50;
    for (let i = 0; i < 80; i++) {
      y += (Math.random() - 0.5) * 8;
      y = Math.max(15, Math.min(85, y));
      arr.push(y);
    }
    return arr;
  }, []);
  const w = 600, h = 80;
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length-1)) * w},${h - (p/100)*h}`).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{width:'100%', height:90, display:'block'}}>
      <defs>
        <linearGradient id="sparkfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.13 175)" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="oklch(0.78 0.13 175)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkfill)" />
      <path d={path} fill="none" stroke="oklch(0.78 0.13 175)" strokeWidth="1.5" />
    </svg>
  );
};

const MiniAlert = ({ level, code, msg, time }) => (
  <div style={{display:'grid', gridTemplateColumns:'12px 1fr 60px', gap:10, alignItems:'center', padding:'10px 16px', borderTop:'1px solid var(--line)', fontSize:12.5}}>
    <span className={`dot dot-${level}`} />
    <div>
      <div style={{color:'var(--text-1)', fontWeight:500}}>{msg}</div>
      <div style={{color:'var(--text-3)', fontFamily:'JetBrains Mono, monospace', fontSize:11, marginTop:2}}>{code}</div>
    </div>
    <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'var(--text-3)', textAlign:'right'}}>{time}</div>
  </div>
);

const CertRow = ({ name, expires, days, status }) => (
  <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 4px', borderTop:'1px solid var(--line)'}}>
    <Icon name="shield" size={15} style={{color: status === 'warn' ? 'var(--warn)' : 'var(--text-3)'}}/>
    <div style={{flex:1}}>
      <div style={{fontWeight:500, fontSize:12.5}}>{name}</div>
      <div style={{fontSize:11, color:'var(--text-3)', marginTop:1}}>Expires {expires}</div>
    </div>
    <span className={`pill ${status === 'warn' ? 'pill-warn' : 'pill-ok'}`}>{days}d</span>
  </div>
);

const useMemo = React.useMemo;
