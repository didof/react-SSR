import React from 'react'
import Nav from './components/nav'
import { renderRoutes } from 'react-router-config'

function App({ route }) {
  return (
    <div>
      <header>
        <Nav />
      </header>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default App
