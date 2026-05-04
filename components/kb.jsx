/* global React, Icon */
const { useState: usKB } = React;

window.KnowledgeBasePage = function KnowledgeBasePage() {
  const [cat, setCat] = usKB('manuals');
  const [selected, setSelected] = usKB(new Set());
  const cats = [
    { id: 'all', name: 'All documents', icon: 'kb', count: 172 },
    { id: 'manuals', name: 'Manuals', icon: 'doc', count: 92 },
    { id: 'history', name: 'History & Procedures', icon: 'history', count: 34 },
    { id: 'regulation', name: 'Regulation & ISM', icon: 'compliance', count: 18 },
    { id: 'sop', name: 'SOPs', icon: 'doc', count: 12 },
    { id: 'marpol', name: 'MARPOL', icon: 'compliance', count: 8 },
  ];
  const docs = [
    { name: 'MN_MTU_16V_4000_Operating.pdf', sfi: '02.1.001', tags: ['Engines', 'MTU'], status: 'done', chunks: 412, size: '14.2 MB', date: '12 Mar 2026' },
    { name: 'MN_VolvoPenta_D5A_v3.pdf', sfi: '02.1.005', tags: ['Generator', 'Volvo'], status: 'done', chunks: 453, size: '18.8 MB', date: '21 Apr 2026' },
    { name: 'MN_MASE_IS44_rev2.pdf', sfi: '02.1.003', tags: ['Generator', 'MASE'], status: 'parsing', chunks: null, size: '9.4 MB', date: '28 Apr 2026', progress: 38 },
    { name: 'MN_MACB531 (3).pdf', sfi: '05.1', tags: ['Battery'], status: 'done', chunks: 85, size: '3.1 MB', date: '09 Apr 2026' },
    { name: 'MN_IN-PQ-FQ (2).pdf', sfi: '04.1', tags: ['Fuel'], status: 'done', chunks: 47, size: '2.4 MB', date: '09 Apr 2026' },
    { name: 'MN_HANDPUMP (2).pdf', sfi: '04.4', tags: ['Bilge'], status: 'done', chunks: 12, size: '0.6 MB', date: '09 Apr 2026' },
    { name: 'MN_GK (2).pdf', sfi: null, tags: [], status: 'unmapped', chunks: 91, size: '4.2 MB', date: '09 Apr 2026' },
    { name: 'MN_CB (2).pdf', sfi: null, tags: [], status: 'unmapped', chunks: 40, size: '1.8 MB', date: '09 Apr 2026' },
    { name: 'MN_ACB531 (2).pdf', sfi: '05.1', tags: ['Battery'], status: 'done', chunks: 73, size: '3.4 MB', date: '09 Apr 2026' },
    { name: 'CERT_SOLAS_2026.pdf', sfi: '01', tags: ['Cert', 'Statutory'], status: 'done', chunks: 18, size: '0.4 MB', date: '02 Apr 2026', expires: '2027-02-15' },
    { name: 'CERT_MARPOL_IOPP.pdf', sfi: '01', tags: ['Cert', 'MARPOL'], status: 'done', chunks: 12, size: '0.3 MB', date: '02 Apr 2026', expires: '2026-06-30', expiringSoon: true },
    { name: 'SOP_BunkeringV4.docx', sfi: '04.1', tags: ['SOP', 'Bunkering'], status: 'queued', chunks: null, size: '0.2 MB', date: '28 Apr 2026' },
    { name: 'ISM_Manual_2026_Q2.pdf', sfi: null, tags: ['ISM'], status: 'queued', chunks: null, size: '6.7 MB', date: '28 Apr 2026' },
  ];

  const toggleSel = n => {
    const s = new Set(selected);
    s.has(n) ? s.delete(n) : s.add(n);
    setSelected(s);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Knowledge Base</h1>
          <p className="page-subtitle">Documents indexed for RAG. Link any document to SFI assets so the assistant pulls the right manual when asked.</p>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="tag" size={13} /> Auto-categorize</button>
          <button className="btn btn-primary"><Icon name="upload" size={13} /> Upload documents</button>
        </div>
      </div>

      <div className="stat-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
        <div className="stat-card">
          <div className="stat-label">Documents</div>
          <div className="stat-value">172</div>
          <div className="stat-foot">12,431 RAG chunks</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Linked to SFI</div>
          <div className="stat-value">148<span style={{fontSize: 14, color: 'var(--text-3)'}}> / 172</span></div>
          <div className="stat-foot">86% coverage</div>
        </div>
        <div className="stat-card stat-warn">
          <div className="stat-label">RAG queue</div>
          <div className="stat-value">4</div>
          <div className="stat-foot">2 parsing · 2 queued</div>
        </div>
        <div className="stat-card stat-warn">
          <div className="stat-label">Certificates expiring</div>
          <div className="stat-value">3</div>
          <div className="stat-foot">Within 60 days</div>
        </div>
      </div>

      <div className="kb-grid">
        <div className="kb-side">
          {cats.map(c => (
            <div key={c.id} className={`kb-cat ${cat === c.id ? 'active' : ''}`} onClick={() => setCat(c.id)}>
              <Icon name={c.icon} size={14} />
              <span>{c.name}</span>
              <span className="kb-cat-count">{c.count}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="upload-zone">
            <Icon name="upload" size={20} style={{color: 'var(--text-3)'}} />
            <div style={{marginTop: 6, fontSize: 13}}><strong>Drag files here</strong> or <a style={{color: 'var(--accent)', cursor: 'pointer'}}>browse</a></div>
            <div className="upload-formats">PDF · DOC · DOCX · TXT · MD · CSV · JPG · PNG · WEBP</div>
          </div>

          {selected.size > 0 && (
            <div className="card" style={{marginBottom: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{fontSize: 12.5}}><strong>{selected.size}</strong> selected</span>
              <span style={{flex: 1}} />
              <button className="btn btn-sm"><Icon name="link" size={12} /> Link to SFI…</button>
              <button className="btn btn-sm"><Icon name="rag" size={12} /> Re-index</button>
              <button className="btn btn-sm"><Icon name="download" size={12} /> Download</button>
              <button className="btn btn-sm btn-danger"><Icon name="trash" size={12} /> Delete</button>
            </div>
          )}

          <div className="card">
            <div style={{padding: '10px 14px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12}}>
              <input className="input input-search" style={{maxWidth: 260}} placeholder="Search documents…" />
              <span className="seg">
                <button className="seg-btn active">All</button>
                <button className="seg-btn">Linked</button>
                <button className="seg-btn">Unmapped</button>
                <button className="seg-btn">Issues</button>
              </span>
              <span style={{flex: 1}} />
              <span className="text-3" style={{fontSize: 12}}>Showing 1–13 of 172</span>
            </div>
            <table className="dt dt-compact">
              <thead>
                <tr>
                  <th style={{width: 28}}>
                    <span className={`checkbox ${selected.size === docs.length ? 'checked' : ''}`}
                      onClick={() => setSelected(selected.size === docs.length ? new Set() : new Set(docs.map(d => d.name)))} />
                  </th>
                  <th>Filename</th>
                  <th style={{width: 120}}>SFI link</th>
                  <th style={{width: 120}}>RAG status</th>
                  <th style={{width: 100}}>Uploaded</th>
                  <th style={{width: 110, textAlign: 'right'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map(d => (
                  <tr key={d.name}>
                    <td><span className={`checkbox ${selected.has(d.name) ? 'checked' : ''}`} onClick={() => toggleSel(d.name)} /></td>
                    <td>
                      <div className="row" style={{gap: 8}}>
                        <Icon name="doc" size={13} style={{color: 'var(--text-3)'}} />
                        <span className="cell-strong" style={{maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{d.name}</span>
                        {d.expiringSoon && <span className="pill pill-warn">EXP. SOON</span>}
                      </div>
                      <div className="text-3" style={{fontSize: 11, marginLeft: 21, marginTop: 2}}>{d.size}{d.expires && ` · expires ${d.expires}`}</div>
                    </td>
                    <td>
                      {d.sfi
                        ? <span className="pill mono">{d.sfi}</span>
                        : <button className="btn btn-sm btn-ghost" style={{padding: '2px 8px', fontSize: 11}}><Icon name="link" size={10} /> Link</button>}
                    </td>
                    <td>
                      {d.status === 'done' && <span className="pill pill-ok">{d.chunks} CHUNKS</span>}
                      {d.status === 'parsing' && (
                        <span className="row gap-12" style={{gap: 6}}>
                          <span className="pill pill-info">PARSING {d.progress}%</span>
                        </span>
                      )}
                      {d.status === 'queued' && <span className="pill pill-soft">QUEUED</span>}
                      {d.status === 'unmapped' && <span className="pill pill-warn">UNMAPPED</span>}
                    </td>
                    <td className="cell-mono" style={{fontSize: 11}}>{d.date}</td>
                    <td className="cell-actions">
                      <button className="btn btn-sm btn-ghost"><Icon name="eye" size={11} /></button>
                      <button className="btn btn-sm btn-ghost"><Icon name="edit" size={11} /></button>
                      <button className="btn btn-sm btn-ghost"><Icon name="trash" size={11} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10}}>
              <button className="btn btn-sm">Prev</button>
              <button className="btn btn-sm">Next</button>
              <span className="text-3" style={{fontSize: 12, marginLeft: 'auto'}}>Page 1 / 14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
