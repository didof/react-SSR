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
import routesConfig from './routesGenerator'

import 'babel-polyfill'

const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
  const { path } = req

  const store = createStore()

  const collectPrepopulate = createPrepopulateCollector(store)

  const prepopulatePromises = matchPath(path).map(collectPrepopulate)

  Promise.all(prepopulatePromises).then(() => {
    const HTMLGenerator = createHTMLGenerator(store)

    const reactAppGenerator = createReactAppGenerator(store, routesConfig)

    const reactApp = reactAppGenerator(path)

    const html = HTMLGenerator(reactApp)

    res.status(200).send(html)
  })
})

app.listen(process.env.RENDERER_SERVER_PORT, openBrowser)

function createPrepopulateCollector(store) {
  const checkPrepopulate = check.existsAndIsFunction('prepopulate')

  return function collectPrepopulatePromises({ route }) {
    if (checkPrepopulate(route.component))
      return route.component.prepopulate(store)
    return null
  }
}
