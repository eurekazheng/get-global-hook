import React, { useState } from 'react'

import useUsers from '../users/useUsers'
import usePosts from './usePosts'


export const AddPostForm = () => {
  const [, actions] = usePosts()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const [users] = useUsers()
  const authorOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const canSave =
  [title, content, authorId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await actions.addNewPost({title, content, user: authorId})
        console.log(resultAction)
        setTitle('')
        setContent('')
        setAuthorId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={authorId} onChange={e => setAuthorId(e.target.value)}>
          <option value=""></option>
          {authorOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
