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

import 'babel-polyfill'

const app = express()

app.use(express.static('public'))

app.get('/favicon.ico', (req, res) => {
  res.status(200).send()
})

app.get('*', (req, res) => {
  const { path } = req

  const store = createStore()

  const [collectInitStore, collectPrepopulate] = ['initStore', 'prepopulate']
    .map(makeCollector)
    .map(fn => fn(store))

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

function makeCollector(staticMethodName) {
  return function receiveStore(store) {
    const checkStaticMethod = check.existsAndIsFunction(staticMethodName)

    return function collectorPromise({ route }) {
      if (checkStaticMethod(route.component))
        return route.component[staticMethodName](store)
      return null
    }
  }
}
