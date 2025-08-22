import axios from 'axios'

const http = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
})

export { http }
