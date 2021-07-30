import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function Users() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  function toListItem(user) {
    return <li key={user.id}>{user.name}</li>
  }

  return (
    <div>
      <Link to='/'>Home</Link>
      <div>Users component</div>
      <ul>{users.map(toListItem)}</ul>
    </div>
  )
}

Users.prepopulate = function UsersPrepopulate(store) {
  return store.dispatch(fetchUsers())
}

export default Users
