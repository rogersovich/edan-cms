import api from './api'

export const listEducationContent = payload => api
  .get(`cms/edukasi?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const detailEducationContent = payload => api
  .get(`cms/edukasi/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteEducationContent = payload => api
  .delete(`cms/edukasi/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const addEducationContent = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('title', payload.title)
  bodyFormData.append('category_edu', payload.category_edu)
  bodyFormData.append('description', payload.description)
  bodyFormData.append('durasi', payload.durasi)
  bodyFormData.append('edu_type', payload.edu_type)
  bodyFormData.append('point', payload.point)
  bodyFormData.append('sertifikat', payload.sertifikat)
  bodyFormData.append('amount', payload.amount)
  bodyFormData.append('status', payload.status)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .post('cms/edukasi/', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}

export const updateEducationContent = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'post')
  bodyFormData.append('title', payload.title)
  bodyFormData.append('category_edu', payload.category_edu)
  bodyFormData.append('description', payload.description)
  bodyFormData.append('durasi', payload.durasi)
  bodyFormData.append('edu_type', payload.edu_type)
  bodyFormData.append('point', payload.point)
  bodyFormData.append('sertifikat', payload.sertifikat)
  bodyFormData.append('amount', payload.amount)
  bodyFormData.append('status', payload.status)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .put(`cms/edukasi/${payload.id}`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}
