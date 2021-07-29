require('dotenv').config()

import express from 'express'
import {
  createHTMLGenerator,
  createReactAppGenerator,
} from './helpers/renderer'
import { openBrowser } from './helpers/opener'
import createStore from './helpers/createStore'
import { matchPath } from '../client/Routes'
import * as check from './helpers/check'

import routesGenerator from './routesGenerator'

import 'babel-polyfill'

const app = express()

app.use(express.static('public'))

// const routes = routesGenerator()

app.get('*', (req, res) => {
  const { path } = req

  const store = createStore()

  const collectPrepopulate = createPrepopulateCollector(store)

  const loadDataPromises = matchPath(path).map(collectPrepopulate)

  Promise.all(loadDataPromises).then(() => {
    const HTMLGenerator = createHTMLGenerator(store)
    const reactAppGenerator = createReactAppGenerator(store)

    const reactApp = reactAppGenerator(path)

    const html = HTMLGenerator(reactApp)

    res.status(200).send(html)
  })
})

app.listen(process.env.RENDERER_SERVER_PORT, openBrowser)

function createPrepopulateCollector(store) {
  const checkPrepopulate = check.existsAndIsFunction('prepopulate')

  return function collectPrepopulatePromises({ route }) {
    if (checkPrepopulate(route)) return route.prepopulate(store)
    return null
  }
}
