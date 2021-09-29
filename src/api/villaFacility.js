import api from './api'

export const storeData = payload => api
  .post('/villa-facilities', {
    title: payload.title,
    villa_id: payload.villa_id,
    icon: payload.icon,
    value: payload.value,
  })
  .then(response => response)
  .catch(error => error.response)

export const updateData = payload => api
  .put(`/villa-facilities/${payload.id}`, {
    title: payload.title,
    villa_id: payload.villa_id,
    icon: payload.icon,
    value: payload.value,
  })
  .then(response => response)
  .catch(error => error.response)

export const detailData = payload => api
  .get(`/villa-facilities/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const allData = payload => api
  .get(`/villa-facilities?page=${payload.page}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteData = payload => api
  .delete(`/villa-facilities/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)
