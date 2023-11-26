import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const ApiManager = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

ApiManager.interceptors.request.use(async config => {
  return config
})

export default ApiManager
