/* global React, Icon */
(function () {
  const h = React.createElement;
  const { useState } = React;

  window.FleetManagersPage = function FleetManagersPage() {
    const yachts = ['Sea Wolf X', 'Aquila One', 'Odyssey Blue', 'New build 04'];
    const initialManagers = [
      { id: 'marina@trident-virtual.com', name: 'Marina Kovacs', yachts: ['Sea Wolf X', 'Aquila One'], lastSeen: '8m ago', status: 'Active', initial: 'M' },
      { id: 'fleet.ops@trident-virtual.com', name: 'Fleet Ops Desk', yachts: ['Sea Wolf X', 'Odyssey Blue', 'New build 04'], lastSeen: '1h ago', status: 'Active', initial: 'F' },
      { id: 'guest.manager@trident-virtual.com', name: 'Guest Manager', yachts: ['Aquila One'], lastSeen: 'never', status: 'Invite pending', initial: 'G' },
    ];
    const [managers, setManagers] = useState(initialManagers);
    const [showAdd, setShowAdd] = useState(false);
    const [notice, setNotice] = useState('');
    const [draft, setDraft] = useState({ name: '', id: '', yachts: ['Sea Wolf X'] });

    const toggleDraftYacht = yacht => {
      const selected = new Set(draft.yachts);
      selected.has(yacht) ? selected.delete(yacht) : selected.add(yacht);
      setDraft({ ...draft, yachts: Array.from(selected) });
    };
    const addManager = () => {
      const name = draft.name.trim() || 'New Fleet Manager';
      const id = draft.id.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const linkedYachts = draft.yachts.length ? draft.yachts : ['Sea Wolf X'];
      setManagers(prev => prev.concat({
        id,
        name,
        yachts: linkedYachts,
        lastSeen: 'never',
        status: 'Invite pending',
        initial: name.charAt(0).toUpperCase(),
      }));
      setDraft({ name: '', id: '', yachts: ['Sea Wolf X'] });
      setNotice(`Fleet manager invite prepared for ${name}`);
      setShowAdd(false);
    };
    const removeManager = manager => {
      setManagers(prev => prev.filter(row => row.id !== manager.id));
      setNotice(`${manager.name} removed from fleet manager access`);
    };
    const linkedYachtCount = new Set(managers.flatMap(manager => manager.yachts)).size;

    return h('div', { className: 'page' },
      h('div', { className: 'page-header' },
        h('div', null,
          h('h1', { className: 'page-title' }, 'Fleet managers'),
          h('p', { className: 'page-subtitle' }, 'Fleet managers can view all vessel data for every yacht connected to their account.')
        ),
        h('div', { className: 'page-actions' },
          h('button', { className: 'btn btn-primary', onClick: () => setShowAdd(true) }, h(Icon, { name: 'plus', size: 13 }), 'Add manager')
        )
      ),
      h('div', { className: 'fleet-summary-grid' },
        h('div', { className: 'mini-stat' }, h('span', null, 'Managers'), h('strong', null, managers.length)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Linked yachts'), h('strong', null, linkedYachtCount)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Active'), h('strong', null, managers.filter(manager => manager.status === 'Active').length)),
        h('div', { className: 'mini-stat' }, h('span', null, 'Pending invites'), h('strong', null, managers.filter(manager => manager.status !== 'Active').length))
      ),
      h('div', { className: 'card' },
        h('div', { className: 'users-toolbar' },
          notice && h('span', { className: 'pill pill-info' }, notice),
          h('span', { style: { flex: 1 } }),
          h('span', { className: 'text-3', style: { fontSize: 12 } }, `${managers.length} managers`)
        ),
        h('table', { className: 'dt' },
          h('thead', null, h('tr', null,
            h('th', { style: { width: 32 } }, '#'),
            h('th', null, 'Manager ID'),
            h('th', { style: { width: 190 } }, 'Name'),
            h('th', null, 'Linked yachts'),
            h('th', { style: { width: 180 } }, 'Access'),
            h('th', { style: { width: 120 } }, 'Last seen'),
            h('th', { style: { width: 130 } }, 'Status'),
            h('th', { style: { width: 190, textAlign: 'right' } }, 'Actions')
          )),
          h('tbody', null,
            managers.map(manager => h('tr', { key: manager.id },
              h('td', null, h('div', { className: 'avatar', style: { width: 24, height: 24, fontSize: 10 } }, manager.initial)),
              h('td', { className: 'cell-mono', style: { fontSize: 11.5 } }, manager.id),
              h('td', { className: 'cell-strong' }, manager.name),
              h('td', null, h('div', { className: 'fleet-yacht-list' }, manager.yachts.map(yacht => h('span', { key: yacht, className: 'pill pill-soft' }, yacht)))),
              h('td', null, h('span', { className: 'pill pill-info' }, 'All vessel data')),
              h('td', { className: 'text-3 mono', style: { fontSize: 11 } }, manager.lastSeen),
              h('td', null, h('span', { className: manager.status === 'Active' ? 'pill pill-ok' : 'pill pill-warn' }, manager.status)),
              h('td', { className: 'cell-actions' },
                h('button', { className: 'btn btn-sm' }, 'Edit yachts'),
                h('button', { className: 'btn btn-sm btn-danger', onClick: () => removeManager(manager) }, 'Delete')
              )
            ))
          )
        )
      ),
      showAdd && h('div', { className: 'modal-overlay' },
        h('div', { className: 'modal modal-wide' },
          h('div', { className: 'modal-head' },
            h('div', { className: 'modal-icon' }, h(Icon, { name: 'users', size: 16 })),
            h('div', null, h('div', { className: 'modal-title' }, 'Add fleet manager'), h('div', { className: 'modal-sub' }, 'Connect one manager to one or more yachts.')),
            h('button', { className: 'modal-close', onClick: () => setShowAdd(false) }, 'x')
          ),
          h('div', { className: 'modal-body user-form-grid' },
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'Name'), h('input', { className: 'input', value: draft.name, onChange: event => setDraft({ ...draft, name: event.target.value }), placeholder: 'Full name' })),
            h('label', { className: 'field' }, h('span', { className: 'field-label' }, 'Manager ID / email'), h('input', { className: 'input', value: draft.id, onChange: event => setDraft({ ...draft, id: event.target.value }), placeholder: 'manager@example.com' })),
            h('div', { className: 'field fleet-yacht-picker' },
              h('span', { className: 'field-label' }, 'Yachts'),
              yachts.map(yacht => h('label', { key: yacht, className: 'fleet-yacht-option' },
                h('input', { type: 'checkbox', checked: draft.yachts.includes(yacht), onChange: () => toggleDraftYacht(yacht) }),
                h('span', null, yacht)
              ))
            ),
            h('div', { className: 'role-access-preview' },
              h('span', null, 'Access model'),
              h('strong', null, 'Full data visibility for linked yachts'),
              h('p', { className: 'text-3', style: { margin: 0, fontSize: 12, lineHeight: 1.45 } }, 'The manager can see metrics, manuals, PMS, alarms, certificates and accounting for each assigned yacht.')
            )
          ),
          h('div', { className: 'modal-foot' },
            h('button', { className: 'btn', onClick: () => setShowAdd(false) }, 'Cancel'),
            h('button', { className: 'btn btn-primary', onClick: addManager }, h(Icon, { name: 'plus', size: 13 }), 'Add manager')
          )
        )
      )
    );
  };
})();
