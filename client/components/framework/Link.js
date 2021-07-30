import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { getByPath } from '../../../.framework/helpers/routes.get'
import { ReactReduxContext } from 'react-redux'

export function Link({ prepopulate, to, children }) {
  const { store } = React.useContext(ReactReduxContext)

  React.useEffect(() => {
    if (!Boolean(prepopulate)) return

    const routeConfig = getByPath(to)
    if (!routeConfig || !routeConfig.hasPrepopulate) return

    const { prepopulate: fetchData } = require('../../pages/' +
      routeConfig.componentPath).default

    fetchData(store)
  }, [])

  return <RouterLink to={to}>{children}</RouterLink>
}

export default Link
