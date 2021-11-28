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
