import api from './api'

export const allDataWithoutPaginate = () => api
  .get('/villarian/index')
  .then(response => response)
  .catch(error => error.response)

export const storeData = payload => api
  .post('/villas', {
    title: payload.title,
    villa_id: payload.villa_id,
    icon: payload.icon,
    value: payload.value,
  })
  .then(response => response)
  .catch(error => error.response)

export const updateData = payload => api
  .put(`/villas/${payload.id}`, {
    title: payload.title,
    villa_id: payload.villa_id,
    icon: payload.icon,
    value: payload.value,
  })
  .then(response => response)
  .catch(error => error.response)

export const detailData = payload => api
  .get(`/villas/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const allData = payload => api
  .get(`/villas?page=${payload.page}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteData = payload => api
  .delete(`/villas/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)
