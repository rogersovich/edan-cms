import api from './api'

export const listEducationCategory = payload => api
  .get(`cms/category/edukasi?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const detailEducationCategory = payload => api
  .get(`cms/category/edukasi/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteEducationCategory = payload => api
  .delete(`cms/category/edukasi/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const addEducationCategory = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('category_name', payload.category_name)
  bodyFormData.append('description', payload.description)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .post('cms/category/edukasi/', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}

export const updateEducationCategory = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'post')
  bodyFormData.append('category_name', payload.category_name)
  bodyFormData.append('description', payload.description)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .put(`cms/category/edukasi/${payload.id}`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}
