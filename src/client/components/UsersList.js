import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'
import { Link } from 'react-router-dom'

function UsersList({ users, fetchUsers }) {
  React.useEffect(() => {
    fetchUsers()
  }, [])

  function toListItem(user) {
    return <li key={user.id}>{user.name}</li>
  }

  return (
    <div>
      <Link to='/'>Home</Link>
      <div>UsersList component</div>
      <ul>{users.map(toListItem)}</ul>
    </div>
  )
}

UsersList.loadData = function UsersListLoadData(store) {
  return store.dispatch(fetchUsers())
}

export default connect(mapStateToProps, { fetchUsers })(UsersList)

function mapStateToProps({ users }) {
  return { users }
}

function clientSide(fn) {
  if (typeof window === 'undefined') return
  return fn
}
