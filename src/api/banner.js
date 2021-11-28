import api from './api'

// eslint-disable-next-line import/prefer-default-export
export const listBanner = payload => api
  .get(`cms/banner/list?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const detailBanner = payload => api
  .get(`cms/banner/detail/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const addBanner = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('target_url', payload.target_url)
  bodyFormData.append('created_by', payload.created_by)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .post('cms/banner/add', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}

export const deleteBanner = payload => api
  .put(`cms/banner/delete/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const updateBanner = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'post')
  bodyFormData.append('target_url', payload.target_url)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .put(`cms/banner/update/${payload.id}`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}
