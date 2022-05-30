export const forEach = (object = {}, callback) => {
  Object.keys(object).forEach((key) => callback(object[key], key))
}