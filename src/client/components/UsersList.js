import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'

function UsersList({ users, fetchUsers }) {
  React.useEffect(() => {
    fetchUsers()
  }, [])

  function toListItem(user) {
    return <li key={user.id}>{user.name}</li>
  }

  return (
    <div>
      <div>UsersList component</div>
      <ul>{users.map(toListItem)}</ul>
    </div>
  )
}

function mapStateToProps({ users }) {
  return { users }
}

export default connect(mapStateToProps, { fetchUsers })(UsersList)
