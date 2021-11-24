import api from './api'

export const login = payload => api
  .post('admin/login', {
    email: payload.email,
    password: payload.password,
  })
  .then(response => response)
  .catch(error => error.response)

export const listAdmin = () => api
  .get('admin')
  .then(response => response)
  .catch(error => error.response)

export const currentUser = () => api
  .get('/users/current-user')
  .then(response => response)
  .catch(error => error.response)
