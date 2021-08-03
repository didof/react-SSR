import { FETCH_CURRENT_USER, RESET_CURRENT_USER, LOGIN } from '../actions'

const initialState = {}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case FETCH_CURRENT_USER:
      return action.payload
    case RESET_CURRENT_USER:
      return initialState
    default:
      return state
  }
}

export default authReducer
