import axios from 'axios'

// We use DummyJSON — free, no API key, real product data with images
// Docs: https://dummyjson.com/docs
const instance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor — attach token if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — unwrap data
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error?.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default instance