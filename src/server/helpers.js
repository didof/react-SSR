// import opener from 'opener'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Routes from '../client/Routes'
import { StaticRouter } from 'react-router-dom'

export function openBrowser() {
  const { PORT } = process.env
  console.info(`Listening on http://localhost:${PORT}`)
  // opener(`http://localhost:${PORT}`)
}

export default function renderer(path) {
  const context = {}

  const content = renderToString(
    <StaticRouter location={path} context={context}>
      <Routes />
    </StaticRouter>
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
