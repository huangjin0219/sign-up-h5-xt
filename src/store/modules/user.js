import { registerOrLogin } from '@/api/user'
import { getUser, setUser } from '@/utils/auth'
const getDefaultState = () => {
  return {
    token: null
  }
}

const state = getUser() || getDefaultState()

const mutations = {
  SAVE_USER: (state, user) => {
    state.token = user.token
    state.userIdentification = user.userIdentification
    state.userNo = user.userNo
  }
}

const actions = {
  registerOrLogin ({ commit }, params) {
    const { loginType, mobile, verificationCode, bizType, appType } = params
    return new Promise((resolve, reject) => {
      registerOrLogin({ loginType, mobile, verificationCode, bizType, appType }).then(response => {
        handleLoginSuccess({ commit }, response)
        resolve(response.data)
      })
        .catch(error => {
          reject(error)
        })
    })
  }
}
const handleLoginSuccess = ({ commit }, data) => {
  const user = {
    token: data.userToken,
    userIdentification: data.userIdentification,
    userNo: data.userNo
  }
  commit('SAVE_USER', user)
  setUser(user)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
