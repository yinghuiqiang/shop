// 对axios进行二次封装
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:4545',
  timeout: 5000,
})

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前可以执行一些逻辑
    // 比如添加请求头、验证等
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response?.data?.data
    } else if (response.data.code === 400) {
      Promise.reject(response)
    } else {
      Promise.reject(response)
    }
    // return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
