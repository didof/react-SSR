import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import UsersList from './components/UsersList'

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/users' component={UsersList} />
    </Switch>
  )
}

export default Routes
