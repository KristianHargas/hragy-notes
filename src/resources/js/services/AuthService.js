import axios from 'axios'

export const login = async function (credentials) {
  await axios.get('/sanctum/csrf-cookie')
  await axios.post('/login', credentials)
}

export const register = async function (data) {
  await axios.get('/sanctum/csrf-cookie')
  await axios.post('/register', data)
}

export const logout = async function () {
  await axios.post('/logout')
}

export const user = function () {
  return axios.get('/api/user')
}
