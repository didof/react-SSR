import React from 'react'

import F from './framework'

function Nav() {
  return (
    <ul>
      <li>
        <F.Link to='/'>Home</F.Link>
      </li>
      <li>
        <F.Link to='/login'>Login</F.Link>
      </li>
      <li>
        <F.Link to='/posts'>Posts</F.Link>
      </li>
      <li>
        <F.Link prepopulate to='/users'>
          Users
        </F.Link>
      </li>
    </ul>
  )
}

export default Nav
