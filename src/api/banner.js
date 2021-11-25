import api from './api'

// eslint-disable-next-line import/prefer-default-export
export const listBanner = () => api
  .get('banner/cms/list')
  .then(response => response)
  .catch(error => error.response)

export const detailBanner = payload => api
  .get(`banner/cms/detail/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const addBanner = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('target_url', payload.target_url)
  bodyFormData.append('created_by', payload.created_by)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .post('banner/cms/add', bodyFormData, {
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
  .put(`banner/cms/delete/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const updateBanner = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'post')
  bodyFormData.append('target_url', payload.target_url)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api
      .put(`banner/cms/update/${payload.id}`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    return response
  } catch (error) {
    return error.response
  }
}
