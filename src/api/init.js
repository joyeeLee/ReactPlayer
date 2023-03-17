import axios from 'axios' // 引入axios

// import {getUrlParam} from './util.js'
// axios.defaults.withCredentials = true; 
axios.defaults.baseURL = getBaseUrl()
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //传文件设置请求头
/**
 *获取服务器地址
 */
export function getBaseUrl() {
  let baseURL = 'http://127.0.0.1:3000/'
  // console.log(localStorage.getItem('upNewversion'))
  return baseURL
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function GET({ url, params }) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function POST( url, params,com ) {

  return new Promise((resolve, reject) => {
    axios
      .post(url, params,com)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
