import Cookie from 'js-Cookie'

const API_URL = process.env.API_URL
const SESSION_COOKIE_NAME = 'ketchup-session'
const SESSION_STORAGE_NAME = 'ketchup-access-token'

function getUserData() {
  const userDataRaw = Cookie.get(SESSION_COOKIE_NAME) || ''
  const userData = JSON.parse(userDataRaw)

  return userData
}

function setUserData(userData) {
  return Cookie.set(SESSION_COOKIE_NAME, JSON.stringify(userData))
}

function getUserAccessToken() {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_NAME)
  } catch (ex) {
    return null
  }
}

function setUserAccessToken(accessToken) {
  try {
    return sessionStorage.setItem(SESSION_STORAGE_NAME, accessToken)
  } catch (ex) {
    return null
  }
}

export function retrieveUserSession() {
  const storedAccessToken = getUserAccessToken()
  const userData = storedAccessToken && getUserData()

  if (storedAccessToken && userData && userData.name) {
    return Promise.resolve({name: userData.name, access_token: storedAccessToken})
  }

  return registerUser().then(({name, access_token, refresh_token}) => {
    setUserData({name, refresh_token})
    setUserAccessToken(access_token)
    return {name, access_token}
  })
}

export function registerUser() {
  return fetch(`${API_URL}/v1/users`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      return {
        name: res.user.name,
        access_token: res.token.access_token,
        refresh_token: res.token.refresh_token
      }
    })
}
