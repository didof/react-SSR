import { combineReducers } from 'redux'
import users from './users.reducer'
import posts from './posts.reducer'
import currentUser from './currentUser.reducer'

export default combineReducers({
  users,
  posts,
  currentUser,
})
