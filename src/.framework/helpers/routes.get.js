import routesConfig from '../routes.config.json'

export function getByPath(path) {
  return routesConfig.find(route => route.path === path)
}
