import React from 'react'
import { Link } from 'react-router-dom'

import usePosts from './usePosts'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostPage = ({ match }) => {
  const { postId } = match.params

  const [posts] = usePosts()
  const post = posts.posts.find((post) => post.id === postId)

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor authorId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
