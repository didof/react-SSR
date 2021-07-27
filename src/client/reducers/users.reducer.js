import { FETCH_USERS } from '../actions'

const initialState = []

function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data
    default:
      return state
  }
}

export default userReducer
