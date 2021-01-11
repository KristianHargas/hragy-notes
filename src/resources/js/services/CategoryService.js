import axios from 'axios'

export const index = function () {
  return axios.get('/api/categories')
}
