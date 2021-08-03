require('dotenv').config()

import express from 'express'
import {
  createHTMLGenerator,
  createReactAppGenerator,
} from './helpers/renderer'
import { openBrowser } from './helpers/opener'
import createStore from './helpers/createStore'
import * as check from './helpers/check'
import routesConfig from './routesGenerator'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'

import 'babel-polyfill'

const app = express()

app.use('/api', proxy(`http://localhost:${process.env.API_SERVER_PORT}`))
app.use(express.static('public'))

app.get('/favicon.ico', (req, res) => {
  res.status(200).send()
})

app.get('*', (req, res) => {
  const { path } = req

  const cookie = req.get('cookie')

  const store = createStore(cookie)
  const makeCollector = initSharedCollectors(store)

  const [collectInitStore, collectPrepopulate] = [
    'initStore',
    'prepopulate',
  ].map(makeCollector)

  const initStorePromises = routesConfig
    .map(route => ({ route }))
    .map(collectInitStore)

  const prepopulatePromises = matchRoutes(routesConfig, path).map(
    collectPrepopulate
  )

  const dataFetchingPromises = initStorePromises.concat(prepopulatePromises)

  Promise.all(dataFetchingPromises).then(() => {
    const HTMLGenerator = createHTMLGenerator(store)

    const reactAppGenerator = createReactAppGenerator(store, routesConfig)

    const reactApp = reactAppGenerator(path)

    const html = HTMLGenerator(reactApp)

    res.status(200).send(html)
  })
})

app.listen(process.env.RENDERER_SERVER_PORT, openBrowser)

function initSharedCollectors(store) {
  const cached = {}

  return function makeCollector(staticMethodName) {
    const checkStaticMethod = check.existsAndIsFunction(staticMethodName)

    return function collectorPromise({ route }) {
      if (!checkStaticMethod(route.component)) return null
      if (
        cached.hasOwnProperty(route.path) &&
        cached[route.path].hasOwnProperty('initStore')
      )
        return null
      cached[route.path] = staticMethodName
      return route.component[staticMethodName](store)
    }
  }
}
