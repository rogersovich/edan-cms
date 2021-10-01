import api from './api'

export const storeData = payload => api
  .post('/sub-categories', {
    title: payload.title,
  })
  .then(response => response)
  .catch(error => error.response)

export const updateData = payload => api
  .put(`/sub-categories/${payload.id}`, {
    title: payload.title,
  })
  .then(response => response)
  .catch(error => error.response)

export const detailData = payload => api
  .get(`/sub-categories/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const allData = payload => api
  .get(`/sub-categories?page=${payload.page}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteData = payload => api
  .delete(`/sub-categories/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const listAll = () => api
  .get('/villarian/category/list-all')
  .then(response => response)
  .catch(error => error.response)
