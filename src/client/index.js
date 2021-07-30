import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import createStore from './helpers/createStore'

import 'babel-polyfill'

import { renderRoutes } from 'react-router-config'
import routesConfig from '../server/.framework/routes.config.json'

function modulate(routesConfig) {
  return routesConfig.map(({ path, componentPath }) => {
    const component = require('./pages/' + componentPath).default
    return {
      path,
      component,
      exact: true,
    }
  })
}

const routes = modulate(routesConfig)

const rootElement = document.getElementById('__root')

ReactDOM.hydrate(
  <Provider store={createStore()}>
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>
  </Provider>,
  rootElement
)
