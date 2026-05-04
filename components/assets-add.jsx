/* global React, Icon, SFI_GROUPS */
const { useState: uAA, useMemo: uMAA } = React;

window.AddAssetWizard = function AddAssetWizard({ onClose }) {
  const [step, setStep] = uAA(0);
  const [parent, setParent] = uAA('02');
  const [child, setChild] = uAA('02.1');
  const [data, setData] = uAA({
    name: 'Genset Cooling Pump',
    mfr: 'Allweiler',
    model: 'AHO-E1-32',
    serial: 'AW-19-4421',
    location: 'Engine Room — Stbd',
    status: 'operational',
    running_hrs: '1402',
    install_date: '2018-06-12',
    last_service: '2026-01-12',
    next_service: '2026-07-12',
    notes: '',
    runtime_metric: true,
    auto_pms: true,
    auto_match_manuals: true,
  });

  const set = (k, v) => setData({...data, [k]: v});
  const steps = ['SFI location', 'Identity', 'Operations', 'Review & create'];
  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const parents = SFI_GROUPS;
  const children = uMAA(() => (parents.find(p => p.code === parent) || {}).children || [], [parent]);
  const parentObj = parents.find(p => p.code === parent);
  const childObj = children.find(c => c.code === child);
  const proposedSfi = `${child}.${String((childObj?.count || 0) + 1).padStart(3, '0')}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-xl" style={{height: '84vh'}} onClick={e => e.stopPropagation()}>
        <div className="wiz-head">
          <div className="modal-icon"><Icon name="plus" size={16} /></div>
          <div>
            <div className="wiz-title">Add new asset</div>
            <div className="wiz-sub">Place equipment in the SFI taxonomy and capture identity, telemetry and PMS defaults</div>
          </div>
          <button className="wiz-close" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>

        <div className="stepper">
          {steps.map((s, i) => (
            <div key={s} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <span className="step-num">{i < step ? <Icon name="check" size={11} /> : i + 1}</span>
              <span className="step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="wiz-body">
          {step === 0 && <AddStep1 parents={parents} parent={parent} setParent={setParent} children={children} child={child} setChild={setChild} proposedSfi={proposedSfi} parentObj={parentObj} childObj={childObj} />}
          {step === 1 && <AddStep2 data={data} set={set} proposedSfi={proposedSfi} />}
          {step === 2 && <AddStep3 data={data} set={set} />}
          {step === 3 && <AddStep4 data={data} proposedSfi={proposedSfi} parentObj={parentObj} childObj={childObj} setStep={setStep} />}
        </div>

        <div className="wiz-foot">
          <div className="wiz-foot-left">
            {step < 3 && <span className="row gap-12"><span className="mono" style={{color: 'var(--text-2)'}}>SFI: {proposedSfi}</span></span>}
          </div>
          <div className="wiz-foot-right">
            {step > 0 && step < 3 && <button className="btn" onClick={back}><Icon name="chevron-left" size={12} /> Back</button>}
            {step < 3 && <button className="btn btn-primary" onClick={next}>Continue <Icon name="chevron-right" size={12} /></button>}
            {step === 3 && (
              <>
                <button className="btn" onClick={onClose}>Save as draft</button>
                <button className="btn btn-primary" onClick={onClose}><Icon name="check" size={12} /> Create asset</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function AddStep1({ parents, parent, setParent, children, child, setChild, proposedSfi, parentObj, childObj }) {
  return (
    <div>
      <div className="text-3" style={{fontSize: 12, marginBottom: 12}}>
        Pick the SFI group, then the sub-group. The next available SFI ID will be assigned automatically.
      </div>

      <div className="sfi-picker">
        <div className="sfi-picker-col">
          {parents.map(p => (
            <div key={p.code} className={`sfi-picker-item ${parent === p.code ? 'active' : ''}`} onClick={() => { setParent(p.code); if (p.children) setChild(p.children[0].code); }}>
              <span className="sfi-code">{p.code}</span>
              <span style={{flex: 1}}>{p.name}</span>
              <span className="sfi-count">{p.count}</span>
              {p.children && <Icon name="chevron-right" size={11} style={{color: 'var(--text-4)'}} />}
            </div>
          ))}
        </div>
        <div className="sfi-picker-col">
          {children.length === 0 ? (
            <div style={{padding: 18, fontSize: 12, color: 'var(--text-4)', textAlign: 'center'}}>This group has no sub-groups. Asset will be placed directly under {parent}.</div>
          ) : children.map(c => (
            <div key={c.code} className={`sfi-picker-item ${child === c.code ? 'active' : ''}`} onClick={() => setChild(c.code)}>
              <span className="sfi-code">{c.code}</span>
              <span style={{flex: 1}}>{c.name}</span>
              <span className="sfi-count">{c.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop: 18, padding: '14px 18px', background: 'var(--accent-dim)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 14}}>
        <Icon name="tag" size={16} style={{color: 'var(--accent)'}} />
        <div>
          <div style={{fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600}}>Proposed SFI ID</div>
          <div className="mono" style={{fontSize: 18, fontWeight: 600, marginTop: 2, color: 'var(--text-1)'}}>{proposedSfi}</div>
        </div>
        <div style={{marginLeft: 'auto', textAlign: 'right', fontSize: 11.5, color: 'var(--text-2)'}}>
          {parentObj?.name} <Icon name="chevron-right" size={10} /> {childObj?.name || '—'}<br/>
          <span className="text-3 mono" style={{fontSize: 10.5}}>Existing in this group: {childObj?.count || parentObj?.count}</span>
        </div>
      </div>
    </div>
  );
}

function AddStep2({ data, set, proposedSfi }) {
  return (
    <div>
      <div className="form-grid-2">
        <label className="field" style={{gridColumn: '1 / -1', marginBottom: 0}}>
          <span className="field-label">Asset name *</span>
          <input className="input" value={data.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Main Engine — Port" />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">SFI ID</span>
          <input className="input mono" value={proposedSfi} readOnly style={{background: 'var(--bg-3)', color: 'var(--text-2)'}} />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Location *</span>
          <input className="input" value={data.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Engine Room — Stbd" />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Manufacturer *</span>
          <input className="input" value={data.mfr} onChange={e => set('mfr', e.target.value)} />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Model number</span>
          <input className="input" value={data.model} onChange={e => set('model', e.target.value)} />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Serial number</span>
          <input className="input mono" value={data.serial} onChange={e => set('serial', e.target.value)} />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Install date</span>
          <input className="input mono" type="date" value={data.install_date} onChange={e => set('install_date', e.target.value)} />
        </label>
      </div>

      <div style={{marginTop: 22, padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5}}>
        <Icon name="sparkle" size={14} style={{color: 'var(--accent)'}} />
        <span>AI found 2 manuals matching <strong style={{color: 'var(--text-1)'}}>{data.mfr} {data.model}</strong> in your knowledge base.</span>
        <span className="pill pill-accent" style={{marginLeft: 'auto'}}>2 SUGGESTED</span>
        <button className="btn btn-sm">Review</button>
      </div>
    </div>
  );
}

function AddStep3({ data, set }) {
  return (
    <div>
      <div className="form-grid-2">
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Initial status</span>
          <select className="input" value={data.status} onChange={e => set('status', e.target.value)}>
            <option value="operational">Operational</option>
            <option value="maintenance">In maintenance</option>
            <option value="fault">Fault</option>
            <option value="decommissioned">Decommissioned</option>
          </select>
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Running hours</span>
          <input className="input mono" value={data.running_hrs} onChange={e => set('running_hrs', e.target.value)} />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Last service</span>
          <input className="input mono" type="date" value={data.last_service} onChange={e => set('last_service', e.target.value)} />
        </label>
        <label className="field" style={{marginBottom: 0}}>
          <span className="field-label">Next scheduled service</span>
          <input className="input mono" type="date" value={data.next_service} onChange={e => set('next_service', e.target.value)} />
        </label>
      </div>

      <div style={{marginTop: 22}}>
        <div className="field-label" style={{marginBottom: 10}}>Telemetry & automation</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <label className="row gap-12" style={{cursor: 'pointer', padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8}}>
            <span className={`checkbox ${data.runtime_metric ? 'checked' : ''}`} onClick={() => set('runtime_metric', !data.runtime_metric)} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 12.5, color: 'var(--text-1)', fontWeight: 500}}>Track running hours from engine bus</div>
              <div className="text-3" style={{fontSize: 11.5, marginTop: 2}}>Auto-bind metric <span className="mono">engines.aux.{data.serial.toLowerCase()}.runtime</span></div>
            </div>
          </label>
          <label className="row gap-12" style={{cursor: 'pointer', padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8}}>
            <span className={`checkbox ${data.auto_pms ? 'checked' : ''}`} onClick={() => set('auto_pms', !data.auto_pms)} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 12.5, color: 'var(--text-1)', fontWeight: 500}}>Generate PMS schedule from manufacturer template</div>
              <div className="text-3" style={{fontSize: 11.5, marginTop: 2}}>{data.mfr} {data.model} ships with a 4-task service plan (250 / 500 / 1000 / 2000 h)</div>
            </div>
          </label>
          <label className="row gap-12" style={{cursor: 'pointer', padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8}}>
            <span className={`checkbox ${data.auto_match_manuals ? 'checked' : ''}`} onClick={() => set('auto_match_manuals', !data.auto_match_manuals)} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 12.5, color: 'var(--text-1)', fontWeight: 500}}>Auto-link manuals from KB on creation</div>
              <div className="text-3" style={{fontSize: 11.5, marginTop: 2}}>Match by manufacturer + model · Confidence threshold ≥ 80%</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

function AddStep4({ data, proposedSfi, parentObj, childObj, setStep }) {
  return (
    <div>
      <div className="summary-card">
        <div className="summary-card-title">Identity <button onClick={() => setStep(1)}><Icon name="edit" size={10} /> Edit</button></div>
        <div className="kv-list">
          <div className="kv-row"><span className="kv-key">SFI ID</span><span className="kv-val mono">{proposedSfi}</span></div>
          <div className="kv-row"><span className="kv-key">Group</span><span className="kv-val">{parentObj?.name} <span className="text-3">/</span> {childObj?.name || '—'}</span></div>
          <div className="kv-row"><span className="kv-key">Asset name</span><span className="kv-val">{data.name}</span></div>
          <div className="kv-row"><span className="kv-key">Manufacturer</span><span className="kv-val">{data.mfr} <span className="text-3">/</span> {data.model}</span></div>
          <div className="kv-row"><span className="kv-key">Serial</span><span className="kv-val mono">{data.serial}</span></div>
          <div className="kv-row" style={{borderBottom: 'none'}}><span className="kv-key">Location</span><span className="kv-val">{data.location}</span></div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-card-title">Operations <button onClick={() => setStep(2)}><Icon name="edit" size={10} /> Edit</button></div>
        <div className="kv-list">
          <div className="kv-row"><span className="kv-key">Status</span><span className="kv-val">
            <span className="pill pill-ok"><span className="dot dot-ok" /> {data.status}</span>
          </span></div>
          <div className="kv-row"><span className="kv-key">Running hrs</span><span className="kv-val mono">{Number(data.running_hrs).toLocaleString()} h</span></div>
          <div className="kv-row"><span className="kv-key">Install date</span><span className="kv-val mono">{data.install_date}</span></div>
          <div className="kv-row" style={{borderBottom: 'none'}}><span className="kv-key">Service window</span><span className="kv-val mono">{data.last_service} → {data.next_service}</span></div>
        </div>
      </div>

      <div className="summary-card" style={{marginBottom: 0}}>
        <div className="summary-card-title">Will be created automatically</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5}}>
          {data.runtime_metric && <div className="row gap-12"><Icon name="metrics" size={12} style={{color: 'var(--accent)'}} /> 1 metric binding · <span className="mono text-3" style={{fontSize: 11}}>engines.aux.{data.serial.toLowerCase()}.runtime</span></div>}
          {data.auto_pms && <div className="row gap-12"><Icon name="pms" size={12} style={{color: 'var(--accent)'}} /> 4 PMS tasks from {data.mfr} template</div>}
          {data.auto_match_manuals && <div className="row gap-12"><Icon name="kb" size={12} style={{color: 'var(--accent)'}} /> 2 manual links (from KB · conf ≥ 80%)</div>}
          <div className="row gap-12"><Icon name="audit" size={12} style={{color: 'var(--accent)'}} /> Audit entry · <span className="mono text-3" style={{fontSize: 11}}>asset.create / {proposedSfi}</span></div>
        </div>
      </div>
    </div>
  );
}
