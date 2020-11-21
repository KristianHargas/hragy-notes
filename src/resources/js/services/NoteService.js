import axios from 'axios'

export const store = function (data) {
  return axios.post('/api/notes', data)
}
