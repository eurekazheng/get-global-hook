import React from 'react'
import { Link } from 'react-router-dom'

import useNotifications from '../features/notifications/useNotifications'

export const Navbar = () => {
  const [notifications, actions] = useNotifications()

  const fetchNewNotifications = () => {
    actions.fetchNotifications()
  }
  const numUnreadNotifications = notifications.filter(n => !n.read).length

  let unreadNotificationsBadge
  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>OneCourse Forum</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
