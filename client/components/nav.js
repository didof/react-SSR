import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions'

import F from './framework'

function Nav() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  async function handleLogout() {
    dispatch(logout())
  }

  return (
    <ul
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        listStyle: 'none',
      }}
    >
      <li>
        <F.Link to='/'>Home</F.Link>
      </li>
      <li>
        <F.Link to='/posts'>Posts</F.Link>
      </li>
      <li>
        <F.Link prepopulate to='/users'>
          Users
        </F.Link>
      </li>
      {auth.id ? (
        <u onClick={handleLogout}>Logout</u>
      ) : (
        <F.Link to='/login'>Login</F.Link>
      )}
    </ul>
  )
}

export default Nav
