/* global React, Icon */
(function () {
  const h = React.createElement;
  const { useState } = React;

  const Field = ({ label, children }) => h('label', { className: 'field' },
    h('span', { className: 'field-label' }, label),
    children
  );

  const ImportModal = ({ kind, onClose }) => {
    const config = {
      pms: {
        icon: 'pms',
        title: 'Import PMS data',
        sub: 'Upload an existing vessel PMS export and map jobs back to Asset Register SFI assets.',
        accept: '.xlsx,.xls,.csv,.pdf,.doc,.docx',
        formats: '.xlsx .xls .csv .pdf .docx',
        fileName: 'SeaWolfX_PMS_Export_Apr2026.xlsx',
        primary: 'Import and map PMS',
        stats: [
          ['Tasks detected', '128'],
          ['Completed jobs', '41'],
          ['Recurring rules', '18'],
          ['Need SFI mapping', '9'],
        ],
        flow: [
          'Read source file',
          'Extract completed and planned work',
          'Map rows to Asset Register / SFI assets',
          'Create or update PMS cards',
        ],
        note: 'This stays in PMS because the crew imports maintenance history here; every imported task is still linked to Asset Register assets.',
      },
      finance: {
        icon: 'finance',
        title: 'Import monthly finance export',
        sub: 'Upload last month finance Excel or CSV and link costs to categories and SFI assets.',
        accept: '.xlsx,.xls,.csv,.pdf',
        formats: '.xlsx .xls .csv .pdf',
        fileName: 'SeaWolfX_Finance_April_2026.xlsx',
        primary: 'Import finance',
        stats: [
          ['Invoice rows', '84'],
          ['Vendors', '6'],
          ['Detected spend', 'EUR 42,118'],
          ['SFI mapped', '11'],
        ],
        flow: [
          'Read last month export',
          'Detect vendors, amounts and paid status',
          'Map maintenance spend to SFI assets',
          'Update Accounting dashboard',
        ],
        note: 'Finance imports are kept here so monthly accounting files do not mix with technical PMS uploads.',
      },
    }[kind];
    const [file, setFile] = useState(null);
    const [source, setSource] = useState(kind === 'pms' ? 'IDEA / Vessel PMS export' : 'Monthly accounting export');

    return h('div', { className: 'modal-overlay', onClick: onClose },
      h('div', { className: 'modal modal-wide', onClick: event => event.stopPropagation() },
        h('div', { className: 'modal-head' },
          h('div', { className: 'modal-icon' }, h(Icon, { name: config.icon, size: 16 })),
          h('div', null,
            h('div', { className: 'modal-title' }, config.title),
            h('div', { className: 'modal-sub' }, config.sub)
          ),
          h('button', { className: 'modal-close', onClick: onClose }, 'x')
        ),
        h('div', { className: 'modal-body' },
          h('div', {
            className: `dropzone import-dropzone ${file ? 'has-file' : ''}`,
            onClick: () => setFile({ name: config.fileName, size: kind === 'pms' ? '1.8 MB' : '612 KB' }),
          },
            h('div', { className: 'dropzone-icon' }, h(Icon, { name: 'upload', size: 22 })),
            h('div', { className: 'dropzone-title' }, file ? file.name : 'Drop import file here'),
            h('div', { className: 'dropzone-sub' }, file ? `${file.size} - ready for parsing` : `or click to browse - ${config.formats}`),
            h('input', { type: 'file', accept: config.accept, className: 'hidden' })
          ),
          h('div', { className: 'import-settings-grid' },
            h(Field, { label: 'Source system' },
              h('select', { className: 'input', value: source, onChange: event => setSource(event.target.value) },
                [
                  kind === 'pms' ? 'IDEA / Vessel PMS export' : 'Monthly accounting export',
                  'Excel workbook',
                  'PDF report',
                  'CSV export',
                ].map(option => h('option', { key: option }, option))
              )
            ),
            h(Field, { label: kind === 'pms' ? 'Target mapping' : 'Month' },
              kind === 'pms'
                ? h('select', { className: 'input', defaultValue: 'Asset Register / SFI' },
                  ['Asset Register / SFI', 'PMS task only', 'Manual review queue'].map(option => h('option', { key: option }, option))
                )
                : h('input', { className: 'input', type: 'month', defaultValue: '2026-04' })
            )
          ),
          h('div', { className: 'import-preview-grid' },
            config.stats.map(([label, value]) => h('div', { key: label, className: 'mini-stat' },
              h('span', null, label),
              h('strong', null, value)
            ))
          ),
          h('div', { className: 'import-flow' },
            config.flow.map((step, index) => h('div', { key: step, className: 'import-flow-step' },
              h('span', { className: 'step-num' }, index + 1),
              h('span', null, step)
            ))
          ),
          h('div', { className: 'import-note' }, config.note)
        ),
        h('div', { className: 'modal-foot' },
          h('button', { className: 'btn', onClick: onClose }, 'Cancel'),
          h('button', { className: 'btn btn-primary', onClick: onClose, disabled: !file },
            h(Icon, { name: 'upload', size: 13 }),
            config.primary
          )
        )
      )
    );
  };

  window.PMSPage = function PMSPage() {
    const [showImport, setShowImport] = useState(false);
    const cols = [
      { id: 'overdue', title: 'Overdue', count: 3, color: 'var(--danger)', cards: [
        { sfi: '02.1.001', t: '500h Service - ME Port', due: '-4d', who: 'Eng. M.', tags: ['Engines'] },
        { sfi: '07.1.001', t: 'Watermaker membrane flush', due: '-2d', who: '-', tags: ['Watermaker'] },
        { sfi: '08.3.014', t: 'Extinguisher annual - Galley', due: '-1d', who: 'Eng. M.', tags: ['Safety'] },
      ] },
      { id: 'thisweek', title: 'Due this week', count: 7, color: 'var(--warn)', cards: [
        { sfi: '02.1.003', t: 'Oil filter change - Gen 1', due: 'May 1', who: 'Eng. K.', tags: ['Generator'] },
        { sfi: '02.1.004', t: 'Oil filter change - Gen 2', due: 'May 1', who: 'Eng. K.', tags: ['Generator'] },
        { sfi: '02.4', t: 'Fuel tank inspection', due: 'May 2', who: '-', tags: ['Tanks'] },
        { sfi: '06.1.002', t: 'Chiller 2 refrigerant top-up', due: 'May 3', who: 'Eng. M.', tags: ['HVAC'] },
      ] },
      { id: 'inprogress', title: 'In progress', count: 4, color: 'var(--info)', cards: [
        { sfi: '02.1.005', t: 'Emergency Genset preheat circuit', due: 'started', who: 'Eng. M.', tags: ['Electrical'] },
        { sfi: '11.3.002', t: 'Hydraulic crane - annual', due: 'started', who: 'Bosun', tags: ['Deck'] },
      ] },
      { id: 'done', title: 'Done - last 7d', count: 14, color: 'var(--ok)', cards: [
        { sfi: '02.1.001', t: 'Daily inspection', due: 'Apr 28', who: 'Eng. M.', tags: ['Engines'] },
        { sfi: '02.1.002', t: 'Daily inspection', due: 'Apr 28', who: 'Eng. M.', tags: ['Engines'] },
        { sfi: '08.1', t: 'Fire panel test', due: 'Apr 27', who: 'Capt.', tags: ['Safety'] },
      ] },
    ];
    return h('div', { className: 'page' },
      h('div', { className: 'page-header' },
        h('div', null,
          h('h1', { className: 'page-title' }, 'Planned Maintenance System'),
          h('p', { className: 'page-subtitle' }, 'All maintenance tasks across SFI assets. Triggered by hours, calendar, or alerts.')
        ),
        h('div', { className: 'page-actions' },
          h('button', { className: 'btn', onClick: () => setShowImport(true) }, h(Icon, { name: 'upload', size: 13 }), 'Import'),
          h('span', { className: 'seg' },
            h('button', { className: 'seg-btn active' }, 'Board'),
            h('button', { className: 'seg-btn' }, 'List'),
            h('button', { className: 'seg-btn' }, 'Calendar')
          ),
          h('button', { className: 'btn btn-primary' }, h(Icon, { name: 'plus', size: 13 }), 'New task')
        )
      ),
      h('div', { className: 'pms-board' },
        cols.map(col => h('div', { key: col.id, className: 'pms-col' },
          h('div', { className: 'pms-col-head' },
            h('span', { className: 'dot', style: { background: col.color } }),
            h('span', { className: 'pms-col-title' }, col.title),
            h('span', { className: 'pms-col-count' }, col.count)
          ),
          h('div', { className: 'pms-col-body' },
            col.cards.map((card, index) => h('div', { key: `${col.id}-${index}`, className: 'pms-card' },
              h('span', { className: 'pms-asset' }, card.sfi),
              h('span', { className: 'pms-title' }, card.t),
              h('span', { className: 'pms-meta' },
                h('span', { className: 'mono' }, card.due),
                h('span', { style: { flex: 1 } }),
                card.tags.map(tag => h('span', { key: tag, className: 'tag-soft' }, tag)),
                h('span', null, `- ${card.who}`)
              )
            ))
          )
        ))
      ),
      showImport && h(ImportModal, { kind: 'pms', onClose: () => setShowImport(false) })
    );
  };

  window.FinancePage = function FinancePage() {
    const [showImport, setShowImport] = useState(false);
    const rows = [
      ['2026-04-26', 'MTU Service Mediterranean', 'Spares', '02.1.001', 'EUR 4,212', 'paid'],
      ['2026-04-22', 'Allios Bunker', 'Fuel', '04.1', 'EUR 18,940', 'paid'],
      ['2026-04-19', 'MASE Generators', 'Service', '02.1.003', 'EUR 2,150', 'pending'],
      ['2026-04-15', 'Bureau Veritas', 'Survey', 'A01', 'EUR 6,800', 'paid'],
    ];
    return h('div', { className: 'page' },
      h('div', { className: 'page-header' },
        h('div', null,
          h('h1', { className: 'page-title' }, 'Accounting'),
          h('p', { className: 'page-subtitle' }, 'Operating budget, fuel costs, maintenance spend, crew payroll.')
        ),
        h('div', { className: 'page-actions' },
          h('button', { className: 'btn', onClick: () => setShowImport(true) }, h(Icon, { name: 'upload', size: 13 }), 'Import'),
          h('button', { className: 'btn' }, h(Icon, { name: 'download', size: 13 }), 'Export')
        )
      ),
      h('div', { className: 'stat-grid', style: { gridTemplateColumns: 'repeat(4, 1fr)' } },
        h('div', { className: 'stat-card' }, h('div', { className: 'stat-label' }, 'YTD Operating'), h('div', { className: 'stat-value' }, 'EUR 482k'), h('div', { className: 'stat-foot' }, 'vs EUR 510k budget')),
        h('div', { className: 'stat-card' }, h('div', { className: 'stat-label' }, 'Fuel'), h('div', { className: 'stat-value' }, 'EUR 124k'), h('div', { className: 'stat-foot' }, '28,402 L - EUR 4.36/L avg')),
        h('div', { className: 'stat-card' }, h('div', { className: 'stat-label' }, 'Maintenance'), h('div', { className: 'stat-value' }, 'EUR 88k'), h('div', { className: 'stat-foot' }, '142 invoices')),
        h('div', { className: 'stat-card' }, h('div', { className: 'stat-label' }, 'Payroll'), h('div', { className: 'stat-value' }, 'EUR 186k'), h('div', { className: 'stat-foot' }, '14 crew'))
      ),
      h('div', { className: 'card' },
        h('div', { className: 'card-header' }, h('div', { className: 'card-title' }, 'Recent invoices')),
        h('table', { className: 'dt' },
          h('thead', null, h('tr', null,
            h('th', null, 'Date'),
            h('th', null, 'Vendor'),
            h('th', null, 'Category'),
            h('th', null, 'SFI / Certificate'),
            h('th', { style: { textAlign: 'right' } }, 'Amount'),
            h('th', { style: { width: 100 } }, 'Status')
          )),
          h('tbody', null,
            rows.map((row, index) => h('tr', { key: index },
              h('td', { className: 'cell-mono', style: { fontSize: 11 } }, row[0]),
              h('td', { className: 'cell-strong' }, row[1]),
              h('td', null, row[2]),
              h('td', null, h('span', { className: 'pill mono' }, row[3])),
              h('td', { className: 'cell-mono', style: { textAlign: 'right' } }, row[4]),
              h('td', null, row[5] === 'paid' ? h('span', { className: 'pill pill-ok' }, 'PAID') : h('span', { className: 'pill pill-warn' }, 'PENDING'))
            ))
          )
        )
      ),
      showImport && h(ImportModal, { kind: 'finance', onClose: () => setShowImport(false) })
    );
  };

  window.KnowledgeBasePage = function KnowledgeBasePage() {
    const [cat, setCat] = useState('manuals');
    const [selected, setSelected] = useState(new Set());
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
      { name: 'MN_MASE_IS44_rev2.pdf', sfi: '02.1.003', tags: ['Generator', 'MASE'], status: 'parsing', progress: 38, size: '9.4 MB', date: '28 Apr 2026' },
      { name: 'SOP_BunkeringV4.docx', sfi: '04.1', tags: ['SOP', 'Bunkering'], status: 'queued', size: '0.2 MB', date: '28 Apr 2026' },
      { name: 'ISM_Manual_2026_Q2.pdf', sfi: null, tags: ['ISM'], status: 'queued', size: '6.7 MB', date: '28 Apr 2026' },
      { name: 'MN_HANDPUMP (2).pdf', sfi: '04.4', tags: ['Bilge'], status: 'done', chunks: 12, size: '0.6 MB', date: '09 Apr 2026' },
      { name: 'MN_CB (2).pdf', sfi: null, tags: [], status: 'unmapped', size: '1.8 MB', date: '09 Apr 2026' },
    ];
    const toggleSel = name => {
      const next = new Set(selected);
      next.has(name) ? next.delete(name) : next.add(name);
      setSelected(next);
    };
    const statusNode = doc => {
      if (doc.status === 'done') return h('span', { className: 'pill pill-ok' }, `${doc.chunks} CHUNKS`);
      if (doc.status === 'parsing') return h('span', { className: 'pill pill-info' }, `PARSING ${doc.progress}%`);
      if (doc.status === 'unmapped') return h('span', { className: 'pill pill-warn' }, 'UNMAPPED');
      return h('span', { className: 'pill pill-soft' }, 'QUEUED');
    };
    return h('div', { className: 'page' },
      h('div', { className: 'page-header' },
        h('div', null,
          h('h1', { className: 'page-title' }, 'Knowledge Base'),
          h('p', { className: 'page-subtitle' }, 'Documents indexed for RAG. Link any document to SFI assets so the assistant pulls the right manual when asked.')
        ),
        h('div', { className: 'page-actions' },
          h('button', { className: 'btn' }, h(Icon, { name: 'tag', size: 13 }), 'Auto-categorize'),
          h('button', { className: 'btn btn-primary' }, h(Icon, { name: 'upload', size: 13 }), 'Upload documents')
        )
      ),
      h('div', { className: 'stat-grid', style: { gridTemplateColumns: 'repeat(3, 1fr)' } },
        h('div', { className: 'stat-card' }, h('div', { className: 'stat-label' }, 'Documents'), h('div', { className: 'stat-value' }, '172'), h('div', { className: 'stat-foot' }, '12,431 RAG chunks')),
        h('div', { className: 'stat-card' }, h('div', { className: 'stat-label' }, 'Linked to SFI'), h('div', { className: 'stat-value' }, '148', h('span', { style: { fontSize: 14, color: 'var(--text-3)' } }, ' / 172')), h('div', { className: 'stat-foot' }, '86% coverage')),
        h('div', { className: 'stat-card stat-warn' }, h('div', { className: 'stat-label' }, 'RAG queue'), h('div', { className: 'stat-value' }, '4'), h('div', { className: 'stat-foot' }, '2 parsing - 2 queued'))
      ),
      h('div', { className: 'kb-grid' },
        h('div', { className: 'kb-side' },
          cats.map(item => h('div', {
            key: item.id,
            className: `kb-cat ${cat === item.id ? 'active' : ''}`,
            onClick: () => setCat(item.id),
          }, h(Icon, { name: item.icon, size: 14 }), h('span', null, item.name), h('span', { className: 'kb-cat-count' }, item.count)))
        ),
        h('div', null,
          h('div', { className: 'upload-zone' },
            h(Icon, { name: 'upload', size: 20, style: { color: 'var(--text-3)' } }),
            h('div', { style: { marginTop: 6, fontSize: 13 } }, h('strong', null, 'Drag files here'), ' or ', h('a', { style: { color: 'var(--accent)', cursor: 'pointer' } }, 'browse')),
            h('div', { className: 'upload-formats' }, 'PDF - DOC - DOCX - TXT - MD - CSV - JPG - PNG - WEBP')
          ),
          selected.size > 0 && h('div', { className: 'card kb-bulk-actions' },
            h('span', null, h('strong', null, selected.size), ' selected'),
            h('span', { style: { flex: 1 } }),
            h('button', { className: 'btn btn-sm' }, h(Icon, { name: 'link', size: 12 }), 'Link to SFI'),
            h('button', { className: 'btn btn-sm btn-danger' }, h(Icon, { name: 'trash', size: 12 }), 'Delete')
          ),
          h('div', { className: 'card' },
            h('div', { className: 'kb-toolbar' },
              h('input', { className: 'input input-search', style: { maxWidth: 260 }, placeholder: 'Search documents...' }),
              h('span', { className: 'seg' },
                ['All', 'Linked', 'Unmapped', 'Issues'].map((label, index) => h('button', { key: label, className: `seg-btn ${index === 0 ? 'active' : ''}` }, label))
              ),
              h('span', { style: { flex: 1 } }),
              h('span', { className: 'text-3', style: { fontSize: 12 } }, 'Showing 1-7 of 172')
            ),
            h('table', { className: 'dt dt-compact' },
              h('thead', null, h('tr', null,
                h('th', { style: { width: 28 } }, ''),
                h('th', null, 'Filename'),
                h('th', { style: { width: 120 } }, 'SFI link'),
                h('th', { style: { width: 140 } }, 'RAG status'),
                h('th', { style: { width: 120 } }, 'Uploaded')
              )),
              h('tbody', null,
                docs.map(doc => h('tr', { key: doc.name },
                  h('td', null, h('span', { className: `checkbox ${selected.has(doc.name) ? 'checked' : ''}`, onClick: () => toggleSel(doc.name) })),
                  h('td', null,
                    h('div', { className: 'row gap-12' },
                      h(Icon, { name: 'doc', size: 13, style: { color: 'var(--text-3)' } }),
                      h('div', null,
                        h('div', { className: 'cell-strong' }, doc.name),
                        h('div', { className: 'text-3', style: { fontSize: 11 } }, doc.size)
                      )
                    )
                  ),
                  h('td', null, doc.sfi ? h('span', { className: 'pill mono' }, doc.sfi) : h('button', { className: 'btn btn-sm btn-ghost' }, h(Icon, { name: 'link', size: 11 }), 'Link')),
                  h('td', null, statusNode(doc)),
                  h('td', { className: 'cell-mono', style: { fontSize: 11 } }, doc.date)
                ))
              )
            )
          )
        )
      )
    );
  };
})();
