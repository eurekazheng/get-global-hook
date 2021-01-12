import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import usePosts from './usePosts'

let PostExcerpt = ({ postId }) => {
  const [posts] = usePosts()
  const post = posts.posts.find((post) => post.id === postId)

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor authorId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export function PostsList() {
  const [posts, actions] = usePosts()
  const postsStatus = posts.status
  const postsError = posts.error

  useEffect(() => {
    if (postsStatus === 'idle') {
      actions.fetchPosts()
    }
  }, [])

  let content
  if (postsStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postsStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts.posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} postId={post.id} />
    ))
  } else if (postsStatus === 'failed') {
    content = <div>{postsError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
