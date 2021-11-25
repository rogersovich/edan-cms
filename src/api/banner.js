import api from './api'

// eslint-disable-next-line import/prefer-default-export
export const listBanner = () => api
  .get('banner/cms/list')
  .then(response => response)
  .catch(error => error.response)

export const addBanner = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('target_url', payload.target_url)
  bodyFormData.append('created_by', payload.created_by)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .post('banner/cms/add', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}

// export const deleteUser = payload => api
//   .put(`admin/user/delete/${payload.id}`, {})
//   .then(response => response)
//   .catch(error => error.response)

// export const updateUser = payload => api
//   .put(`admin/edit/${payload.id}`, {
//     name: payload.name,
//     email: payload.email,
//     username: payload.username,
//     status: payload.status,
//     role: payload.role,
//   })
//   .then(response => response)
//   .catch(error => error.response)
