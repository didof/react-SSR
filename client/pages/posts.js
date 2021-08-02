import React from 'react'
import F from '../components/framework'
import { fetchPosts } from '../actions'
import { useSelector, useDispatch } from 'react-redux'

function Posts() {
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (posts.length > 0) return
    dispatch(fetchPosts())
  }, [])

  return (
    <div>
      <F.Link to='/'>Home</F.Link>
      <br />
      <F.Link to='/users'>Users</F.Link>
      <h1>Posts</h1>
      {posts.map(({ title, content, authorId }) => {
        return (
          <article key={authorId + title}>
            <h4>{title}</h4>
            <h6>by {authorId}</h6>
            <div>{content}</div>
          </article>
        )
      })}
    </div>
  )
}

Posts.initStore = function PostsInitStore(store) {
  return store.dispatch(fetchPosts())
}

export default Posts
