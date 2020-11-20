export const is400 = (err) => isErrWithCode(err, 400)

export const is401 = (err) => isErrWithCode(err, 401)

export const is403 = (err) => isErrWithCode(err, 403)

export const is404 = (err) => isErrWithCode(err, 404)

export const is422 = (err) => isErrWithCode(err, 422)

export const is500 = (err) => isErrWithCode(err, 500)

export const hasValidationErr = (err, field) =>
  field in err.response.data.errors

export const getValidationErrArr = (err, field) =>
  err.response.data.errors[field]

export const isErrWithResAndStatus = (err) =>
  err.response && err.response.status

export const isErrWithCode = (err, code) =>
  isErrWithResAndStatus(err) && err.response.status === code
