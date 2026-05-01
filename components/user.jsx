/* global React, Icon, TridentMark */
const { useState: usU, useRef: urU, useEffect: ueU } = React;

window.UserShell = function UserShell({ tab, setTab, setMode, children }) {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: 'chat' },
    { id: 'alerts', label: 'Alerts', icon: 'alert', badge: 3 },
    { id: 'pms', label: 'My tasks', icon: 'pms', badge: 4 },
  ];
  const recents = [
    'are there any active bilge alarms right now?',
    'how many running hours has port generator?',
    'what is the bilge level in tanks?',
    'oil spec for MTU 16V 4000',
    'when does SOLAS cert expire?',
    'walk me through bunkering SOP',
    'PMS schedule for next week',
    'list overdue maintenance tasks',
  ];
  return (
    <div className="user-shell">
      <aside className="user-aside">
        <div className="user-aside-head">
          <div className="sb-brand-mark">
            <img className="sb-brand-logo" src="assets/trident-virtual-mark.png" alt="Trident Virtual mark" />
          </div>
          <div>
            <div style={{fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'}}>Trident</div>
            <div style={{fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.16em'}}>SEA WOLF X</div>
          </div>
          <button className="btn btn-sm btn-ghost" style={{marginLeft: 'auto', padding: 6}} title="New chat"><Icon name="plus" size={14} /></button>
        </div>
        <div className="user-aside-search">
          <input className="input input-search" placeholder="Search chats…" />
        </div>
        <div className="recent-head">
          Recent chats
          <button title="New chat"><Icon name="plus" size={12} /></button>
        </div>
        <div className="chat-list">
          {recents.map((r, i) => (
            <div key={i} className={`chat-item ${i === 0 ? 'active' : ''}`}>{r}</div>
          ))}
        </div>
        <div className="user-foot">
          <div className="sb-link">
            <Icon name="settings" size={14} /><span>Settings</span>
          </div>
          <div className="sb-link" onClick={() => setMode('admin')}>
            <Icon name="shield" size={14} /><span>Admin panel</span>
          </div>
          <div className="sb-link">
            <Icon name="logout" size={14} /><span>Sign out</span>
          </div>
        </div>
      </aside>
      <main className="user-main">
        <div className="user-tabs">
          {tabs.map(t => (
            <div key={t.id} className={`user-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <Icon name={t.icon} size={14} />
              <span>{t.label}</span>
              {t.badge && <span className="tab-badge">{t.badge}</span>}
            </div>
          ))}
          <div style={{flex: 1}} />
          <button className="btn btn-sm btn-ghost"><Icon name="bell" size={13} /></button>
          <div className="avatar" style={{width: 28, height: 28, fontSize: 11, marginLeft: 8}}>J</div>
        </div>
        {children}
      </main>
    </div>
  );
};

window.UserChat = function UserChat() {
  const [messages, setMessages] = usU([
    { role: 'user', text: 'are there any active bilge alarms right now?' },
    { role: 'assistant', text: 'No active bilge alarms right now. Bilge sensors across the vessel are showing normal levels.', sources: [
      { name: 'NMEA live · tanks.bilge.alarm', kind: 'metric' },
      { name: 'NMEA live · tanks.bilge.*.level', kind: 'metric' },
      { name: 'SFI 04.4 — Bilge System (19 assets)', kind: 'asset' },
    ], snapshot: [
      ['Bilge — Engine Room', 'Normal', 'ok'],
      ['Bilge — Lazarette', 'Normal · trending up', 'warn'],
      ['Bilge — Forepeak', 'Normal', 'ok'],
      ['Bilge — Tank Room', 'Normal', 'ok'],
    ]},
    { role: 'user', text: 'show me running hours for both main engines' },
    { role: 'assistant', text: 'Both main engines are running normally. Port has 4,218 h logged, Starboard 4,231 h. Next scheduled service for Port at 4,500 h (≈11 days at current usage).', sources: [
      { name: 'SFI 03.1.001 — ME Port', kind: 'asset' },
      { name: 'SFI 03.1.002 — ME Stbd', kind: 'asset' },
      { name: 'PMS task · 500h Service', kind: 'pms' },
    ]},
  ]);
  const [draft, setDraft] = usU('');
  const inputRef = urU();

  const send = () => {
    if (!draft.trim()) return;
    setMessages(m => [...m, { role: 'user', text: draft }, { role: 'assistant', loading: true }]);
    setDraft('');
    setTimeout(() => {
      setMessages(m => m.slice(0, -1).concat({ role: 'assistant', text: 'I\'ve checked live telemetry and the relevant manuals — here\'s what I found.', sources: [{ name: 'NMEA live', kind: 'metric' }, { name: 'MN_MTU_16V_4000_Operating.pdf', kind: 'doc' }] }));
    }, 1200);
  };

  return (
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <div style={{flex: 1, overflowY: 'auto', padding: '24px 0'}}>
        <div style={{maxWidth: 760, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 22}}>
          {messages.map((m, i) => (
            m.role === 'user'
              ? <UserBubble key={i} text={m.text} />
              : <AssistantBubble key={i} m={m} />
          ))}
        </div>
      </div>
      <div style={{padding: '12px 24px 22px', borderTop: '1px solid var(--line)', background: 'var(--bg-0)'}}>
        <div style={{maxWidth: 760, margin: '0 auto'}}>
          <div className="composer">
            <Icon name="sparkle" size={16} style={{color: 'var(--accent)', flexShrink: 0}} />
            <input ref={inputRef} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about engines, tanks, manuals, certificates…" />
            <button className="btn btn-sm btn-ghost" title="Attach"><Icon name="upload" size={13} /></button>
            <button className="send" onClick={send}><Icon name="send" size={14} /></button>
          </div>
          <div style={{textAlign: 'center', fontSize: 11, color: 'var(--text-4)', marginTop: 8}}>
            Pulls from <strong style={{color:'var(--text-3)'}}>1,207 live metrics</strong> · <strong style={{color:'var(--text-3)'}}>2,247 SFI assets</strong> · <strong style={{color:'var(--text-3)'}}>172 documents</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

function UserBubble({ text }) {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{background: 'var(--bg-3)', border: '1px solid var(--line-2)', padding: '10px 14px', borderRadius: 14, borderTopRightRadius: 4, maxWidth: '78%', fontSize: 13.5, color: 'var(--text-1)'}}>{text}</div>
    </div>
  );
}

function AssistantBubble({ m }) {
  return (
    <div style={{display: 'flex', gap: 12}}>
      <div style={{width: 28, height: 28, borderRadius: 7, background: 'var(--accent-dim)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flexShrink: 0}}>
        <TridentMark size={14} />
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        {m.loading
          ? <div style={{padding: '6px 0', display: 'flex', gap: 4}}>
              <span className="dot" style={{background: 'var(--text-3)', animation: 'pulse-danger 1.2s infinite'}} />
              <span className="dot" style={{background: 'var(--text-3)', animation: 'pulse-danger 1.2s infinite 0.2s'}} />
              <span className="dot" style={{background: 'var(--text-3)', animation: 'pulse-danger 1.2s infinite 0.4s'}} />
            </div>
          : <>
              <div style={{fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-1)', textWrap: 'pretty'}}>{m.text}</div>
              {m.snapshot && (
                <div style={{marginTop: 10, background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden'}}>
                  {m.snapshot.map((r, i) => (
                    <div key={i} style={{display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: i < m.snapshot.length - 1 ? '1px solid var(--line)' : 'none', fontSize: 12.5}}>
                      <span style={{flex: 1}}>{r[0]}</span>
                      <span className={r[2] === 'ok' ? 'pill pill-ok' : 'pill pill-warn'}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              )}
              {m.sources && (
                <div style={{marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6}}>
                  {m.sources.map((s, i) => (
                    <span key={i} style={{display:'inline-flex', alignItems:'center', gap: 5, fontSize: 11, color: 'var(--text-3)', background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '2px 8px', borderRadius: 4}}>
                      <Icon name={s.kind === 'metric' ? 'metrics' : s.kind === 'asset' ? 'asset' : s.kind === 'pms' ? 'pms' : 'doc'} size={10} />
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
            </>}
      </div>
    </div>
  );
}

window.UserAlerts = function UserAlerts() {
  const list = [
    { sev: 'danger', src: '03.1.010', title: 'Engine Mount Stbd AFT — vibration above threshold', body: '8.2 mm/s observed at 14:31 UTC; threshold 6.0 mm/s. Recommend reducing load and inspecting mount.', when: '14:31', cat: 'Vibration' },
    { sev: 'warn', src: '04.4.003', title: 'Bilge Lazarette — water level rising', body: 'Trend shows +12 mm over last 30 min. Below alarm level but above normal.', when: '13:48', cat: 'Bilge' },
    { sev: 'warn', src: '03.1.005', title: 'Emergency Generator preheat fault', body: 'During weekly auto-test, preheat circuit reported low voltage. Engine started on second attempt.', when: '12:02', cat: 'Electrical' },
  ];
  return (
    <div style={{flex: 1, overflowY: 'auto'}}>
      <div className="page" style={{paddingBottom: 28, maxWidth: 980}}>
        <div className="page-header">
          <div>
            <h1 className="page-title">Alerts</h1>
            <p className="page-subtitle">Live notifications from telemetry and the rule engine.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-sm">Acknowledge all</button>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {list.map((a, i) => (
            <div key={i} className="card" style={{padding: '14px 16px'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: 12}}>
                <div style={{width: 30, height: 30, borderRadius: 7, display: 'grid', placeItems: 'center', flexShrink: 0,
                  background: a.sev === 'danger' ? 'var(--danger-dim)' : 'var(--warn-dim)',
                  color: a.sev === 'danger' ? 'var(--danger)' : 'var(--warn)'
                }}>
                  <Icon name="alert" size={15} />
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div className="row" style={{marginBottom: 4, gap: 10}}>
                    <span className="pill mono">{a.src}</span>
                    <span className="pill pill-soft">{a.cat}</span>
                    <span style={{flex: 1}} />
                    <span className="text-3 mono" style={{fontSize: 11}}>{a.when}</span>
                  </div>
                  <div style={{fontSize: 13.5, fontWeight: 500, color: 'var(--text-1)', marginBottom: 4}}>{a.title}</div>
                  <div style={{fontSize: 12.5, color: 'var(--text-3)', textWrap: 'pretty'}}>{a.body}</div>
                  <div className="row" style={{marginTop: 10, gap: 8}}>
                    <button className="btn btn-sm">Acknowledge</button>
                    <button className="btn btn-sm">Open in PMS</button>
                    <button className="btn btn-sm btn-ghost"><Icon name="chat" size={11} /> Ask AI about this</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.UserPMS = function UserPMS() {
  const tasks = [
    { sfi: '03.1.001', t: '500h Service — ME Port', due: 'Overdue · 4d', sev: 'overdue', who: 'You' },
    { sfi: '07.1.001', t: 'Watermaker membrane flush', due: 'Overdue · 2d', sev: 'overdue', who: 'You' },
    { sfi: '03.1.003', t: 'Oil filter change — Gen 1', due: 'Due May 1', sev: 'soon', who: 'You' },
    { sfi: '03.1.004', t: 'Oil filter change — Gen 2', due: 'Due May 1', sev: 'soon', who: 'You' },
    { sfi: '06.1.002', t: 'Chiller 2 refrigerant top-up', due: 'Due May 3', sev: 'soon', who: 'You' },
    { sfi: '08.1', t: 'Fire panel weekly test', due: 'Done · Apr 27', sev: 'done', who: 'You' },
  ];
  return (
    <div style={{flex: 1, overflowY: 'auto'}}>
      <div className="page" style={{paddingBottom: 28, maxWidth: 980}}>
        <div className="page-header">
          <div>
            <h1 className="page-title">My maintenance tasks</h1>
            <p className="page-subtitle">Tasks assigned to you, sorted by due date.</p>
          </div>
        </div>
        <div className="card">
          <table className="dt">
            <thead><tr><th style={{width: 30}}></th><th>Task</th><th style={{width: 90}}>SFI</th><th style={{width: 140}}>Due</th><th style={{width: 80, textAlign: 'right'}}></th></tr></thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.t + t.sfi}>
                  <td><span className={`checkbox ${t.sev === 'done' ? 'checked' : ''}`} /></td>
                  <td className="cell-strong" style={{textDecoration: t.sev === 'done' ? 'line-through' : 'none', color: t.sev === 'done' ? 'var(--text-3)' : 'var(--text-1)'}}>{t.t}</td>
                  <td><span className="pill mono">{t.sfi}</span></td>
                  <td>
                    {t.sev === 'overdue' && <span className="pill pill-danger">{t.due}</span>}
                    {t.sev === 'soon' && <span className="pill pill-warn">{t.due}</span>}
                    {t.sev === 'done' && <span className="pill pill-ok">{t.due}</span>}
                  </td>
                  <td className="cell-actions"><button className="btn btn-sm">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
