require('dotenv').config()

import express from 'express'
import renderer from './helpers/renderer'
import { openBrowser } from './helpers/opener'
import createStore from './helpers/createStore'

const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = createStore()

  const renderedHTML = renderer(req.path, store)

  res.status(200).send(renderedHTML)
})

app.listen(process.env.RENDERER_SERVER_PORT, openBrowser)
