import axios from 'axios'

export const index = function () {
  return axios.get('/api/categories')
}

export const store = function (data) {
  return axios.post('/api/categories', data)
}

export const show = function (id) {
  return axios.get(`/api/categories/${id}`)
}

export const update = function (id, data) {
  return axios.put(`/api/categories/${id}`, data)
}

export const destroy = function (id) {
  return axios.delete(`/api/categories/${id}`)
}
