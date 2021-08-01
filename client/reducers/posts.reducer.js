import { FETCH_POSTS } from '../actions'

const initialState = []

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload
    default:
      return state
  }
}

export default postsReducer
