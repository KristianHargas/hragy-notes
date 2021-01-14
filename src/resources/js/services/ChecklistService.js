import Axios from 'axios'

export const index = function () {
  return axios.get('/api/checklists')
}

export const store = function (data) {
  return axios.post('/api/checklists', data)
}

export const show = function (id) {
  return axios.get(`/api/checklists/${id}`)
}

export const update = function (id, data) {
  return axios.put(`/api/checklists/${id}`, data)
}

export const destroy = function (id) {
  return axios.delete(`/api/checklists/${id}`)
}
