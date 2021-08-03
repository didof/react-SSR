import { api } from '../helpers/net'

export const FETCH_USERS = 'fetch_users'
export const FETCH_POSTS = 'fetch_posts'

export const fetchUsers = () => async dispatch => {
  const res = await api.get('/users')

  dispatch({
    type: FETCH_USERS,
    payload: res.data,
  })
}

export const fetchPosts = () => async dispatch => {
  const res = await api.get('/posts')

  dispatch({
    type: FETCH_POSTS,
    payload: res.data,
  })
}
