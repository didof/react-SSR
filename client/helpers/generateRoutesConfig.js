import routesConfig from '../../.framework/routes.config.json'
import { renderRoutes } from 'react-router-config'
import App from '../_app'
import NotFound from '../_notFound'

function restoreConfigFromJSON() {
  return routesConfig.map(({ path, componentPath }) => {
    const component = require('../pages/' + componentPath).default
    return {
      path,
      component,
      exact: true,
    }
  })
}

export default function Routes() {
  const routes = restoreConfigFromJSON()

  routes.push({
    component: NotFound,
  })

  const wrapped = [
    {
      component: App,
      routes,
    },
  ]

  return renderRoutes(wrapped)
}
