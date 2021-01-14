import Axios from 'axios'

export const index = function () {
  return axios.get('/api/checklists')
}

export const store = function (data) {
  return axios.post('/api/checklists', data)
}
