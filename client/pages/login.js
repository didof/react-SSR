import React from 'react'
import { useDispatch } from 'react-redux'
import Nav from '../components/nav'
import { useHandleInput } from '../helpers/customHooks'
import { login } from '../actions'

function Login() {
  const dispatch = useDispatch()
  const [username, handleUsername] = useHandleInput('didof')
  const [password, handlePassword] = useHandleInput('1234')

  return (
    <div>
      <Nav />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={username} onInput={handleUsername} />
        <br />
        <input type='password' value={password} onInput={handlePassword} />
        <br />
        <span>Sign in as didof and password 1234</span>
        <br />
        <button>Sign in</button>
      </form>
    </div>
  )

  async function handleSubmit(event) {
    event.preventDefault()

    dispatch(
      login({
        username,
        password,
      })
    )
  }
}

export default Login
