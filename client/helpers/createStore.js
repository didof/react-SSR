import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const store = createStore(
  reducers,
  window.__INITIAL__STATE__,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
)

export default store
