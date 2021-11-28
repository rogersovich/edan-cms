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
