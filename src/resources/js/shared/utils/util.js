export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    hour12: false,
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

export const ellipsis = (text, max) => {
  if (!!text && text.length > max) {
    return `${text.slice(0, max)}...`
  } else {
    return text
  }
}
