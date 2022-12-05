const TokenKey = 'Admin-Token'
//세션스토리지에 토큰을 저장하는 방식으로 작성해봤습니다.
//하지만 보안상에 문제가 있겠죠 XSS공격에 취약하다는 특징이 있기 때문이죠.
//따라서 yarn add react-cookie를 통해 리액트 쿠기를 받으시고 리액트 쿠키로 토큰을 관리하는 방식을 써볼까 합니다.

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token: string) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}
