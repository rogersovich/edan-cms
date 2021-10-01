import api from './api'

export const allDataWithoutPaginate = () => api
  .get('/villarian/index')
  .then(response => response)
  .catch(error => error.response)

export const storeData = async payload => {
  const bodyFormData = new FormData()
  bodyFormData.append('sub_category_id', payload.sub_category_id)
  bodyFormData.append('thumbnail', payload.thumbnail)
  bodyFormData.append('description', payload.description)
  bodyFormData.append('whatsapp_number', payload.whatsapp_number)
  bodyFormData.append('sub_district', payload.sub_district)
  bodyFormData.append('price', payload.price)
  bodyFormData.append('code', payload.code)
  bodyFormData.append('is_recommendation', payload.is_recommendation)

  await api.post('/villas', bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateData = payload => api
  .put(`/villas/${payload.id}`, {
    sub_category_id: payload.sub_category_id,
    thumbnail: payload.thumbnail,
    description: payload.description,
    whatsapp_number: payload.whatsapp_number,
    sub_district: payload.sub_district,
    price: payload.price,
    code: payload.code,
    is_recommendation: payload.is_recommendation,
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
