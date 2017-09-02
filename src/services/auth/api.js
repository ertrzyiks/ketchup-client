export function exchangeRefreshToken(apiUrl, userAndToken) {
  const body = JSON.stringify(userAndToken)
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  return fetch(`${apiUrl}/v1/oauth/token`, {method: 'POST', headers, body})
    .then(res => res.json())
    .then(res => {
      console.log('ID', userAndToken, res)
      return {
        id: userAndToken.id,
        name: userAndToken.name,
        access_token: res.access_token,
        refresh_token: res.refresh_token
      }
    })
}

export function registerUser(apiUrl) {
  return fetch(`${apiUrl}/v1/users`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      return {
        id: res.user.id,
        name: res.user.name,
        access_token: res.token.access_token,
        refresh_token: res.token.refresh_token
      }
    })
}
