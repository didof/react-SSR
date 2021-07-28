import Home from './components/Home'
import UsersList from './components/UsersList'
import { renderRoutes } from 'react-router-config'

const Routes = renderRoutes([
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/users',
    component: UsersList,
    exact: false,
  },
])

export default Routes
