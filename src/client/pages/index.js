import React from 'react'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div>
      <Link to='/users'>Users</Link>
      <div>Index component</div>
      <button onClick={() => alert('Yep')}>Does JS works?</button>
    </div>
  )
}

export default Index
