import axios from "axios";
import { getToken } from './auth'

function uuid() {
  const cry = window.crypto || window.msCrypto

  return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (cry.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

const axiosService = axios.create({
  baseURL: localStorage.getItem('reactAppApiUri'),
  timeout: JSON.parse(process.env['REACT_APP_AXIOS_TIMEOUT'])
});

//요청시에 처리되야하는 값들 설정
axiosService.interceptors.request.use(
  (config) => {
    config.headers['X-CloudPC-Request-ID'] = uuid()
    if (getToken()) {
      config.headers['authorization'] = getToken()
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//응답시에 처리되야하는 값들 설정
axiosService.interceptors.response.use(
  (error) => {
    return Promise.reject(error);
  }
);
