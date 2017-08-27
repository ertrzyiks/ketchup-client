import Cookie from 'js-Cookie'

const SESSION_COOKIE_NAME = 'ketchup-session'
const SESSION_STORAGE_NAME = 'ketchup-access-token'

export function getUserData() {
  const userDataRaw = Cookie.get(SESSION_COOKIE_NAME) || ''
  const userData = JSON.parse(userDataRaw)

  return userData
}

export function setUserData(userData) {
  return Cookie.set(SESSION_COOKIE_NAME, JSON.stringify(userData))
}

export function getUserAccessToken() {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_NAME)
  } catch (ex) {
    return null
  }
}

export function setUserAccessToken(accessToken) {
  try {
    return sessionStorage.setItem(SESSION_STORAGE_NAME, accessToken)
  } catch (ex) {
    return null
  }
}
