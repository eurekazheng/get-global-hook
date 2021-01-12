import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import usePosts from './usePosts'


export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const [posts, actions] = usePosts()
  const post = posts.posts.find((post) => post.id === postId)

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const history = useHistory()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      actions.updatePost(postId, title, content)
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
