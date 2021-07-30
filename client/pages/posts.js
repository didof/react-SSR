import React from 'react'
import F from '../components/framework'

function Posts() {
  return (
    <div>
      <F.Link to='/'>Home</F.Link>
      <br />
      <F.Link to='/users'>Users</F.Link>
      <h1>Posts</h1>
    </div>
  )
}

export default Posts
