const phone = (str) => {
  if (str !== null && str !== undefined) {
    var pat = /(\d{3})\d*(\d{4})/
    return str.replace(pat, '$1****$2')
  } else {
    return ''
  }
}

export default phone
