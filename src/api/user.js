import api from './api'

export const listUser = payload => api
  .get(`cms/user?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const addUser = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('full_name', payload.full_name)
  bodyFormData.append('email', payload.email)
  bodyFormData.append('no_wa', payload.no_wa)
  bodyFormData.append('password', payload.password)
  bodyFormData.append('image', payload.profile_img)
  bodyFormData.append('username', payload.username)
  bodyFormData.append('tempat_lahir', payload.tempat_lahir)
  bodyFormData.append('tgl_lahir', payload.tgl_lahir)
  bodyFormData.append('province_id', payload.province_id)
  bodyFormData.append('city_id', payload.city_id)
  bodyFormData.append('district_id', payload.district_id)
  await api
    .post('user', bodyFormData)
    .then(response => response)
    .catch(error => error.response)
}

export const deleteUser = payload => api
  .put(`user/delete/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const updateUser = payload => api
  .put(`edit/${payload.id}`, {
    name: payload.name,
    email: payload.email,
    username: payload.username,
    status: payload.status,
    role: payload.role,
  })
  .then(response => response)
  .catch(error => error.response)
