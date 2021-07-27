require('dotenv').config()

import express from 'express'
import renderer, { openBrowser } from './helpers'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).send(renderer(req.path))
})

app.listen(process.env.PORT, openBrowser)
