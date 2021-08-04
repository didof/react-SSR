import React from 'react'
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

Posts.initStore = fetchPosts

export default Posts
