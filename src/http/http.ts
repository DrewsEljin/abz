import axios from 'axios'
import { getToken } from './api'

const http = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
})

http.interceptors.request.use(
  async (config) => {
    let token = await getToken()
    config.headers['Token'] = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { http }
