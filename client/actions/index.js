import axios from 'axios'

const API_URL = 'http://localhost:8001'

export const FETCH_USERS = 'fetch_users'
export const FETCH_POSTS = 'fetch_posts'

export const fetchUsers = () => async dispatch => {
  // TODO inject at build time the API port via definePlugin
  const res = await axios.get(API_URL + '/users')

  dispatch({
    type: FETCH_USERS,
    payload: res.data,
  })
}

export const fetchPosts = () => async dispatch => {
  const res = await axios.get(API_URL + '/posts')

  dispatch({
    type: FETCH_POSTS,
    payload: res.data,
  })
}
