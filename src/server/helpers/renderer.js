import React from 'react'
import { renderToString } from 'react-dom/server'
import Routes from '../../client/Routes'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

function renderer(path, store) {
  const context = {}

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <div>{Routes}</div>
      </StaticRouter>
    </Provider>
  )

  return generateHTML(content)
}

function generateHTML(inject) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React SSR</title>
    </head>
    <body>
      <div id="__root">${inject}</div>
      <script src="bundle.client.js" async></script>
    </body>
    </html>
    `
}

export default renderer
