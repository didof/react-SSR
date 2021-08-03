import axios from 'axios'

function initFetch(baseUrl, options) {
  return function specifyHTTPMethod(method) {
    return function exectFetch(path, data) {
      return axios[method](baseUrl + path, data, options)
    }
  }
}

const APIFetch = initFetch('http://localhost:8001', {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const api = ['get', 'post', 'put', 'patch', 'delete'].reduce(
  (api, method) => {
    api[method] = APIFetch(method)
    return api
  },
  {}
)
