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

export const addEducationMateri = payload => api
  .post('cms/materi', {
    title: payload.title,
    edukasi_id: payload.edukasi_id,
    description: payload.description,
    summary: payload.summary,
  })
  .then(response => response)
  .catch(error => error.response)

export const updateEducationMateri = payload => api
  .put(`cms/materi/${payload.id}`, {
    title: payload.title,
    edukasi_id: payload.edukasi_id,
    description: payload.description,
    summary: payload.summary,
  })
  .then(response => response)
  .catch(error => error.response)
