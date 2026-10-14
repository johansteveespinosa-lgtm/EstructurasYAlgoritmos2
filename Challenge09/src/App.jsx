
import { useState } from 'react'
import './App.css'

const menus = [
  {
    title: 'Profile',
    link: '/profile',
    component: 'Profile',
    children: []
  },
  {
    title: 'Messages',
    link: '/messages',
    component: 'Messages',
    children: []
  },
  {
    title: 'Settings',
    link: '/settings',
    component: 'Settings',
    children: [
      {
        title: 'Account',
        link: '/settings/account',
        component: 'Account',
        children: []
      },
      {
        title: 'Profile',
        link: '/settings/profile',
        component: 'ProfileSettings',
        children: []
      },
      {
        title: 'Security & Privacy',
        link: '/settings/security',
        component: 'Security',
        children: []
      },
      {
        title: 'Password',
        link: '/settings/password',
        component: 'Password',
        children: []
      },
      {
        title: 'Notification',
        link: '/settings/notification',
        component: 'Notification',
        children: []
      }
    ]
  },
  {
    title: 'Help',
    link: '/help',
    component: 'Help',
    children: [
      {
        title: "FAQ's",
        link: '/help/faqs',
        component: 'FAQs',
        children: []
      },
      {
        title: 'Submit a Ticket',
        link: '/help/ticket',
        component: 'Ticket',
        children: []
      },
      {
        title: 'Network Status',
        link: '/help/network',
        component: 'NetworkStatus',
        children: []
      }
    ]
  },
  {
    title: 'Logout',
    link: '/logout',
    component: 'Logout',
    children: []
  }
]

function App() {
  const [expanded, setExpanded] = useState({
    Settings: true,
    Help: true
  })

  const [selected, setSelected] = useState('/settings/security')

  function renderMenu(items) {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.link}>
            <div
              className={`menu-item ${
                selected === item.link ? 'selected' : ''
              }`}
              onClick={() => {
                setSelected(item.link)

                if (item.children.length > 0) {
                  setExpanded({
                    ...expanded,
                    [item.title]: !expanded[item.title]
                  })
                }
              }}
            >
              <span>{item.title}</span>

              {item.children.length > 0 && (
                <span>{expanded[item.title] ? '⌄' : '›'}</span>
              )}
            </div>

            {item.children.length > 0 && expanded[item.title] && (
              <div className="submenu">
                {renderMenu(item.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>My Dashboard</h2>
        <nav>{renderMenu(menus)}</nav>
      </aside>

      <main className="content">
        <h1>Challenge 09</h1>
        <h2>{menus.length > 0 ? 'N-ary Tree Menu' : ''}</h2>
        <p>Selected link: {selected}</p>
      </main>
    </div>
  )
}

export default App
