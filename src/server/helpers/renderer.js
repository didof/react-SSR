import React from 'react'
import { renderToString } from 'react-dom/server'
import { Routes } from '../../client/Routes'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'

export function createReactAppGenerator(store) {
  return function generateApp(path) {
    const context = {}

    return renderToString(
      <Provider store={store}>
        <StaticRouter location={path} context={context}>
          <div>{Routes}</div>
        </StaticRouter>
      </Provider>
    )
  }
}

export function createHTMLGenerator(store) {
  const serializedInitialState = serialize(store.getState())

  return function generateHTML(app) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React SSR</title>
      </head>
      <body>
        <div id="__root">${app}</div>
        <script>
          window.__INITIAL__STATE__ = ${serializedInitialState}
        </script>
        <script src="bundle.client.js" async></script>
      </body>
      </html>
      `
  }
}
