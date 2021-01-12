import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useUsers from './useUsers'

export const UsersList = () => {
  const [users, actions] = useUsers()
  useEffect(() => {
    actions.fetchUsers()
  }, [])

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}
