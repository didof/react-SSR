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

const debug = {}

const app = express()

app.use('/api', proxy(`http://localhost:${process.env.API_SERVER_PORT}`))
app.use(express.static('public'))

app.get('/favicon.ico', (req, res) => {
  res.status(200).send()
})

const context = {}
const reactAppGenerator = createReactAppGenerator(routesConfig, context)

app.get('*', (req, res) => {
  const { path } = req

  const cookie = req.get('cookie')

  const store = createStore(cookie)
  const makeCollector = initSharedCollectors(store)

  const [collectInitStore, collectPrepopulate] = [
    'initStore',
    'prepopulate',
  ].map(makeCollector)

  const initStoreApp = collectInitStore({ route: routesConfig[0] })

  const pagesConfig = routesConfig[0].routes

  const initStorePromises = pagesConfig
    .map(route => ({ route }))
    .map(collectInitStore)

  const prepopulatePromises = matchRoutes(pagesConfig, path).map(
    collectPrepopulate
  )

  Promise.all([
    initStoreApp,
    ...initStorePromises,
    ...prepopulatePromises,
  ]).then(() => {
    const context = {}

    const HTMLGenerator = createHTMLGenerator(store)

    const reactApp = reactAppGenerator(store, path)

    const html = HTMLGenerator(reactApp)

    res.status(context.status || 200).send(html)
  })

  console.log('debug', JSON.stringify(debug, null, 4))
})

app.listen(process.env.RENDERER_SERVER_PORT, openBrowser)

function initSharedCollectors(store) {
  const cached = {}

  debug.cached = cached

  return function makeCollector(staticMethodName) {
    const checkStaticMethod = check.existsAndIsFunction(staticMethodName)

    return function collectorPromise({ route }) {
      if (!checkStaticMethod(route.component)) return null
      if (
        cached.hasOwnProperty('pathy') &&
        cached[route.path].hasOwnProperty('initStore')
      )
        return null
      cached[route.path || '_app'] = staticMethodName

      const method = route.component[staticMethodName]

      const promise = method.action ? store.dispatch(method()) : method(store)

      return new Promise(resolve => {
        promise.then(resolve).catch(resolve)
      })
    }
  }
}
