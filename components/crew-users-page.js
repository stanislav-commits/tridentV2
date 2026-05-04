/* global React, Icon */
(function () {
  const h = React.createElement;
  const { useState } = React;

  const ACCESS_BY_ROLE = {
    Captain: ['Metrics', 'Manuals', 'PMS', 'Alarms'],
    'Chief Engineer': ['Metrics', 'Manuals', 'PMS', 'Alarms'],
    Engineer: ['Metrics', 'Manuals', 'PMS'],
    Deck: ['Manuals', 'PMS', 'Alarms'],
    Interior: ['Manuals', 'PMS'],
    'Owner Rep': ['Metrics', 'Manuals'],
  };

  window.UsersPage = function UsersPage() {
    const initialUsers = [
      { id: 'captain@seawolfx.com', name: 'M. Aliyev', role: 'Captain', ship: 'Sea Wolf X', lastSeen: 'now', twoFactor: 'ON', status: 'Active', initial: 'M' },
      { id: 'crew-047e06', name: 'Jogn Sina', role: 'Engineer', ship: 'Sea Wolf X', lastSeen: '14m ago', twoFactor: 'OFF', status: 'Invite pending', initial: 'J' },
      { id: 'watch.deck@seawolfx.com', name: 'Deck Watch', role: 'Deck', ship: 'Sea Wolf X', lastSeen: '2h ago', twoFactor: 'ON', status: 'Active', initial: 'D' },
      { id: 'owner.rep@seawolfx.com', name: 'Owner Representative', role: 'Owner Rep', ship: 'Sea Wolf X', lastSeen: 'yesterday', twoFactor: 'ON', status: 'Limited', initial: 'O' },
    ];
    const [users, setUsers] = useState(initialUsers);
    const [query, setQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [showAdd, setShowAdd] = useState(false);
    const [notice, setNotice] = useState('');
    const [draft, setDraft] = useState({ name: '', id: '', role: 'Engineer', ship: 'Sea Wolf X' });

    const roles = ['All', 'Captain', 'Chief Engineer', 'Engineer', 'Deck', 'Interior', 'Owner Rep'];
    const filteredUsers = users.filter(user => {
      const inRole = roleFilter === 'All' || user.role === roleFilter;
      const haystack = `${user.name} ${user.id} ${user.role} ${user.ship}`.toLowerCase();
      return inRole && haystack.includes(query.trim().toLowerCase());
    });
    const roleCount = (...names) => users.filter(user => names.includes(user.role)).length;
    const counts = {
      total: users.length,
      bridge: roleCount('Captain', 'Owner Rep'),
      engineering: roleCount('Chief Engineer', 'Engineer'),
      pending: users.filter(user => user.status !== 'Active').length,
    };

    const addUser = () => {
      const name = draft.name.trim() || 'New Crew Member';
      const id = draft.id.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setUsers(prev => prev.concat({
        id,
        name,
        role: draft.role,
        ship: draft.ship,
        lastSeen: 'never',
        twoFactor: 'OFF',
        status: 'Invite pending',
        initial: name.charAt(0).toUpperCase(),
      }));
      setDraft({ name: '', id: '', role: 'Engineer', ship: 'Sea Wolf X' });
      setNotice(`Crew platform invite prepared for ${name}`);
      setShowAdd(false);
    };

    const updateRole = (user, role) => {
      setUsers(prev => prev.map(row => row.id === user.id ? { ...row, role } : row));
      setNotice(`${user.name} access updated to ${role}`);
    };
    const resendInvite = (user) => {
      setUsers(prev => prev.map(row => row.id === user.id ? { ...row, status: 'Invite pending' } : row));
      setNotice(`Invite link prepared for ${user.name}`);
    };
    const removeUser = (user) => {
      setUsers(prev => prev.filter(row => row.id !== user.id));
      setNotice(`${user.name} removed from crew users`);
    };

    return h('div', { className: 'page' },
      h('div', { className: 'page-header' },
        h('div', null,
          h('h1', { className: 'page-title' }, 'Crew users'),
          h('p', { className: 'page-subtitle' }, 'Crew platform accounts. Vessel role controls access to metrics, manuals, PMS and alarms.')
        ),
        h('div', { className: 'page-actions' },
          h('button', { className: 'btn btn-primary', onClick: () => setShowAdd(true) }, h(Icon, { name: 'plus', size: 13 }), 'Add crew user')
        )
      ),
      h('div', { className: 'user-summary-grid' },
        h('div', { className: 'mini-stat' }, h('span', null, 'Crew users'), h('strong', null, counts.total)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Bridge / owner'), h('strong', null, counts.bridge)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Engineering'), h('strong', null, counts.engineering)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Pending / limited'), h('strong', null, counts.pending))
      ),
      h('div', { className: 'admin-scope-grid' },
        Object.entries(ACCESS_BY_ROLE).map(([role, access]) => h('div', { key: role, className: 'mini-stat admin-scope-card' },
          h('span', null, role),
          h('strong', null, access.length),
          h('div', { className: 'access-pill-row' }, access.map(item => h('em', { key: item }, item)))
        ))
      ),
      h('div', { className: 'card' },
        h('div', { className: 'users-toolbar' },
          h('input', { className: 'input input-search', value: query, onChange: event => setQuery(event.target.value), style: { maxWidth: 320 }, placeholder: 'Search crew users...' }),
          h('span', { className: 'seg' }, roles.map(label => h('button', { key: label, className: `seg-btn ${roleFilter === label ? 'active' : ''}`, onClick: () => setRoleFilter(label) }, label))),
          h('span', { style: { flex: 1 } }),
          notice && h('span', { className: 'pill pill-info' }, notice),
          h('span', { className: 'text-3', style: { fontSize: 12 } }, `${filteredUsers.length} users`)
        ),
        h('table', { className: 'dt' },
          h('thead', null, h('tr', null,
            h('th', { style: { width: 32 } }, '#'),
            h('th', null, 'User ID'),
            h('th', { style: { width: 170 } }, 'Name'),
            h('th', { style: { width: 170 } }, 'Vessel role'),
            h('th', null, 'Platform access'),
            h('th', { style: { width: 100 } }, '2FA'),
            h('th', { style: { width: 120 } }, 'Last seen'),
            h('th', { style: { width: 120 } }, 'Status'),
            h('th', { style: { width: 210, textAlign: 'right' } }, 'Actions')
          )),
          h('tbody', null,
            filteredUsers.map(user => h('tr', { key: user.id },
              h('td', null, h('div', { className: 'avatar', style: { width: 24, height: 24, fontSize: 10 } }, user.initial)),
              h('td', { className: 'cell-mono', style: { fontSize: 11.5 } }, user.id),
              h('td', { className: 'cell-strong' }, user.name),
              h('td', null,
                h('select', { className: 'input input-mini', value: user.role, onChange: event => updateRole(user, event.target.value) },
                  Object.keys(ACCESS_BY_ROLE).map(role => h('option', { key: role }, role))
                )
              ),
              h('td', null,
                h('div', { className: 'access-pill-row' },
                  (ACCESS_BY_ROLE[user.role] || []).map(access => h('span', { key: access, className: 'pill pill-soft' }, access))
                )
              ),
              h('td', null, user.twoFactor === 'ON' ? h('span', { className: 'pill pill-ok' }, 'ON') : h('span', { className: 'pill pill-warn' }, 'OFF')),
              h('td', { className: 'text-3 mono', style: { fontSize: 11 } }, user.lastSeen),
              h('td', null, h('span', { className: user.status === 'Active' ? 'pill pill-ok' : user.status === 'Limited' ? 'pill pill-soft' : 'pill pill-warn' }, user.status)),
              h('td', { className: 'cell-actions' },
                h('button', { className: 'btn btn-sm', onClick: () => resendInvite(user) }, 'Invite'),
                h('button', { className: 'btn btn-sm btn-danger', onClick: () => removeUser(user) }, 'Delete')
              )
            )),
            filteredUsers.length === 0 && h('tr', null, h('td', { colSpan: 9, className: 'text-3', style: { padding: 18 } }, 'No crew users match this filter.'))
          )
        )
      ),
      showAdd && h('div', { className: 'modal-overlay' },
        h('div', { className: 'modal' },
          h('div', { className: 'modal-head' },
            h('div', { className: 'modal-icon' }, h(Icon, { name: 'users', size: 16 })),
            h('div', null, h('div', { className: 'modal-title' }, 'Add crew user'), h('div', { className: 'modal-sub' }, 'Crew users access the platform only. Admin panel access is managed in Platform -> Admin users.')),
            h('button', { className: 'modal-close', onClick: () => setShowAdd(false) }, 'x')
          ),
          h('div', { className: 'modal-body user-form-grid' },
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'Name'), h('input', { className: 'input', value: draft.name, onChange: event => setDraft({ ...draft, name: event.target.value }), placeholder: 'Full name' })),
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'User ID / email'), h('input', { className: 'input', value: draft.id, onChange: event => setDraft({ ...draft, id: event.target.value }), placeholder: 'crew@example.com' })),
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'Vessel role'), h('select', { className: 'input', value: draft.role, onChange: event => setDraft({ ...draft, role: event.target.value }) }, Object.keys(ACCESS_BY_ROLE).map(role => h('option', { key: role }, role)))),
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'Ship'), h('select', { className: 'input', value: draft.ship, onChange: event => setDraft({ ...draft, ship: event.target.value }) }, ['Sea Wolf X', 'Aquila One', 'Odyssey Blue'].map(ship => h('option', { key: ship }, ship)))),
            h('div', { className: 'role-access-preview' },
              h('span', null, 'Access preview'),
              h('strong', null, draft.role),
              h('div', { className: 'access-pill-row' }, (ACCESS_BY_ROLE[draft.role] || []).map(access => h('span', { key: access, className: 'pill pill-soft' }, access)))
            )
          ),
          h('div', { className: 'modal-foot' },
            h('button', { className: 'btn', onClick: () => setShowAdd(false) }, 'Cancel'),
            h('button', { className: 'btn btn-primary', onClick: addUser }, h(Icon, { name: 'plus', size: 13 }), 'Add crew user')
          )
        )
      )
    );
  };
})();
