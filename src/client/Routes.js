import Home from './components/Home'
import UsersList from './components/UsersList'
import { renderRoutes, matchRoutes } from 'react-router-config'

const routesConfig = [
  {
    loadData: () => {},
    path: '/',
    component: Home,
    exact: true,
  },
  {
    loadData: UsersList.loadData,
    path: '/users',
    component: UsersList,
    exact: false,
  },
]

export const Routes = renderRoutes(routesConfig)

export function matchPath(path) {
  return matchRoutes(routesConfig, path)
}

export default routesConfig
