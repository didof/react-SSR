import routesConfig from '../../server/.framework/routes.config.json'
import { renderRoutes } from 'react-router-config'

function generateRoutesConfig() {
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
  return renderRoutes(generateRoutesConfig())
}
