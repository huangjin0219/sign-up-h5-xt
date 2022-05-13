import Cookies from 'js-cookie'
const Userkey = 'BIM_h5_user'

export function getUser () {
  let user = Cookies.get(Userkey)
  if (user) {
    user = JSON.parse(user)
  }
  return user
}

export function setUser (user) {
  return Cookies.set(Userkey, user, { expires: 1 })
}

export function removeUser () {
  return Cookies.remove(Userkey)
}

export function getToken () {
  const user = getUser()
  return user && user.token
}
