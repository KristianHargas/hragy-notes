export function isLoggedIn() {
  return localStorage.getItem('logged_in') == 'true'
}

export function login() {
  localStorage.setItem('logged_in', 'true')
}

export function logout() {
  localStorage.setItem('logged_in', 'false')
}
