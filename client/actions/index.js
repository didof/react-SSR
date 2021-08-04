export const FETCH_USERS = 'fetch_users'
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users')

  dispatch({
    type: FETCH_USERS,
    payload: res.data,
  })
}

export const FETCH_POSTS = 'fetch_posts'
export const fetchPosts = () => async (dispatch, getState, api) => {
  const res = await api.get('/posts')

  dispatch({
    type: FETCH_POSTS,
    payload: res.data,
  })
}

export const FETCH_CURRENT_USER = 'fetch_current_user'
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

export const LOGIN = 'login'
export const login = data => async (dispatch, getState, api) => {
  const res = await api.post('/login', data)

  dispatch(fetchPosts())

  dispatch({
    type: LOGIN,
    payload: res.data,
  })
}

export const LOGOUT = 'logout'
export const logout = () => async (dispatch, getState, api) => {
  await api.get('/logout')

  dispatch(fetchPosts())

  dispatch({ type: LOGOUT })
}

export const FETCH_SECRET = 'fetch_secret'
export const fetchSecret = () => async (dispatch, getState, api) => {
  const res = await api.get('/secret')

  dispatch({
    type: FETCH_SECRET,
    payload: res.data,
  })
}

export const MARK_ACTION = 'mark_action'
const markAction = actionType => async dispatch => {
  dispatch({
    type: MARK_ACTION,
    payload: actionType,
  })
}
