import { createStore as createReduxStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../../client/reducers'
import axios from 'axios'

function createStore(cookie) {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: cookie || '',
    },
    withCredentials: true,
  })

  const store = createReduxStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  )

  return store
}

export default createStore
