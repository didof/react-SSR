import React from 'react'
import { useHandleInput } from '../helpers/customHooks'
import { useAuth } from '../helpers/customHooks'

function Login() {
  const { isAuth, authHandler, authInfo } = useAuth()
  const [username, handleUsername] = useHandleInput('didof')
  const [password, handlePassword] = useHandleInput('1234')

  if (isAuth)
    return (
      <div>
        <span>You are already logged in as {authInfo.username}</span>
        <br />
        <button onClick={authHandler}>Logout</button>
      </div>
    )

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input type='text' value={username} onInput={handleUsername} />
        <br />
        <input type='password' value={password} onInput={handlePassword} />
        <br />
        <button>Sign in</button>
      </form>
    </div>
  )

  async function handleSubmit(event) {
    event.preventDefault()

    authHandler({
      username,
      password,
    })
  }
}

export default Login
