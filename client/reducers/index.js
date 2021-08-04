import { combineReducers } from 'redux'
import users from './users.reducer'
import posts from './posts.reducer'
import auth from './auth.reducer'
import secret from './secret.reducer'

export default combineReducers({
  users,
  posts,
  auth,
  secret,
})
