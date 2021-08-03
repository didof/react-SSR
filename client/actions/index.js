export const FETCH_USERS = 'fetch_users'
export const FETCH_POSTS = 'fetch_posts'
export const FETCH_CURRENT_USER = 'fetch_current_user'
export const LOGIN = 'login'
export const LOGOUT = 'logout'

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

export const logout = () => async (dispatch, getState, api) => {
  await api.get('/logout')

  dispatch({ type: LOGOUT })
}

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  let res
  try {
    res = await api.get('/current-user')

    dispatch({
      type: FETCH_CURRENT_USER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({ type: LOGOUT })
  }
}
