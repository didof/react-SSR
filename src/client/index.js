import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'

const rootElement = document.getElementById('__root')

ReactDOM.hydrate(<Home />, rootElement)
