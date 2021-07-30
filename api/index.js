require('dotenv').config()

import express from 'express'
import cors from 'cors'

import db from './db.json'

const app = express()

app.use(cors())

app.get('/users', (req, res) => {
  res.status(200).json(db.users)
})

app.get('/posts', (req, res) => {
  res.status(200).json(db.posts)
})

const port = process.env.API_SERVER_PORT
app.listen(port, () => {
  console.info(`API listening on http://localhost:${port}`)
})
