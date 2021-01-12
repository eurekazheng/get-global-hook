import { client } from '../../middleware/client'
import getGlobalHook from '../../middleware/getGlobalHook'
import { nanoid } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

const actions = {
  fetchPosts: async function (ct) {
    ct.state.status = 'loading'
    ct.updateState()
    const response = await client.get('/fakeApi/posts')
    ct.state.posts = ct.state.posts.concat(response.posts)
    ct.state.status = 'succeeded'
    ct.updateState()
  },
  addNewPost: async function (ct, newPost) {
    client.post('/fakeApi/posts', { post: newPost })
      .then(function (response) {
        ct.state.posts.push(response.post)
        ct.updateState()
      })
      .catch((error) => { alert(error) })
  },
  addPost: function (ct, title, content, authorId) {
    const payload = {
      id: nanoid(),
      title,
      content,
      author: authorId,
      date: new Date().toISOString(),
      reactions: {}
    }
    ct.state.posts.push(...payload)
    ct.updateState()
  },
  updatePost: function (ct, id, title, content) {
    const existingPost = ct.state.posts.find(post => post.id === id)
    if (existingPost) {
      existingPost.title = title
      existingPost.content = content
    }
    ct.updateState()
  },
  addReaction: function (ct, id, reaction) {
    const existingPost = ct.state.posts.find(post => post.id === id)
    if (existingPost) {
      if (reaction in existingPost.reactions) {
        existingPost.reactions[reaction]++
      } else {
        existingPost.reactions[reaction] = 1
      }
    }
    ct.updateState()
  }
}

const usePosts = getGlobalHook(initialState, actions)
export default usePosts
