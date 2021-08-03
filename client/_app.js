import React from 'react'
import Nav from './components/nav'
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from './actions'

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

App.initStore = function AppInitStore(store) {
  return store.dispatch(fetchCurrentUser())
}

export default App
