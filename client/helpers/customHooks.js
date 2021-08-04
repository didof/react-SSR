import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../actions'

export function useHandleInput(initialState) {
  const [value, setValue] = useState(initialState)

  function handleInput(event) {
    event.preventDefault()
    setValue(event.target.value)
  }

  return [value, handleInput]
}

export function useAuth() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const isAuth = Boolean(auth.id)

  function handleLogin(data) {
    dispatch(login(data))
  }

  function handleLogout() {
    dispatch(logout())
  }

  const authHandler = isAuth ? handleLogout : handleLogin

  const authInfo = auth

  return { isAuth, authHandler, authInfo }
}
