// 实现对axios封装

import axios from "axios"

// 通过axios 创建 axios 实例
const service = axios.create({
  baseURL: '/dev',
  timeout: 5000
})
export default service