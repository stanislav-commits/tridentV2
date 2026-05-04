/* global React, Icon */
(function () {
  const h = React.createElement;
  const { useState } = React;

  window.AdminUsersPage = function AdminUsersPage() {
    const initialAdmins = [
      { id: 'stanislav@trident-virtual.com', name: 'Stanislav', lastSeen: 'now', twoFactor: 'ON', status: 'Active', initial: 'S' },
      { id: 'temp-admin-2026@trident-virtual.com', name: 'Temporary Admin', lastSeen: '1m ago', twoFactor: 'ON', status: 'Expires in 24h', initial: 'T' },
    ];
    const [admins, setAdmins] = useState(initialAdmins);
    const [showAdd, setShowAdd] = useState(false);
    const [notice, setNotice] = useState('');
    const [draft, setDraft] = useState({ name: '', id: '' });

    const addAdmin = () => {
      const name = draft.name.trim() || 'New Admin';
      const id = draft.id.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setAdmins(prev => prev.concat({
        id,
        name,
        lastSeen: 'never',
        twoFactor: 'Required',
        status: 'Invite pending',
        initial: name.charAt(0).toUpperCase(),
      }));
      setDraft({ name: '', id: '' });
      setNotice(`Admin panel invite prepared for ${name}`);
      setShowAdd(false);
    };
    const removeAdmin = (admin) => {
      setAdmins(prev => prev.filter(row => row.id !== admin.id));
      setNotice(`${admin.name} removed from admin panel access`);
    };
    const resendInvite = (admin) => {
      setAdmins(prev => prev.map(row => row.id === admin.id ? { ...row, status: 'Invite pending' } : row));
      setNotice(`Admin invite prepared for ${admin.name}`);
    };

    const activeCount = admins.filter(admin => admin.status === 'Active').length;
    const pendingCount = admins.filter(admin => admin.status !== 'Active').length;
    const twoFactorCount = admins.filter(admin => admin.twoFactor === 'ON').length;

    return h('div', { className: 'page' },
      h('div', { className: 'page-header' },
        h('div', null,
          h('h1', { className: 'page-title' }, 'Admin users'),
          h('p', { className: 'page-subtitle' }, 'Admin panel accounts. Every admin has equal full access to platform settings and vessel data.')
        ),
        h('div', { className: 'page-actions' },
          h('button', { className: 'btn btn-primary', onClick: () => setShowAdd(true) }, h(Icon, { name: 'plus', size: 13 }), 'Add admin')
        )
      ),
      h('div', { className: 'user-summary-grid' },
        h('div', { className: 'mini-stat' }, h('span', null, 'Admin users'), h('strong', null, admins.length)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Active'), h('strong', null, activeCount)),
        h('div', { className: 'mini-stat' }, h('span', null, '2FA enabled'), h('strong', null, twoFactorCount)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Pending / temp'), h('strong', null, pendingCount))
      ),
      h('div', { className: 'card' },
        h('div', { className: 'users-toolbar' },
          notice && h('span', { className: 'pill pill-info' }, notice),
          h('span', { style: { flex: 1 } }),
          h('span', { className: 'text-3', style: { fontSize: 12 } }, `${admins.length} admins`)
        ),
        h('table', { className: 'dt' },
          h('thead', null, h('tr', null,
            h('th', { style: { width: 32 } }, '#'),
            h('th', null, 'Admin ID'),
            h('th', { style: { width: 200 } }, 'Name'),
            h('th', { style: { width: 100 } }, '2FA'),
            h('th', { style: { width: 120 } }, 'Last seen'),
            h('th', { style: { width: 150 } }, 'Status'),
            h('th', { style: { width: 210, textAlign: 'right' } }, 'Actions')
          )),
          h('tbody', null,
            admins.map(admin => h('tr', { key: admin.id },
              h('td', null, h('div', { className: 'avatar', style: { width: 24, height: 24, fontSize: 10 } }, admin.initial)),
              h('td', { className: 'cell-mono', style: { fontSize: 11.5 } }, admin.id),
              h('td', { className: 'cell-strong' }, admin.name),
              h('td', null, admin.twoFactor === 'ON' ? h('span', { className: 'pill pill-ok' }, 'ON') : h('span', { className: 'pill pill-warn' }, admin.twoFactor)),
              h('td', { className: 'text-3 mono', style: { fontSize: 11 } }, admin.lastSeen),
              h('td', null, h('span', { className: admin.status === 'Active' ? 'pill pill-ok' : 'pill pill-warn' }, admin.status)),
              h('td', { className: 'cell-actions' },
                h('button', { className: 'btn btn-sm', onClick: () => resendInvite(admin) }, 'Invite'),
                h('button', { className: 'btn btn-sm btn-danger', onClick: () => removeAdmin(admin) }, 'Delete')
              )
            ))
          )
        )
      ),
      showAdd && h('div', { className: 'modal-overlay' },
        h('div', { className: 'modal' },
          h('div', { className: 'modal-head' },
            h('div', { className: 'modal-icon' }, h(Icon, { name: 'users', size: 16 })),
            h('div', null, h('div', { className: 'modal-title' }, 'Add admin'), h('div', { className: 'modal-sub' }, 'Admin users are separate from crew users and can access the admin panel.')),
            h('button', { className: 'modal-close', onClick: () => setShowAdd(false) }, 'x')
          ),
          h('div', { className: 'modal-body user-form-grid' },
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'Name'), h('input', { className: 'input', value: draft.name, onChange: event => setDraft({ ...draft, name: event.target.value }), placeholder: 'Full name' })),
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'Admin ID / email'), h('input', { className: 'input', value: draft.id, onChange: event => setDraft({ ...draft, id: event.target.value }), placeholder: 'admin@example.com' })),
            h('div', { className: 'role-access-preview' },
              h('span', null, 'Access model'),
              h('strong', null, 'Full admin panel'),
              h('p', { className: 'text-3', style: { margin: 0, fontSize: 12, lineHeight: 1.45 } }, 'All admins can manage platform settings, vessels, users, imports, billing data and RAG configuration.')
            )
          ),
          h('div', { className: 'modal-foot' },
            h('button', { className: 'btn', onClick: () => setShowAdd(false) }, 'Cancel'),
            h('button', { className: 'btn btn-primary', onClick: addAdmin }, h(Icon, { name: 'plus', size: 13 }), 'Add admin')
          )
        )
      )
    );
  };
})();
