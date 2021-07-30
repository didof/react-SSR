import React from 'react'
import F from '../components/framework'

function Index() {
  return (
    <div>
      <F.Link prepopulate to='/users'>
        Users
      </F.Link>
      <br />
      <F.Link to='/posts'>Posts</F.Link>
      <h1>Index</h1>
      <button onClick={() => alert('Yep')}>Does JS works?</button>
    </div>
  )
}

export default Index
