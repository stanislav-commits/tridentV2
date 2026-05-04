/* global React, Icon */
(function () {
  const h = React.createElement;
  const { useState } = React;

  const userNotifications = [
    { type: 'cert', title: 'IOPP certificate expires in 59d', meta: 'F01 - renew before 30 Jun 2026', tone: 'warn' },
    { type: 'cert', title: 'SOLAS Safety Equipment expires in 105d', meta: 'C05 - plan annual survey window', tone: 'warn' },
    { type: 'alarm', title: 'Engine Mount Stbd AFT vibration', meta: '02.1.010 - threshold exceeded at 14:31', tone: 'danger' },
    { type: 'pms', title: '500h Service is overdue', meta: 'ME Port - assigned to Eng. M.', tone: 'danger' },
  ];

  function UserSettingsModal({ onClose }) {
    const settings = [
      ['Profile', 'Name, avatar, vessel display name and default language.'],
      ['Notifications', 'Alarm priority, PMS reminders and certificate expiry alerts.'],
      ['Units & time zone', 'Metric/imperial units, UTC/local time and date format.'],
      ['Security', 'Password, two-factor authentication and active sessions.'],
      ['Access', 'Read-only role permissions based on rank and assigned vessel.'],
    ];
    return h('div', { className: 'modal-overlay', onClick: onClose },
      h('div', { className: 'modal modal-wide', onClick: event => event.stopPropagation() },
        h('div', { className: 'modal-head' },
          h('div', { className: 'modal-icon' }, h(Icon, { name: 'settings', size: 16 })),
          h('div', null,
            h('div', { className: 'modal-title' }, 'User settings'),
            h('div', { className: 'modal-sub' }, 'Personal preferences for the crew platform only.')
          ),
          h('button', { className: 'modal-close', onClick: onClose }, 'x')
        ),
        h('div', { className: 'modal-body user-settings-grid' },
          settings.map(([title, body]) => h('div', { key: title, className: 'user-setting-card' },
            h('strong', null, title),
            h('p', null, body)
          )),
          h('div', { className: 'user-setting-card user-setting-card-wide' },
            h('strong', null, 'Certificate reminders'),
            h('div', { className: 'settings-toggle-row' },
              h('label', null, h('input', { type: 'checkbox', defaultChecked: true }), ' Notify me 90 days before expiry'),
              h('label', null, h('input', { type: 'checkbox', defaultChecked: true }), ' Notify me 30 days before expiry'),
              h('label', null, h('input', { type: 'checkbox' }), ' Send email summary')
            )
          )
        ),
        h('div', { className: 'modal-foot' },
          h('button', { className: 'btn', onClick: onClose }, 'Cancel'),
          h('button', { className: 'btn btn-primary', onClick: onClose }, 'Save settings')
        )
      )
    );
  }

  window.UserShell = function UserShell({ tab, setTab, setMode, children }) {
    const [showSettings, setShowSettings] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showTaskPanel, setShowTaskPanel] = useState(false);
    const recents = [
      'are there any active bilge alarms right now?',
      'how many running hours has port generator?',
      'what is the bilge level in tanks?',
      'oil spec for MTU 16V 4000',
      'when does SOLAS cert expire?',
      'walk me through bunkering SOP',
      'PMS schedule for next week',
      'list overdue maintenance tasks',
    ];
    const calendarTaskDays = new Set([1, 2, 3, 4, 7, 12, 15, 27]);
    const taskList = [
      { day: '04', title: '500h Service - ME Port', meta: 'Overdue - SFI 02.1.001', tone: 'danger' },
      { day: '04', title: 'Watermaker membrane flush', meta: 'Overdue - SFI 07.1.001', tone: 'danger' },
      { day: '07', title: 'Oil filter change - Gen 1', meta: 'Due this week - SFI 02.1.003', tone: 'warn' },
      { day: '12', title: 'SOLAS certificate review', meta: 'Certificate expiry reminder', tone: 'warn' },
    ];
    const openTasks = () => {
      setTab('pms');
      setShowTaskPanel(false);
    };
    const taskCalendar = h('div', { className: 'user-calendar' },
      h('div', { className: 'user-calendar-head' },
        h('div', null,
          h('span', null, 'My tasks'),
          h('strong', null, 'May 2026')
        ),
        h('button', { className: 'calendar-count', onClick: openTasks }, '4')
      ),
      h('div', { className: 'user-calendar-week' },
        ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => h('span', { key: `${day}-${index}` }, day))
      ),
      h('div', { className: 'user-calendar-grid' },
        Array.from({ length: 31 }, (_, index) => index + 1).map(day => h('button', {
          key: day,
          className: `${day === 4 ? 'today ' : ''}${calendarTaskDays.has(day) ? 'has-task' : ''}`,
          onClick: openTasks,
        }, h('span', null, day), calendarTaskDays.has(day) && h('i', null)))
      ),
      h('div', { className: 'user-calendar-list' },
        taskList.map(task => h('button', { key: `${task.day}-${task.title}`, className: `user-side-task ${task.tone}`, onClick: openTasks },
          h('span', { className: 'task-date' }, task.day),
          h('span', { className: 'task-copy' }, h('strong', null, task.title), h('small', null, task.meta))
        ))
      )
    );
    return h('div', { className: 'user-shell' },
      h('aside', { className: 'user-aside' },
        h('div', { className: 'user-aside-head' },
          h('div', { className: 'sb-brand-mark' },
            h('img', { className: 'sb-brand-logo', src: 'assets/trident-virtual-mark.png', alt: 'Trident Virtual mark' })
          ),
          h('div', { className: 'user-brand-stack' },
            h('div', { className: 'user-brand-title' }, 'Trident', h('br'), 'Intelligence', h('br'), 'Platform'),
            h('div', { className: 'user-brand-sub' }, 'Sea Wolf X')
          ),
          h('button', { className: 'btn btn-sm btn-ghost', style: { marginLeft: 'auto', padding: 6 }, title: 'New chat', onClick: () => setTab('chat') },
            h(Icon, { name: 'plus', size: 14 })
          )
        ),
        h('div', { className: 'user-aside-search' },
          h('input', { className: 'input input-search', placeholder: 'Search chats...' })
        ),
        h('div', { className: 'recent-head' },
          'Recent chats',
          h('button', { title: 'New chat', onClick: () => setTab('chat') }, h(Icon, { name: 'plus', size: 12 }))
        ),
        h('div', { className: 'chat-list' },
          recents.map((item, index) => h('div', {
            key: item,
            className: `chat-item ${tab === 'chat' && index === 0 ? 'active' : ''}`,
            onClick: () => setTab('chat'),
          }, item))
        ),
        h('div', { className: 'user-foot' },
          h('div', { className: 'sb-link', onClick: () => setShowSettings(true) },
            h(Icon, { name: 'settings', size: 14 }), h('span', null, 'Settings')
          ),
          h('div', { className: 'sb-link', onClick: () => setMode('admin') },
            h(Icon, { name: 'shield', size: 14 }), h('span', null, 'Admin panel')
          ),
          h('div', { className: 'sb-link' },
            h(Icon, { name: 'logout', size: 14 }), h('span', null, 'Sign out')
          )
        )
      ),
      h('main', { className: 'user-main' },
        h('div', { className: 'user-tabs' },
          h('div', { style: { flex: 1 } }),
          h('div', { className: 'user-top-actions' },
            h('button', {
              className: 'btn btn-sm btn-ghost user-notify user-task-trigger',
              title: 'My tasks',
              onClick: () => setShowTaskPanel(open => !open),
            },
              h(Icon, { name: 'pms', size: 13 }),
              h('span', { className: 'user-notify-badge' }, '4')
            ),
            h('button', {
              className: 'btn btn-sm btn-ghost user-notify',
              title: 'Notifications',
              onClick: () => setShowNotifications(open => !open),
            },
              h(Icon, { name: 'bell', size: 13 }),
              h('span', { className: 'user-notify-badge' }, '4')
            ),
            h('div', { className: 'avatar user-avatar' }, 'J'),
            showNotifications && h('div', { className: 'user-notify-popover' },
              h('div', { className: 'user-notify-head' }, 'Notifications'),
              userNotifications.map(item => h('div', { key: item.title, className: `user-notify-item ${item.tone}` },
                h('div', { className: 'user-notify-icon' }, h(Icon, { name: item.type === 'cert' ? 'doc' : item.type === 'pms' ? 'pms' : 'alert', size: 13 })),
                h('div', null,
                  h('strong', null, item.title),
                  h('span', null, item.meta)
                )
              ))
            )
          )
        ),
        children
      ),
      showTaskPanel && h('div', { className: 'user-task-scrim', onClick: () => setShowTaskPanel(false) }),
      showTaskPanel && h('aside', { className: 'user-task-drawer' },
        h('div', { className: 'user-task-panel-head' },
          h('div', null,
            h('span', null, 'Task calendar'),
            h('strong', null, 'My tasks')
          ),
          h('button', { className: 'modal-close', onClick: () => setShowTaskPanel(false) }, 'x')
        ),
        taskCalendar
      ),
      showSettings && h(UserSettingsModal, { onClose: () => setShowSettings(false) })
    );
  };

  window.UserAlerts = function UserAlerts() {
    const list = [
      { sev: 'danger', src: '02.1.010', title: 'Engine Mount Stbd AFT - vibration above threshold', body: '8.2 mm/s observed at 14:31 UTC; threshold 6.0 mm/s. Recommend reducing load and inspecting mount.', when: '14:31', cat: 'Vibration' },
      { sev: 'warn', src: '04.4.003', title: 'Bilge Lazarette - water level rising', body: 'Trend shows +12 mm over last 30 min. Below alarm level but above normal.', when: '13:48', cat: 'Bilge' },
      { sev: 'warn', src: 'F01', title: 'IOPP certificate expires in 59 days', body: 'Certificate expires on 30 Jun 2026. Start renewal workflow and upload the new certificate after survey.', when: '08:00', cat: 'Certificate' },
      { sev: 'warn', src: 'C05', title: 'SOLAS Safety Equipment expires in 105 days', body: 'Plan annual survey and confirm equipment record before the expiry window.', when: 'Yesterday', cat: 'Certificate' },
      { sev: 'warn', src: '02.1.005', title: 'Emergency Generator preheat fault', body: 'During weekly auto-test, preheat circuit reported low voltage. Engine started on second attempt.', when: '12:02', cat: 'Electrical' },
    ];
    return h('div', { style: { flex: 1, overflowY: 'auto' } },
      h('div', { className: 'page', style: { paddingBottom: 28, maxWidth: 980 } },
        h('div', { className: 'page-header' },
          h('div', null,
            h('h1', { className: 'page-title' }, 'Alerts'),
            h('p', { className: 'page-subtitle' }, 'Live notifications from telemetry, PMS and certificate expiry dates.')
          ),
          h('div', { className: 'page-actions' }, h('button', { className: 'btn btn-sm' }, 'Acknowledge all'))
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          list.map((item, index) => h('div', { key: `${item.src}-${index}`, className: 'card user-alert-card' },
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
              h('div', { className: `user-alert-icon ${item.sev}` },
                h(Icon, { name: item.cat === 'Certificate' ? 'doc' : 'alert', size: 15 })
              ),
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { className: 'row', style: { marginBottom: 4, gap: 10 } },
                  h('span', { className: 'pill mono' }, item.src),
                  h('span', { className: 'pill pill-soft' }, item.cat),
                  h('span', { style: { flex: 1 } }),
                  h('span', { className: 'text-3 mono', style: { fontSize: 11 } }, item.when)
                ),
                h('div', { className: 'user-alert-title' }, item.title),
                h('div', { className: 'user-alert-body' }, item.body),
                h('div', { className: 'row', style: { marginTop: 10, gap: 8 } },
                  h('button', { className: 'btn btn-sm' }, 'Acknowledge'),
                  h('button', { className: 'btn btn-sm btn-ghost' }, h(Icon, { name: 'chat', size: 11 }), 'Ask AI about this')
                )
              )
            )
          ))
        )
      )
    );
  };
})();
