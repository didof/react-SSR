import { createStore as createReduxStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

function createStore() {
  const store = createReduxStore(
    reducers,
    window.__INITIAL__STATE__,
    applyMiddleware(thunk)
  )

  return store
}

export default createStore
