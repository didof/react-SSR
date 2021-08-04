import React from 'react'
import { useAuth } from '../helpers/customHooks'
import F from './framework'

function Nav() {
  const { isAuth, authHandler } = useAuth()
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
      {isAuth ? (
        <u onClick={authHandler} style={{ cursor: 'pointer' }}>
          Logout
        </u>
      ) : (
        <F.Link to='/login'>Login</F.Link>
      )}
    </ul>
  )
}

export default Nav
