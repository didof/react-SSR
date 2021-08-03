export const FETCH_USERS = 'fetch_users'
export const FETCH_POSTS = 'fetch_posts'
export const LOGIN = 'login'

export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users')

  dispatch({
    type: FETCH_USERS,
    payload: res.data,
  })
}

export const fetchPosts = () => async (dispatch, getState, api) => {
  const res = await api.get('/posts')
  dispatch({
    type: FETCH_POSTS,
    payload: res.data,
  })
}

export const login = data => async (dispatch, getState, api) => {
  const res = await api.post('/login', data)

  dispatch({
    type: LOGIN,
    payload: res.data,
  })
}
