import axios from 'axios'
import store from '../store'

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
})

api.interceptors.request.use(config => {
  // Do something before request is sent
  const authKey = store.state.auth.token
  // eslint-disable-next-line no-param-reassign
  config.headers.common['x-access-token'] = authKey

  return config
})

export default api
