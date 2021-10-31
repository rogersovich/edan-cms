import api from './api'

export const storeData = async payload => {
  await api
    .post('/villa-galeries', payload)
}

export const updateData = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'put')
  bodyFormData.append('image', payload.thumbnail)
  bodyFormData.append('new_image', payload.new_image)
  bodyFormData.append('villa_id', payload.villa_id)
  await api.post(`/villa-galeries/${payload.id}`, bodyFormData)
}

export const detailData = payload => api
  .get(`/villa-galeries/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const allData = payload => api
  .get(`/villa-galeries?page=${payload.page}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteData = payload => api
  .delete(`/villa-galeries/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)
