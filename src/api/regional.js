import api from './api'

export const listProvince = () => api
  .get('getProvinces')
  .then(response => response)
  .catch(error => error.response)

export const listCityByProvince = payload => api
  .get(`getCities?prov_id=${payload.province_id}`)
  .then(response => response)
  .catch(error => error.response)

export const listDistrictByCity = payload => api
  .get(`getDistricts?city_id=${payload.city_id}`)
  .then(response => response)
  .catch(error => error.response)
