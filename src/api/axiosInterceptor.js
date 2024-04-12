import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://face.cake-bumer.uz/api',
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

export default axiosInstance
