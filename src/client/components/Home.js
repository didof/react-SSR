import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to='/users'>Users</Link>
      <div>Home component</div>
      <button onClick={() => alert('Yep')}>Does JS works?</button>
    </div>
  )
}

export default Home
