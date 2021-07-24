import opener from 'opener'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Home from '../client/components/Home'

export function openBrowser() {
  const { PORT } = process.env
  console.info(`Listening on http://localhost:${PORT}`)
  // opener(`http://localhost:${PORT}`)
}

export default function renderer() {
  const content = renderToString(<Home />)

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
    <script src="bundle.js" async></script>
  </body>
  </html>
  `
}
