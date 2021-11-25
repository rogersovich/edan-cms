import api from './api'

export const login = payload => api
  .post('admin/login', {
    email: payload.email,
    password: payload.password,
  })
  .then(response => response)
  .catch(error => error.response)

export const listAdmin = payload => api
  .get(`admin?page=${payload.page}&limit=${payload.limit}`)
  .then(response => response)
  .catch(error => error.response)

export const addAdmin = payload => api
  .post('admin/create', {
    email: payload.email,
    username: payload.username,
    name: payload.name,
    role: payload.role,
    password: payload.password,
  })
  .then(response => response)
  .catch(error => error.response)

export const deleteAdmin = payload => api
  .put(`admin/delete/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const updateAdmin = payload => api
  .put(`admin/edit/${payload.id}`, {
    name: payload.name,
    email: payload.email,
    username: payload.username,
    status: payload.status,
    role: payload.role,
  })
  .then(response => response)
  .catch(error => error.response)

export const detailAdmin = payload => api
  .get(`/admin/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const changePassAdmin = payload => api
  .post('admin/change-password', {
    id: payload.id,
    current_password: payload.current_password,
    new_password: payload.new_password,
    confirm_password: payload.confirm_password,
  })
  .then(response => response)
  .catch(error => error.response)
