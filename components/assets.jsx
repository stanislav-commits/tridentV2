/* global React, Icon, SFI_GROUPS, SFI_ASSETS_SAMPLE, ImportXlsxModal, BulkLinkManualsModal, AddAssetWizard, AssetDetailFull, AssetLogicModal */
const { useState: usAR, useMemo: umAR } = React;

window.AssetRegisterPage = function AssetRegisterPage() {
  const [selected, setSelected] = usAR('03.1');
  const [expanded, setExpanded] = usAR(new Set(['03', '04', '05', '08', '09']));
  const [activeAsset, setActiveAsset] = usAR('03.1.001');
  const [activeTab, setActiveTab] = usAR('overview');
  const [search, setSearch] = usAR('');
  const [view, setView] = usAR('split'); // 'split' | 'full'
  const [modal, setModal] = usAR(null); // 'import' | 'link' | 'add' | null

  const toggle = (code) => {
    const s = new Set(expanded);
    s.has(code) ? s.delete(code) : s.add(code);
    setExpanded(s);
  };

  const asset = SFI_ASSETS_SAMPLE.find(a => a.id === activeAsset) || SFI_ASSETS_SAMPLE[0];

  const filteredGroups = umAR(() => {
    if (!search) return SFI_GROUPS;
    const q = search.toLowerCase();
    const matches = (n) => n.code.toLowerCase().includes(q) || (n.name || '').toLowerCase().includes(q);
    const filterNode = (n) => {
      if (!n.children) return matches(n) ? n : null;
      const kids = n.children.map(filterNode).filter(Boolean);
      if (matches(n) || kids.length) return { ...n, children: kids.length ? kids : n.children };
      return null;
    };
    return SFI_GROUPS.map(filterNode).filter(Boolean);
  }, [search]);

  // Full-page detail mode replaces the whole page
  if (view === 'full') {
    return (
      <>
        <AssetDetailFull asset={asset} onBack={() => setView('split')} />
        {modal === 'import' && <ImportXlsxModal onClose={() => setModal(null)} />}
        {modal === 'link' && <BulkLinkManualsModal onClose={() => setModal(null)} />}
        {modal === 'add' && <AddAssetWizard onClose={() => setModal(null)} />}
        {modal === 'logic' && <AssetLogicModal onClose={() => setModal(null)} />}
      </>
    );
  }

  return (
    <div className="page" style={{paddingBottom: 28}}>
      <div className="page-header">
        <div style={{minWidth: 0, flex: 1}}>
          <h1 className="page-title">Asset Register</h1>
          <p className="page-subtitle">SFI-coded equipment hierarchy. Each asset links to manuals, live metrics, PMS tasks, certificates and spares.</p>
        </div>
        <div className="page-actions">
          <div className="toggle-pill" style={{marginRight: 6}}>
            <span className={`toggle-opt ${view === 'split' ? 'active' : ''}`} onClick={() => setView('split')}>Split</span>
            <span className={`toggle-opt ${view === 'full' ? 'active' : ''}`} onClick={() => setView('full')}>Full page</span>
          </div>
          <button className="btn" onClick={() => setModal('logic')}><Icon name="audit" size={13} /> Logic spec</button>
          <button className="btn" onClick={() => setModal('import')}><Icon name="upload" size={13} /> Import xlsx</button>
          <button className="btn" onClick={() => setModal('link')}><Icon name="link" size={13} /> Bulk link manuals</button>
          <button className="btn"><Icon name="download" size={13} /> Export</button>
          <button className="btn btn-primary" onClick={() => setModal('add')}><Icon name="plus" size={13} /> Add asset</button>
        </div>
      </div>

      <div className="split">
        {/* TREE */}
        <div className="split-tree">
          <div className="tree-search">
            <input className="input input-search" placeholder="Filter SFI codes…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="tree">
            <div className={`tree-node ${selected === 'all' ? 'active' : ''}`} onClick={() => setSelected('all')}>
              <span className="tree-caret" />
              <span className="tree-code">—</span>
              <span className="tree-name" style={{fontWeight: 500}}>All assets</span>
              <span className="tree-count">2,247</span>
            </div>
            {filteredGroups.map(g => (
              <TreeNode key={g.code} node={g} depth={0} selected={selected} setSelected={setSelected} expanded={expanded} toggle={toggle} />
            ))}
          </div>
        </div>

        {/* DETAIL */}
        <div className="split-detail">
          <div className="detail-head">
            <div className="row gap-12">
              <span className="detail-code mono">SFI 03.1</span>
              <span className="detail-title">Engines & Generators</span>
              <span style={{marginLeft: 'auto'}} className="row gap-12">
                <button className="btn btn-sm"><Icon name="filter" size={12} /> Filter</button>
                <button className="btn btn-sm" onClick={() => setModal('link')}><Icon name="link" size={12} /> Bulk link manuals</button>
              </span>
            </div>
            <div className="detail-meta">
              <span className="detail-meta-item"><Icon name="asset" size={12} /> <strong>28</strong> assets</span>
              <span className="detail-meta-item"><span className="dot dot-ok" /> 25 operational</span>
              <span className="detail-meta-item"><span className="dot dot-warn" /> 2 maintenance</span>
              <span className="detail-meta-item"><span className="dot dot-danger" /> 1 fault</span>
              <span className="detail-meta-item"><Icon name="kb" size={12} /> 41 manuals linked</span>
              <span className="detail-meta-item"><Icon name="metrics" size={12} /> 184 metrics</span>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 380px', flex: 1, minHeight: 0}}>
            <div style={{overflow: 'auto', borderRight: '1px solid var(--line)'}}>
              <table className="dt dt-compact">
                <thead>
                  <tr>
                    <th style={{width: 28}}><span className="checkbox" /></th>
                    <th style={{width: 90}}>SFI</th>
                    <th>Name</th>
                    <th style={{width: 110}}>Mfr</th>
                    <th style={{width: 90}}>Status</th>
                    <th style={{width: 80, textAlign: 'right'}}>Hours</th>
                    <th style={{width: 110}}>Last service</th>
                  </tr>
                </thead>
                <tbody>
                  {SFI_ASSETS_SAMPLE.map(a => (
                    <tr key={a.id} className={activeAsset === a.id ? 'selected' : ''} onClick={() => setActiveAsset(a.id)} style={{cursor: 'pointer'}}>
                      <td><span className="checkbox" /></td>
                      <td className="cell-mono">{a.sfi}</td>
                      <td className="cell-strong">{a.name}</td>
                      <td>{a.mfr}</td>
                      <td>
                        {a.status === 'operational' && <span className="pill pill-ok"><span className="dot dot-ok" /> OK</span>}
                        {a.status === 'maintenance' && <span className="pill pill-warn">MAINT</span>}
                        {a.status === 'fault' && <span className="pill pill-danger">FAULT</span>}
                      </td>
                      <td className="cell-mono" style={{textAlign: 'right'}}>{a.running_hrs ?? '—'}</td>
                      <td className="cell-mono">{a.last_service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
              <div style={{padding: '14px 16px 10px', borderBottom: '1px solid var(--line)'}}>
                <div className="row gap-12" style={{marginBottom: 6}}>
                  <span className="detail-code mono">{asset.sfi}</span>
                  {asset.status === 'operational' && <span className="pill pill-ok"><span className="dot dot-ok" /> Operational</span>}
                  {asset.status === 'maintenance' && <span className="pill pill-warn">In maintenance</span>}
                  {asset.status === 'fault' && <span className="pill pill-danger"><span className="dot dot-danger" /> Fault</span>}
                  <button className="btn btn-sm btn-ghost" style={{marginLeft: 'auto'}} onClick={() => setView('full')} title="Open full page">
                    <Icon name="arrow-up-right" size={12} />
                  </button>
                </div>
                <div style={{fontSize: 15, fontWeight: 600, marginBottom: 6}}>{asset.name}</div>
                <div className="text-3" style={{fontSize: 12}}>{asset.mfr} · {asset.model} · S/N {asset.serial}</div>
                <div className="text-3" style={{fontSize: 12, marginTop: 2}}>{asset.location}</div>
                <div className="row gap-12" style={{marginTop: 12}}>
                  <button className="btn btn-sm btn-primary" style={{flex: 1, justifyContent: 'center'}} onClick={() => setView('full')}><Icon name="arrow-up-right" size={12} /> Open full page</button>
                  <button className="btn btn-sm"><Icon name="sparkle" size={12} /></button>
                </div>
              </div>

              <div className="sub-tabs" style={{margin: '12px 14px 0', width: 'auto'}}>
                {['overview', 'metrics', 'manuals', 'pms', 'spares'].map(t => (
                  <button key={t} className={`sub-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                    {t === 'overview' && 'Overview'}
                    {t === 'metrics' && <>Metrics <span className="pill pill-soft" style={{padding:'0 5px'}}>14</span></>}
                    {t === 'manuals' && <>Manuals <span className="pill pill-soft" style={{padding:'0 5px'}}>{asset.manuals}</span></>}
                    {t === 'pms' && <>PMS <span className="pill pill-soft" style={{padding:'0 5px'}}>{asset.tasks_open}</span></>}
                    {t === 'spares' && <>Spares <span className="pill pill-soft" style={{padding:'0 5px'}}>{asset.spares}</span></>}
                  </button>
                ))}
              </div>

              <div style={{flex: 1, overflow: 'auto', padding: '6px 16px 16px'}}>
                {activeTab === 'overview' && <AssetOverview a={asset} />}
                {activeTab === 'metrics' && <AssetMetrics />}
                {activeTab === 'manuals' && <AssetManuals />}
                {activeTab === 'pms' && <AssetPMS />}
                {activeTab === 'spares' && <AssetSpares />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal === 'import' && <ImportXlsxModal onClose={() => setModal(null)} />}
      {modal === 'link' && <BulkLinkManualsModal onClose={() => setModal(null)} />}
      {modal === 'add' && <AddAssetWizard onClose={() => setModal(null)} />}
      {modal === 'logic' && <AssetLogicModal onClose={() => setModal(null)} />}
    </div>
  );
};

function AssetOverview({ a }) {
  const rows = [
    ['Manufacturer', a.mfr],
    ['Model', a.model],
    ['Serial', a.serial],
    ['Location', a.location],
    ['Running hours', a.running_hrs ? `${a.running_hrs.toLocaleString()} h` : '—'],
    ['Last service', a.last_service],
    ['Linked metrics', '14 metrics'],
    ['Linked manuals', `${a.manuals} documents`],
    ['Open PMS', `${a.tasks_open} task(s)`],
    ['Certificates', `${a.certs}`],
    ['Spares on board', `${a.spares} items`],
  ];
  return (
    <div style={{fontSize: 12.5}}>
      {rows.map(([k, v]) => (
        <div key={k} style={{display: 'grid', gridTemplateColumns: '130px 1fr', padding: '7px 0', borderBottom: '1px solid var(--line)'}}>
          <span className="text-3">{k}</span>
          <span style={{color: 'var(--text-1)'}} className={typeof v === 'string' && /^[0-9SR]/.test(v) ? 'mono' : ''}>{v}</span>
        </div>
      ))}
    </div>
  );
}
function AssetMetrics() {
  const list = [
    ['engines.port.rpm', '1,840', 'rpm'],
    ['engines.port.coolant.temp', '82.3', '°C'],
    ['engines.port.oil.pressure', '5.4', 'bar'],
    ['engines.port.exhaust.temp', '412', '°C'],
    ['engines.port.fuel.rate', '78.2', 'L/h'],
    ['engines.port.load', '74', '%'],
    ['engines.port.battery.voltage', '27.8', 'V'],
  ];
  return (
    <div>
      {list.map(([k, v, u]) => (
        <div key={k} style={{display: 'flex', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--line)', fontSize: 12}}>
          <span className="mono text-3" style={{flex: 1, fontSize: 11.5}}>{k}</span>
          <span className="mono" style={{fontWeight: 500}}>{v}</span>
          <span className="text-3 mono" style={{fontSize: 11, marginLeft: 4, width: 40}}>{u}</span>
        </div>
      ))}
    </div>
  );
}
function AssetManuals() {
  const list = [
    { name: 'MN_MTU_16V_4000_Operating.pdf', date: '12 Mar 2026', chunks: 412 },
    { name: 'MN_MTU_16V_Service_Sched.pdf', date: '12 Mar 2026', chunks: 188 },
    { name: 'MN_MTU_Spare_Parts_2026.pdf', date: '04 Feb 2026', chunks: 86 },
  ];
  return (
    <div>
      {list.map(m => (
        <div key={m.name} style={{padding: '8px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10}}>
          <Icon name="doc" size={14} style={{color: 'var(--text-3)'}} />
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontSize: 12, color: 'var(--text-1)', overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.name}</div>
            <div className="text-3" style={{fontSize: 11}}>{m.date} · {m.chunks} chunks</div>
          </div>
          <button className="btn btn-sm btn-ghost"><Icon name="eye" size={12} /></button>
        </div>
      ))}
      <button className="btn btn-sm" style={{marginTop: 10, width: '100%', justifyContent: 'center'}}><Icon name="link" size={12} /> Link existing document</button>
    </div>
  );
}
function AssetPMS() {
  const list = [
    { t: 'Oil & filter change', due: '2026-05-12', state: 'upcoming' },
    { t: '500h inspection', due: '2026-04-30', state: 'overdue' },
  ];
  return (
    <div>
      {list.map(m => (
        <div key={m.t} style={{padding: '8px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10}}>
          <Icon name="pms" size={14} style={{color: 'var(--text-3)'}} />
          <div style={{flex: 1}}>
            <div style={{fontSize: 12, color: 'var(--text-1)'}}>{m.t}</div>
            <div className="text-3 mono" style={{fontSize: 11}}>Due {m.due}</div>
          </div>
          {m.state === 'overdue' ? <span className="pill pill-danger">OVERDUE</span> : <span className="pill pill-soft">UPCOMING</span>}
        </div>
      ))}
    </div>
  );
}
function AssetSpares() {
  const list = [
    ['Oil filter', 'P/N 5004060', 4],
    ['Fuel filter', 'P/N 0040921', 6],
    ['V-belt 13×1500', 'P/N V13-1500', 2],
    ['Impeller', 'P/N IMP-455', 1],
  ];
  return (
    <div>
      {list.map(([n, pn, qty]) => (
        <div key={n} style={{padding: '7px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', fontSize: 12}}>
          <div style={{flex: 1}}>
            <div style={{color: 'var(--text-1)'}}>{n}</div>
            <div className="text-3 mono" style={{fontSize: 11}}>{pn}</div>
          </div>
          <span className="mono">×{qty}</span>
        </div>
      ))}
    </div>
  );
}

function TreeNode({ node, depth, selected, setSelected, expanded, toggle }) {
  const isOpen = expanded.has(node.code);
  const hasChildren = !!(node.children && node.children.length);
  return (
    <React.Fragment>
      <div className={`tree-node ${selected === node.code ? 'active' : ''}`}
        style={{paddingLeft: 8 + depth * 14}}
        onClick={() => { setSelected(node.code); if (hasChildren) toggle(node.code); }}>
        <span className={`tree-caret ${isOpen ? 'expanded' : ''}`}>
          {hasChildren && <Icon name="chevron-right" size={11} />}
        </span>
        <span className="tree-code">{node.code}</span>
        <span className="tree-name">{node.name}</span>
        <span className="tree-count">{node.count}</span>
      </div>
      {hasChildren && isOpen && node.children.map(c => (
        <TreeNode key={c.code} node={c} depth={depth + 1} selected={selected} setSelected={setSelected} expanded={expanded} toggle={toggle} />
      ))}
    </React.Fragment>
  );
}
