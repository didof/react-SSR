import React from 'react'
import axios from 'axios'
import Nav from '../components/nav'
import { api } from '../helpers/net'

function Login() {
  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      username: 'didof',
      password: '1234',
    }

    const res = await api.post('/login', data)
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
