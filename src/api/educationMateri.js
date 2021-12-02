import api from './api'

export const listEducationMateri = payload => api
  .get(`cms/materi?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const detailEducationMateri = payload => api
  .get(`cms/materi/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteEducationMateri = payload => api
  .delete(`cms/materi/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const addEducationMateri = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('title', payload.title)
  bodyFormData.append('edukasi_id', payload.edukasi_id)
  bodyFormData.append('description', payload.description)
  bodyFormData.append('summary', payload.summary)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api.post('cms/materi', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  } catch (error) {
    return error.response
  }
}

export const updateEducationMateri = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'post')
  bodyFormData.append('title', payload.title)
  bodyFormData.append('edukasi_id', payload.edukasi_id)
  bodyFormData.append('description', payload.description)
  bodyFormData.append('summary', payload.summary)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .put(`cms/materi/${payload.id}`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}
