import React from 'react'
import axios from 'axios'
import Nav from '../components/nav'

function Login() {
  async function handleSubmit(event) {
    event.preventDefault()

    const res = await axios.post(
      'http://localhost:8001/login',
      {
        username: 'didof',
        password: '1234',
      },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Nav />
      <h1>Login</h1>
      <span>Sign in as didof and password 1234</span>
      <br />
      <button>Sign in</button>
    </form>
  )
}

export default Login
