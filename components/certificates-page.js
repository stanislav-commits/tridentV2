/* global React, Icon, CERTIFICATE_GROUPS */
(function () {
  const h = React.createElement;
  const { useState, useMemo } = React;

  window.CertificatesPage = function CertificatesPage() {
    const groups = window.CERTIFICATE_GROUPS || [];
    const [activeGroup, setActiveGroup] = useState('all');
    const [query, setQuery] = useState('');
    const [docs, setDocs] = useState({
      A01: 'CERT_A01_Registry.pdf',
      C05: 'CERT_C05_Safety_Equipment.pdf',
      F01: 'CERT_F01_IOPP.pdf',
      G01: 'CERT_G01_SMC.pdf',
    });
    const [issued, setIssued] = useState({
      A01: '2024-04-21',
      C05: '2025-02-15',
      F01: '2024-06-30',
      G01: '2025-03-01',
    });
    const [expires, setExpires] = useState({
      A01: '2027-04-21',
      C05: '2026-08-15',
      F01: '2026-06-30',
      G01: '2027-03-01',
    });

    const rows = useMemo(() => groups.flatMap(group => group.items.map(item => ({
      ...item,
      groupCode: group.code,
      groupTitle: group.title,
      section: group.section,
      id: item.code || `${group.code}-${item.title}`,
    }))), [groups]);

    const certRows = rows.filter(row => row.kind !== 'section');
    const filteredRows = rows.filter(row => {
      const inGroup = activeGroup === 'all' || row.groupCode === activeGroup;
      const haystack = `${row.code || ''} ${row.title} ${row.groupTitle} ${row.section || ''}`.toLowerCase();
      return inGroup && haystack.includes(query.trim().toLowerCase());
    });

    const setValue = (setter, key, value) => setter(prev => ({ ...prev, [key]: value }));
    const statusFor = (issueDate, expiryDate) => {
      if (!expiryDate) return { label: 'NO DATE', className: 'pill pill-soft', days: null, percent: 0, tone: 'soft' };
      const days = Math.ceil((new Date(`${expiryDate}T00:00:00`) - new Date()) / 86400000);
      const issuedAt = issueDate ? new Date(`${issueDate}T00:00:00`) : null;
      const expiresAt = new Date(`${expiryDate}T00:00:00`);
      const totalDays = issuedAt && expiresAt > issuedAt ? Math.max(1, Math.ceil((expiresAt - issuedAt) / 86400000)) : 1095;
      const percent = Math.min(100, Math.max(0, days / totalDays * 100));
      if (days < 0) return { label: 'EXPIRED', className: 'pill pill-danger', days, percent: 0, tone: 'danger' };
      if (days <= 120) return { label: 'EXPIRING', className: 'pill pill-warn', days, percent, tone: 'warn' };
      return { label: 'VALID', className: 'pill pill-ok', days, percent, tone: 'ok' };
    };

    const stats = {
      total: certRows.length,
      withDocs: certRows.filter(row => docs[row.id]).length,
      withDates: certRows.filter(row => issued[row.id] && expires[row.id]).length,
      expiring: certRows.filter(row => {
        const status = statusFor(issued[row.id], expires[row.id]);
        return status.days !== null && status.days >= 0 && status.days <= 90;
      }).length,
    };

    const summary = [
      ['Total certificates', stats.total],
      ['Documents linked', stats.withDocs],
      ['Dated records', stats.withDates],
      ['Expiring soon', stats.expiring],
    ];

    return h('div', { className: 'page' },
      h('div', { className: 'page-header' },
        h('div', null,
          h('h1', { className: 'page-title' }, 'Certificates'),
          h('p', { className: 'page-subtitle' }, 'Full vessel certificate register with issue dates, expiry dates and linked document uploads.')
        ),
        h('div', { className: 'page-actions' },
          h('button', { className: 'btn' }, h(Icon, { name: 'download', size: 13 }), 'Export'),
          h('button', { className: 'btn btn-primary' }, h(Icon, { name: 'plus', size: 13 }), 'Add certificate')
        )
      ),
      h('div', { className: 'cert-summary-grid' },
        summary.map(([label, value]) => h('div', { key: label, className: 'mini-stat' },
          h('span', null, label),
          h('strong', null, value)
        ))
      ),
      h('div', { className: 'cert-layout' },
        h('div', { className: 'card cert-groups' },
          h('div', { className: 'cert-groups-head' }, 'Certificate groups'),
          h('button', {
            className: `cert-group-btn ${activeGroup === 'all' ? 'active' : ''}`,
            onClick: () => setActiveGroup('all'),
          }, h('span', null, 'All certificates'), h('small', null, stats.total)),
          groups.map(group => h('button', {
            key: group.code,
            className: `cert-group-btn ${activeGroup === group.code ? 'active' : ''}`,
            onClick: () => setActiveGroup(group.code),
          },
            h('span', { className: 'mono' }, group.code),
            h('span', null, group.title),
            h('small', null, group.items.filter(item => item.kind !== 'section').length)
          ))
        ),
        h('div', { className: 'card cert-register' },
          h('div', { className: 'cert-toolbar' },
            h('input', {
              className: 'input input-search',
              value: query,
              onChange: event => setQuery(event.target.value),
              placeholder: 'Search certificates...',
            }),
            h('span', { style: { flex: 1 } }),
            h('span', { className: 'text-3', style: { fontSize: 12 } }, `${filteredRows.filter(row => row.kind !== 'section').length} records`)
          ),
          h('div', { style: { overflowX: 'auto' } },
            h('table', { className: 'dt cert-table' },
              h('thead', null,
                h('tr', null,
                  h('th', { style: { width: 88 } }, 'Code'),
                  h('th', null, 'Certificate'),
                  h('th', { style: { width: 145 } }, 'Issue date'),
                  h('th', { style: { width: 145 } }, 'Expiry date'),
                  h('th', { style: { width: 170 } }, 'Validity'),
                  h('th', { style: { width: 110 } }, 'Status'),
                  h('th', { style: { width: 190 } }, 'Document')
                )
              ),
              h('tbody', null,
                filteredRows.map(row => {
                  if (row.kind === 'section') {
                    return h('tr', { key: row.id, className: 'cert-section-row' }, h('td', { colSpan: 7 }, row.title));
                  }
                  const status = statusFor(issued[row.id], expires[row.id]);
                  return h('tr', { key: row.id },
                    h('td', { className: 'cell-mono' }, row.code),
                    h('td', null,
                      row.section && h('div', { className: 'cert-section-label' }, row.section),
                      h('div', { className: 'cell-strong' }, row.title),
                      h('div', { className: 'text-3', style: { fontSize: 11 } }, `${row.groupCode} · ${row.groupTitle}`)
                    ),
                    h('td', null,
                      h('input', {
                        className: 'input cert-date-input mono',
                        type: 'date',
                        value: issued[row.id] || '',
                        onChange: event => setValue(setIssued, row.id, event.target.value),
                      })
                    ),
                    h('td', null,
                      h('input', {
                        className: 'input cert-date-input mono',
                        type: 'date',
                        value: expires[row.id] || '',
                        onChange: event => setValue(setExpires, row.id, event.target.value),
                      })
                    ),
                    h('td', null,
                      status.days === null
                        ? h('span', { className: 'text-3 mono', style: { fontSize: 11 } }, 'No expiry')
                        : h('div', { className: 'cert-validity' },
                          h('div', { className: 'cert-validity-bar' },
                            h('div', {
                              className: `cert-validity-fill cert-validity-${status.tone}`,
                              style: { width: `${status.percent}%` },
                            })
                          ),
                          h('span', { className: 'text-3 mono' }, `${status.days}d left`)
                        )
                    ),
                    h('td', null, h('span', { className: status.className }, status.label)),
                    h('td', null,
                      h('label', { className: 'btn btn-sm cert-upload-btn' },
                        h(Icon, { name: 'upload', size: 11 }),
                        docs[row.id] ? 'Replace' : 'Upload',
                        h('input', {
                          type: 'file',
                          accept: '.pdf,.doc,.docx,.jpg,.png',
                          onChange: event => setValue(setDocs, row.id, event.target.files?.[0]?.name || docs[row.id] || ''),
                        })
                      ),
                      docs[row.id]
                        ? h('div', { className: 'cert-doc-name mono' }, docs[row.id])
                        : h('div', { className: 'text-3', style: { fontSize: 11 } }, 'No document')
                    )
                  );
                }),
                filteredRows.length === 0 && h('tr', null,
                  h('td', { colSpan: 7, className: 'text-3', style: { padding: 18 } }, 'No certificates match this search.')
                )
              )
            )
          )
        )
      )
    );
  };
})();
