import React from 'react'
import { fetchUsers } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import Nav from '../components/nav'

function Users() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (users.length > 0) return
    dispatch(fetchUsers())
  }, [])

  function toListItem(user) {
    return <li key={user.id}>{user.name}</li>
  }

  return (
    <div>
      <Nav />
      <h1>Users component</h1>
      <ul>{users.map(toListItem)}</ul>
    </div>
  )
}

Users.prepopulate = function UsersPrepopulate(store) {
  return store.dispatch(fetchUsers())
}

export default Users
