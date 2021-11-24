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

// export const currentUser = () => api
//   .get('/users/current-user')
//   .then(response => response)
//   .catch(error => error.response)
