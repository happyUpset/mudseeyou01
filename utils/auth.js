const TokenKey = 'Admin-Token'

export function getToken() {
  return ''
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return ''
  return localStorage.setItem(TokenKey, 'Bearer ' + token)
}

export function removeToken() {
  return ''
  return localStorage.removeItem(TokenKey)
}
