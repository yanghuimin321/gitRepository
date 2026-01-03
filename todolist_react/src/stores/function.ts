//localStorage调用
const localEvent = function (item) {
  this.get = function () {
    return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
  }
  this.set = function (obj) {
    localStorage.setItem(item, JSON.stringify(obj))
  }
  this.clear = function () {
    localStorage.removeItem(item)
  }
}
export const local = new localEvent('yhm_notepad')
export const theme_local = new localEvent('yhm_theme')

export const getDate = function () {
  const date = new Date()
  const month = date.getMonth() + 1
  return date.getFullYear() + '-' + month + '-' + date.getDate()
}
