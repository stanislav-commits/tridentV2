/* global React, Icon */
const { useState: uIM } = React;

// ============== IMPORT XLSX FLOW ==============
window.ImportXlsxModal = function ImportXlsxModal({ onClose }) {
  const [file, setFile] = uIM(null);
  const [sheet, setSheet] = uIM('Asset Register');

  const steps = ['Upload file'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-xl" style={{height: '86vh'}} onClick={e => e.stopPropagation()}>
        <div className="wiz-head">
          <div className="modal-icon"><Icon name="upload" size={16} /></div>
          <div>
            <div className="wiz-title">Import Asset Register</div>
            <div className="wiz-sub">Bulk-add or update assets from an .xlsx workbook</div>
          </div>
          <button className="wiz-close" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>

        <div className="stepper">
          {steps.map((s, i) => (
            <div key={s} className="step active">
              <span className="step-num">{i + 1}</span>
              <span className="step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="wiz-body">
          <ImportStep1 file={file} setFile={setFile} sheet={sheet} setSheet={setSheet} />
        </div>

        <div className="wiz-foot">
          <div className="wiz-foot-left">
            {file && <span><Icon name="check" size={11} /> File parsed · 190 rows detected · ready to import</span>}
          </div>
          <div className="wiz-foot-right">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={onClose} disabled={!file}>Import assets <Icon name="check" size={12} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ImportStep1({ file, setFile, sheet, setSheet }) {
  return (
    <div>
      {!file ? (
        <div className="dropzone" onClick={() => setFile({ name: 'Trident_SeaWolfX_Asset_Register_v4_7.xlsx', size: '348 KB' })}>
          <div className="dropzone-icon"><Icon name="upload" size={22} /></div>
          <div className="dropzone-title">Drop your .xlsx file here</div>
          <div className="dropzone-sub">or click to browse · Max 50MB · We'll detect sheets and headers automatically</div>
          <div style={{marginTop: 16, display: 'flex', gap: 6, justifyContent: 'center'}}>
            <span className="kbd">.xlsx</span>
            <span className="kbd">.xlsm</span>
            <span className="kbd">.csv</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="file-chip" style={{width: '100%', justifyContent: 'flex-start'}}>
            <div className="file-icon"><Icon name="check" size={14} /></div>
            <div style={{flex: 1}}>
              <div style={{color: 'var(--text-1)', fontWeight: 500}}>{file.name}</div>
              <div className="text-3" style={{fontSize: 11, fontFamily: "'JetBrains Mono', monospace"}}>{file.size} · 4 sheets · 190 data rows</div>
            </div>
            <button className="btn btn-sm btn-ghost" onClick={() => setFile(null)}><Icon name="x" size={12} /></button>
          </div>

          <label className="field" style={{marginTop: 22}}>
            <span className="field-label">Sheet to import</span>
            <select className="input" value={sheet} onChange={e => setSheet(e.target.value)}>
              <option>Asset Register</option>
              <option>Certificates</option>
              <option>Spares Inventory</option>
              <option>PMS Schedule</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">Header row</span>
            <select className="input" defaultValue="3">
              <option value="1">Row 1</option>
              <option value="2">Row 2</option>
              <option value="3">Row 3 (auto-detected)</option>
              <option value="4">Row 4</option>
            </select>
          </label>

          <div style={{display: 'flex', gap: 14, marginTop: 8}}>
            <label className="row gap-12" style={{cursor: 'pointer'}}>
              <span className="checkbox checked" />
              <span style={{fontSize: 12.5}}>Update existing assets if SFI code matches</span>
            </label>
          </div>
          <div style={{display: 'flex', gap: 14, marginTop: 10}}>
            <label className="row gap-12" style={{cursor: 'pointer'}}>
              <span className="checkbox" />
              <span style={{fontSize: 12.5}}>Mark missing assets as decommissioned</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
