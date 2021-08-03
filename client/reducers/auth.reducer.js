import { FETCH_CURRENT_USER, LOGIN, LOGOUT } from '../actions'

const initialState = {
  id: null,
  username: 'guest',
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case FETCH_CURRENT_USER:
      return action.payload
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default authReducer
