import api from './api'

export const storeData = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('image', payload.image)
  bodyFormData.append('villa_id', payload.villa_id)

  await api
    .post('/villa-galeries', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
}

export const updateData = payload => api
  .put(`/villa-galeries/${payload.id}`, {
    image: payload.image,
    villa_id: payload.villa_id,
  })
  .then(response => response)
  .catch(error => error.response)

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
