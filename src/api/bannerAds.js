import api from './api'

export const listBannerAds = payload => api
  .get(`cms/banner_ads/list?page=${payload.page}&limit=${payload.limit}&query=${payload.query}`)
  .then(response => response)
  .catch(error => error.response)

export const detailBannerAds = payload => api
  .get(`cms/banner_ads/detail/${payload.id}`)
  .then(response => response)
  .catch(error => error.response)

export const addBannerAds = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('media_one', payload.media_one)
  bodyFormData.append('media_two', payload.media_two)
  bodyFormData.append('target_url_one', payload.target_url_one)
  bodyFormData.append('target_url_two', payload.target_url_two)
  bodyFormData.append('type_one', payload.type_one)
  bodyFormData.append('type_two', payload.type_two)
  bodyFormData.append('user_id', payload.user_id)

  try {
    const response = await api.post('cms/banner_ads/add', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  } catch (error) {
    return error.response
  }
}

export const deleteBannerAds = payload => api
  .put(`cms/banner_ads/delete/${payload.id}`, {})
  .then(response => response)
  .catch(error => error.response)

export const updateBannerAds = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('_method', 'post')
  bodyFormData.append('target_url', payload.target_url)
  bodyFormData.append('image', payload.image)

  try {
    const response = await api.put(`cms/banner_ads/update/${payload.id}`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  } catch (error) {
    return error.response
  }
}
