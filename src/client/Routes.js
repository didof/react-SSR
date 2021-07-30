import Index from './pages/index'
import Users from './pages/users'
import { renderRoutes, matchRoutes } from 'react-router-config'

const routesConfig = [
  {
    prepopulate: () => {},
    path: '/',
    component: Index,
    exact: true,
  },
  {
    prepopulate: Users.prepopulate,
    path: '/users',
    component: Users,
    exact: false,
  },
]

export const Routes = renderRoutes(routesConfig)

export function matchPath(path) {
  return matchRoutes(routesConfig, path)
}

export default routesConfig
