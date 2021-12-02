import api from './api'

export const listUser = payload => api
  .get(`cms/user?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const detailUser = payload => api
  .get(`cms/user/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const addUser = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('image', payload.profile_img)
  bodyFormData.append('full_name', payload.full_name)
  bodyFormData.append('email', payload.email)
  bodyFormData.append('no_wa', payload.no_wa)
  bodyFormData.append('password', payload.password)
  bodyFormData.append('username', payload.username)
  bodyFormData.append('tempat_lahir', payload.tempat_lahir)
  bodyFormData.append('tgl_lahir', payload.tgl_lahir)
  bodyFormData.append('province_id', payload.province_id)
  bodyFormData.append('city_id', payload.city_id)
  bodyFormData.append('district_id', payload.district_id)

  try {
    const response = await api
      .post('cms/user', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}

export const deleteUser = payload => api
  .delete(`cms/user/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const updateUser = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('image', payload.image)
  bodyFormData.append('_method', 'post')
  bodyFormData.append('full_name', payload.full_name)
  bodyFormData.append('email', payload.email)
  bodyFormData.append('no_wa', payload.no_wa)
  bodyFormData.append('password', payload.password)
  bodyFormData.append('username', payload.username)
  bodyFormData.append('tempat_lahir', payload.tempat_lahir)
  bodyFormData.append('tgl_lahir', payload.tgl_lahir)
  bodyFormData.append('province_id', payload.province_id)
  bodyFormData.append('city_id', payload.city_id)
  bodyFormData.append('district_id', payload.district_id)

  try {
    const response = await api.put(`cms/user/${payload.id}`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  } catch (error) {
    return error.response
  }
}

export const changePassUser = payload => api
  .post('cms/user/change-password', {
    id: payload.id,
    current_password: payload.current_password,
    new_password: payload.new_password,
    confirm_password: payload.confirm_password,
  })
  .then(response => response)
  .catch(error => error.response)
