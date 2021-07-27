import axios from 'axios'

export const FETCH_USERS = 'fetch_users'

export const fetchUsers = () => async dispatch => {
  // TODO inject at build time the API port via definePlugin
  const res = await axios.get(`http://localhost:8001/users`)

  dispatch({
    type: FETCH_USERS,
    payload: res,
  })
}
