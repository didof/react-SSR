function existsAndIsType(type) {
  return function registerPropertyToCheck(property) {
    return function checkExistenceAndType(value) {
      return value.hasOwnProperty(property) && typeof value[property] === type
    }
  }
}

export const existsAndIsFunction = existsAndIsType('function')
