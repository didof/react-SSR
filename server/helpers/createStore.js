import { createStore as createReduxStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../../client/reducers'

function createStore() {
  const store = createReduxStore(reducers, {}, applyMiddleware(thunk))

  return store
}

export default createStore
