require('dotenv').config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import db from './db.json'

import * as mw from './middlewares'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:8000',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(bodyParser())

app.get('/users', (req, res) => {
  const usersStrippedOfPasswords = db.users.map(({ password, ...rest }) => rest)

  res.status(200).json(usersStrippedOfPasswords)
})

app.get('/posts', mw.authInfo, (req, res) => {
  if (req.userId) return res.status(200).json(db.posts)
  const notDraftPosts = db.posts.filter(post => !post.draft)
  res.status(200).json(notDraftPosts)
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = db.users.find(user => user.name === username)

  if (!user) return res.status(404).send('credentials are not valid')

  const { id, name, password: hashedPassword } = user

  bcrypt.compare(password, hashedPassword, function (err, result) {
    if (err) return res.status(500).send('Internal Server Error')
    if (!result) return res.status(403).send('credentials are not valid')

    const token = jwt.sign({ id, name }, process.env.JWT_SECRET)

    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ id, username: name })
  })
})

app.get('/current-user', mw.authGuard, (req, res) => {
  return res.status(200).json({ id: req.userId, username: req.username })
})

app.get('/logout', mw.authGuard, (req, res) => {
  return res.clearCookie('access_token').status(200).send('logged out')
})

app.get('/protected', mw.authGuard, (req, res) => {
  return res.status(200).send('secret of ' + req.username)
})

const port = process.env.API_SERVER_PORT
app.listen(port, () => {
  console.info(`API listening on http://localhost:${port}`)
})
