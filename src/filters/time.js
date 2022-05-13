const makeNchar = (char, n) => {
  const str = []
  while (n--) {
    str.push(char)
  }
  return str.join('')
}

const alignNumber = (num, len, char) => {
  num = num + ''
  if (num.length > len) {
    return num
  } else {
    return makeNchar(char, len - num.length) + num
  }
}

const time = (val, symbol = ':') => {
  if (!val) {
    return val
  }

  val = parseInt(val)
  const h = parseInt(val / 3600)
  const m = parseInt((val % 3600) / 60)
  const s = parseInt(val % 60)
  let time = alignNumber(m, 2, '0') + symbol + alignNumber(s, 2, '0')

  if (h > 0) {
    time = alignNumber(h, 2, '0') + symbol + time
  }
  return time
}

export default time
