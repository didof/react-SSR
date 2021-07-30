import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const store = createStore(
  reducers,
  window.__INITIAL__STATE__,
  applyMiddleware(thunk)
)

export default store
