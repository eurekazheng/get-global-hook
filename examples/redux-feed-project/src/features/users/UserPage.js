import React from 'react'
import useUsers from './useUsers'
import { Link } from 'react-router-dom'

import usePosts from '../posts/usePosts'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const [users] = useUsers()
  const [posts] = usePosts()

  const user = users.find((user) => user.id === userId)
  const postsOfUser = posts.posts.filter(post => post.user === userId)

  const postTitles = postsOfUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}
