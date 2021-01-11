import axios from 'axios'

export const index = function () {
  return axios.get('/api/categories')
}

export const update = function (id, data) {
  return axios.put(`/api/categories/${id}`, data)
}

export const store = function (data) {
  return axios.post('/api/categories', data)
}
