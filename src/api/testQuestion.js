import api from './api'

export const listTestQuestion = payload => api
  .get(`cms/ts_soal?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const detailTestQuestion = payload => api
  .get(`cms/ts_soal/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const deleteTestQuestion = payload => api
  .delete(`cms/ts_soal/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const addTestQuestion = async payload => {
  console.log(payload)
  const bodyFormData = new FormData()
  bodyFormData.append('judul_soal', payload.judul_soal)
  bodyFormData.append('id_edukasi', payload.id_edukasi)
  bodyFormData.append('pertanyaan', payload.pertanyaan)
  bodyFormData.append('answer_a', payload.answer_a)
  bodyFormData.append('answer_b', payload.answer_b)
  bodyFormData.append('answer_c', payload.answer_c)
  bodyFormData.append('answer_d', payload.answer_d)
  bodyFormData.append('kunci', payload.kunci)
  bodyFormData.append('no_soal', payload.no_soal)
  bodyFormData.append('youtube', payload.youtube)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .post('cms/ts_soal/', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}

export const updateTestQuestion = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'post')
  bodyFormData.append('judul_soal', payload.judul_soal)
  bodyFormData.append('id_edukasi', payload.id_edukasi)
  bodyFormData.append('pertanyaan', payload.pertanyaan)
  bodyFormData.append('answer_a', payload.answer_a)
  bodyFormData.append('answer_b', payload.answer_b)
  bodyFormData.append('answer_c', payload.answer_c)
  bodyFormData.append('answer_d', payload.answer_d)
  bodyFormData.append('kunci', payload.kunci)
  bodyFormData.append('no_soal', payload.no_soal)
  bodyFormData.append('youtube', payload.youtube)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .put(`cms/ts_soal/${payload.id}`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}
