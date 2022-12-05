import axios from 'axios'
import { getToken } from '../utils/auth'
import './reactAppConfig'

// 소스 배포 시 application.json 값 가져와서 사용
import configMap from '../../config/applicaion.json';

const isDebug = process.env.VUE_APP_DEBUG === 'true'

const LevenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  let matrix = []
  let i
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  let j
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ) // deletion
      }
    }
  }
  return matrix[b.length][a.length]
}

let postfix = ''

if (configMap['REACT_APP_API_URI_EX'] !== undefined) {
  let exScore = LevenshteinDistance(
    window.location.origin,
    configMap['REACT_APP_API_URI_EX']
  )
  let inScore = LevenshteinDistance(
    window.location.origin,
    configMap['REACT_APP_API_URI']
  )

  console.log(
    `${configMap['REACT_APP_API_URI']} : ${inScore}, ${configMap['REACT_APP_API_URI_EX']} : ${exScore}`
  )

  if (exScore < inScore) {
    postfix = '_EX'
  }
}

localStorage.setItem('reactAppDebug', configMap.REACT_APP_DEBUG)
localStorage.setItem('reactAppApiUri', configMap[`REACT_APP_API_URI${postfix}`])
localStorage.setItem(
  'reactAppRemoteUri',
  configMap[`REACT_APP_REMOTE_URI${postfix}`]
)
localStorage.setItem('reactAppFileUri', configMap[`REACT_APP_FILE_URI${postfix}`])

const axiosService = axios.create({
  baseURL: localStorage.getItem('reactAppApiUri'),
  timeout: JSON.parse(process.env['REACT_APP_AXIOS_TIMEOUT'])
})

/*
function uuid() {
  const cry = window.crypto || window.msCrypto

  return String(1e7 + 1e3 + 4e3 + 8e3 + 1e11)
    .replace(/[018]/g, (c) =>
    (c ^ (cry.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}
*/

// request interceptor
axiosService.interceptors.request.use((config) => {
  // Do something before request is sent
  if (getToken()) {
    config.headers['authorization'] = getToken()
  }
  return config
})

// respone interceptor
axiosService.interceptors.response.use(
  (res) => {
    const token = res.headers.authorization
    if (token) {
      //토큰을 설정하는 함수가 실행되어야 합니다.
    }
    res.data = res.data.data || res.data
    res.pageInfo = res.data.pageinfo || null
    return res
  },
  (error) => {
    const res = error && error.response,
      status = res && res.status,
      apiError = res && res.data && res.data.error,
      forwardCodes = error.config.forwardCodes,
      isForward =
        Array.isArray(forwardCodes) &&
        apiError &&
        forwardCodes.includes(apiError.code)

    // Timeout 이벤트 추가
    if (error.code === 'ECONNABORTED') {
      Notification.error({
        title: 'Error',
        customClass: 'error',
        dangerouslyUseHTMLString: true,
        position: 'bottom-left',
        message: '[error] 응답시간이 초과되었습니다.'
      })
      return Promise.reject(error)
    }

    if (res.config.url.indexOf('code=init') <= -1) {
      if (!isForward && status === 404 && !isDebug) {
        console.error('/404', '(로컬전용) 404 에러입니다.')
      } else if (!isForward && status > 499 && !isDebug) {
        if (apiError.code.indexOf('PLATFORM') > -1) {
          Notification.error({
            title: 'Error',
            customClass: 'error',
            dangerouslyUseHTMLString: true,
            position: 'bottom-left',
            message: apiError.comment
          })
          return Promise.reject(error)
        }
        console.error('/500', '(로컬전용) 500 에러입니다.')
      } else if (apiError) {
        if ('AGW-1003,AGW-1004,AGW-1005'.indexOf(apiError.code) > -1) {
          //이 조건문에서 로그아웃을 시켜줘야 합니다.
          Notification.warning({
            customClass: 'warning',
            dangerouslyUseHTMLString: true,
            position: 'bottom-left',
            message:
              apiError.comment || 'Verification failed, please login again'
          })
        } else if (isForward && 'RESOURCE-4000'.indexOf(apiError.code) > -1) {
          return Promise.reject(res.data.error)
        } else {
          // 당분간 AGW-1007 오류는 error 안찍음...Dashboard 오류
          // code: "AGW-1007", reason: "Internal Server Error com.netflix.zuul.exception.ZuulException", comment: "mng-ms-service.cloudpc 을 확인해주세요. "
          if ('AGW-1007'.indexOf(apiError.code) > -1) {
            console.log('AGW-1007 error')
          } else {
            const message = `${apiError.comment}`
            if (message && !isForward) {
              Notification.error({
                title: 'Error',
                customClass: 'error',
                dangerouslyUseHTMLString: true,
                position: 'bottom-left',
                message: message
              })
            } else {
              Notification.error({
                title: 'Error',
                customClass: 'error',
                dangerouslyUseHTMLString: true,
                position: 'bottom-left',
                message: message
              })
            }
          }
        }
      } else {
        console.log(res)
        console.error(
          '/500',
          '(로컬전용) API ERROR MODEL 미정의 => 담당자에게 확인 부탁 드립니다.'
        )
      }
    }
    return Promise.reject(res.data.error)
  }
)

export default axiosService
