import {getUserData, setUserData, getUserAccessToken, setUserAccessToken} from './storage'
import {registerUser, exchangeRefreshToken} from './api'

export function refreshUserSession(wsApiUrl) {
  const userData = getUserData()

  if (!userData.id || !userData.name || !userData.refresh_token) {
    return Promise.reject('No refresh token or user name')
  }

  const userAndToken = {
    id: userData.id,
    name: userData.name,
    refresh_token: userData.refresh_token
  }

  return exchangeRefreshToken(wsApiUrl, userAndToken)
    .then(({id, name, access_token, refresh_token}) => {
      setUserData({id, name, refresh_token})
      setUserAccessToken(access_token)
      return {id, name, access_token}
    })
}

export function retrieveUserSession(wsApiUrl) {
  const storedAccessToken = getUserAccessToken()
  const userData = storedAccessToken && getUserData()

  if (storedAccessToken && userData && userData.id && userData.name) {
    return Promise.resolve({id: userData.id, name: userData.name, access_token: storedAccessToken})
  }

  return registerUser(wsApiUrl).then(({id, name, access_token, refresh_token}) => {
    setUserData({id, name, refresh_token})
    setUserAccessToken(access_token)
    return {id, name, access_token}
  })
}

