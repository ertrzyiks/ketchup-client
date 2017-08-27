import {getUserData, setUserData, getUserAccessToken, setUserAccessToken} from './storage'
import {registerUser, exchangeRefreshToken} from './api'

export function refreshUserSession(wsApiUrl) {
  const userData = getUserData()

  if (!userData.name || !userData.refresh_token) {
    return Promise.reject('No refresh token or user name')
  }

  const userAndToken = {
    name: userData.name,
    refresh_token: userData.refresh_token
  }

  return exchangeRefreshToken(wsApiUrl, userAndToken)
    .then(({name, access_token, refresh_token}) => {
      setUserData({name, refresh_token})
      setUserAccessToken(access_token)
      return {name, access_token}
    })
}

export function retrieveUserSession(wsApiUrl) {
  const storedAccessToken = getUserAccessToken()
  const userData = storedAccessToken && getUserData()

  if (storedAccessToken && userData && userData.name) {
    return Promise.resolve({name: userData.name, access_token: storedAccessToken})
  }

  return registerUser(wsApiUrl).then(({name, access_token, refresh_token}) => {
    setUserData({name, refresh_token})
    setUserAccessToken(access_token)
    return {name, access_token}
  })
}

