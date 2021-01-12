import React from 'react'
import usePosts from './usePosts'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }) => {
  const [, actions] = usePosts()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button 
        key={name} 
        type="button" 
        className="muted-button reaction-button"
        onClick={() => actions.addReaction(post.id, name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
