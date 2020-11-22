import axios from 'axios'

export const store = function (data) {
  return axios.post('/api/notes', data)
}

export const index = function () {
  return axios.get('/api/notes')
}

export const show = function (id) {
  return axios.get(`/api/notes/${id}`)
}
