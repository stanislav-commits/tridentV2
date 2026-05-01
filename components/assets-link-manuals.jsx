/* global React, Icon, SFI_GROUPS */
const { useState: uLM } = React;

window.BulkLinkManualsModal = function BulkLinkManualsModal({ onClose }) {
  const initialMatches = [
    { id: 1, doc: 'MN_MTU_16V_4000_M93L_Operating_Manual.pdf', meta: '12.4 MB · 412 chunks', conf: 96, sfi: '03.1', sfiName: 'Engines & Generators', asset: '03.1.001 Main Engine — Port', selected: true },
    { id: 2, doc: 'MN_MTU_16V_4000_Service_Schedule_2026.pdf', meta: '4.1 MB · 188 chunks', conf: 94, sfi: '03.1', sfiName: 'Engines & Generators', asset: '03.1.001 Main Engine — Port', selected: true },
    { id: 3, doc: 'MN_MASE_IS44_Operation.pdf', meta: '3.8 MB · 144 chunks', conf: 92, sfi: '03.1', sfiName: 'Engines & Generators', asset: '03.1.003 Generator 1 (Port)', selected: true },
    { id: 4, doc: 'MN_VolvoPenta_D5A_T_Workshop.pdf', meta: '5.2 MB · 201 chunks', conf: 89, sfi: '03.1', sfiName: 'Engines & Generators', asset: '03.1.005 Emergency Generator', selected: true },
    { id: 5, doc: 'MN_Allweiler_TRA_Pumps_2024.pdf', meta: '2.9 MB · 96 chunks', conf: 84, sfi: '03.1', sfiName: 'Engines & Generators', asset: '03.1.006 Day Tank Transfer Pump A', selected: true },
    { id: 6, doc: 'CMP_Engine_Mount_AVM450_Datasheet.pdf', meta: '0.9 MB · 22 chunks', conf: 78, sfi: '03.1', sfiName: 'Engines & Generators', asset: '— group level only —', selected: true },
    { id: 7, doc: 'Sea_Wolf_X_ER_Layout_Rev_C.pdf', meta: '1.4 MB · 38 chunks', conf: 62, sfi: '03', sfiName: 'Machinery — Propulsion', asset: '— group level only —', selected: true },
    { id: 8, doc: 'Generic_Marine_Diesel_Troubleshooting_Guide.pdf', meta: '6.8 MB · 320 chunks', conf: 41, sfi: '03.1', sfiName: 'Engines & Generators', asset: '— group level only —', selected: false },
    { id: 9, doc: 'CrewSafetyBriefing_April_2026.pdf', meta: '0.6 MB · 14 chunks', conf: 12, sfi: null, sfiName: null, asset: null, selected: false },
    { id: 10, doc: 'Yard_Invoice_2026_Q1_Refit.pdf', meta: '2.1 MB · 60 chunks', conf: 8, sfi: null, sfiName: null, asset: null, selected: false },
  ];

  const [matches, setMatches] = uLM(initialMatches);
  const [threshold, setThreshold] = uLM('all');

  const toggleAll = (val) => setMatches(matches.map(m => ({...m, selected: val && m.conf >= 50})));
  const toggleOne = (id) => setMatches(matches.map(m => m.id === id ? {...m, selected: !m.selected} : m));

  const filtered = threshold === 'high' ? matches.filter(m => m.conf >= 80)
    : threshold === 'mid' ? matches.filter(m => m.conf >= 50)
    : matches;

  const selectedCount = matches.filter(m => m.selected).length;

  const confClass = (c) => c >= 80 ? 'conf-high' : c >= 50 ? 'conf-mid' : 'conf-low';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-xl" style={{height: '84vh'}} onClick={e => e.stopPropagation()}>
        <div className="wiz-head">
          <div className="modal-icon"><Icon name="link" size={16} /></div>
          <div>
            <div className="wiz-title">Bulk-link manuals to assets</div>
            <div className="wiz-sub">AI matched 10 unlinked PDFs to SFI groups and specific assets · Review confidence and approve</div>
          </div>
          <button className="wiz-close" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>

        <div style={{padding: '12px 22px', background: 'var(--bg-2)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 14, fontSize: 12}}>
          <span className="text-3">Show:</span>
          <div className="seg">
            {[['all', 'All matches'], ['mid', 'Confidence ≥ 50%'], ['high', 'Confidence ≥ 80%']].map(([k, l]) => (
              <button key={k} className={`seg-btn ${threshold === k ? 'active' : ''}`} onClick={() => setThreshold(k)}>{l}</button>
            ))}
          </div>
          <span style={{marginLeft: 'auto'}} className="row gap-12">
            <button className="btn btn-sm" onClick={() => toggleAll(true)}>Select all ≥ 50%</button>
            <button className="btn btn-sm btn-ghost" onClick={() => toggleAll(false)}>Clear</button>
          </span>
        </div>

        <div className="wiz-body" style={{padding: 0}}>
          <div className="match-row" style={{background: 'var(--bg-2)', fontSize: 10.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, position: 'sticky', top: 0}}>
            <span><span className="checkbox checked" onClick={() => toggleAll(false)} /></span>
            <span>Document</span>
            <span>Suggested target</span>
            <span>Confidence</span>
            <span style={{textAlign: 'right'}}>%</span>
            <span></span>
          </div>
          {filtered.map(m => (
            <div key={m.id} className={`match-row ${!m.sfi ? 'unmatched' : ''}`} onClick={() => toggleOne(m.id)}>
              <span><span className={`checkbox ${m.selected ? 'checked' : ''}`} /></span>
              <div style={{minWidth: 0}}>
                <div className="match-doc"><Icon name="doc" size={12} style={{color: 'var(--text-3)', marginRight: 6, verticalAlign: 'middle'}} />{m.doc}</div>
                <div className="match-doc-sub">{m.meta}</div>
              </div>
              <div>
                {m.sfi ? (
                  <div className="match-target">
                    <span className="mono">{m.sfi}</span>
                    <span style={{color: 'var(--text-1)'}}>{m.sfiName}</span>
                  </div>
                ) : (
                  <span className="pill pill-soft">No match</span>
                )}
                {m.asset && m.asset !== '— group level only —' && (
                  <div style={{fontSize: 10.5, color: 'var(--text-3)', marginTop: 4, fontFamily: "'JetBrains Mono', monospace"}}>→ {m.asset}</div>
                )}
                {m.asset === '— group level only —' && (
                  <div style={{fontSize: 10.5, color: 'var(--text-4)', marginTop: 4, fontStyle: 'italic'}}>group level only</div>
                )}
              </div>
              <div className="conf-bar">
                <div className={`conf-fill ${confClass(m.conf)}`} style={{transform: `scaleX(${m.conf / 100})`}} />
              </div>
              <span className="conf-text">{m.conf}%</span>
              <button className="btn btn-sm btn-icon-only btn-ghost" onClick={e => e.stopPropagation()} title="Edit target"><Icon name="edit" size={11} /></button>
            </div>
          ))}
        </div>

        <div className="wiz-foot">
          <div className="wiz-foot-left">
            <strong style={{color: 'var(--text-1)'}}>{selectedCount}</strong> of {matches.length} documents selected for linking
          </div>
          <div className="wiz-foot-right">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={onClose}>
              <Icon name="link" size={12} /> Link {selectedCount} document{selectedCount === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
