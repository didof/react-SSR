require('dotenv').config()

import express from 'express'
import {
  createHTMLGenerator,
  createReactAppGenerator,
} from './helpers/renderer'
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

  Promise.all(loadDataPromises).then(() => {
    const HTMLGenerator = createHTMLGenerator(store)
    const reactAppGenerator = createReactAppGenerator(store)

    const reactApp = reactAppGenerator(path)

    const html = HTMLGenerator(reactApp)

    res.status(200).send(html)
  })
})

app.listen(process.env.RENDERER_SERVER_PORT, openBrowser)

function createLoadDataCollector(store) {
  return function collectLoadData({ route }) {
    return route.loadData(store)
  }
}
