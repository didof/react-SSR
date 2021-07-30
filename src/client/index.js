import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import createStore from './helpers/createStore'

import 'babel-polyfill'

import Routes from './helpers/generateRoutesConfig'

const rootElement = document.getElementById('__root')

ReactDOM.hydrate(
  <Provider store={createStore()}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  rootElement
)
