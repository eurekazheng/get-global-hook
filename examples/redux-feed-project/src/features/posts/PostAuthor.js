import React from 'react'
import useUsers from '../users/useUsers'

export const PostAuthor = ({ authorId }) => {
  const [users] = useUsers()
  const author = users.find((user) => user.id === authorId)
  return <span>by {author ? author.name : 'Unknown author'}</span>
}
