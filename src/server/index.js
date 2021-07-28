require('dotenv').config()

import express from 'express'
import renderer from './helpers/renderer'
import { openBrowser } from './helpers/opener'
import createStore from './helpers/createStore'
import { matchPath } from '../client/Routes'

import 'babel-polyfill'

const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
  const { path } = req

  const store = createStore()

  const collectLoadData = createLoadDataCollector(store)

  const loadDataPromises = matchPath(path).map(collectLoadData)
  console.log(loadDataPromises)

  const renderedHTML = renderer(path, store)

  res.status(200).send(renderedHTML)
})

app.listen(process.env.RENDERER_SERVER_PORT, openBrowser)

function createLoadDataCollector(store) {
  return function collectLoadData({ route }) {
    return route.loadData(store)
  }
}
