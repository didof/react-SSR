import React from 'react'
import { renderRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

export function createReactAppGenerator(routes, context) {
  return function generateApp(store, path) {
    return renderToString(
      <Provider store={store}>
        <StaticRouter location={path} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
  }
}

export function createHTMLGenerator(store) {
  const serializedInitialState = serialize(store.getState())

  return function generateHTML(app) {
    const helmet = Helmet.renderStatic()

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
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
