import { FETCH_SECRET } from '../actions'

const initialState = {}

function secretReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SECRET:
      return action.payload
    default:
      return state
  }
}

export default secretReducer
