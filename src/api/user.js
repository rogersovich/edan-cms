import api from './api'

export const listUser = () => api
  .get('admin/user')
  .then(response => response)
  .catch(error => error.response)

export const addUser = payload => api
  .post('admin/create', {
    email: payload.email,
    username: payload.username,
    name: payload.name,
    role: payload.role,
    password: payload.password,
  })
  .then(response => response)
  .catch(error => error.response)

export const deleteUser = payload => api
  .put(`admin/user/delete/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const updateUser = payload => api
  .put(`admin/edit/${payload.id}`, {
    name: payload.name,
    email: payload.email,
    username: payload.username,
    status: payload.status,
    role: payload.role,
  })
  .then(response => response)
  .catch(error => error.response)
