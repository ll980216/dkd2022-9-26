import { loginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null,
    loginForm: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setloginForm(state, loginForm) {
      state.loginForm = loginForm
    },
    // 清除token
    reomvtoken(state, token) {
      state.token = null
    },
    reomvloginForm(state, loginForm) {
      state.loginForm = {}
    }
  },
  actions: {
    async loginActions({ commit }, loginData) {
      // 接口
      const { data } = await loginAPI(loginData)
      console.log(data.token)
      commit('setToken', data.token)
      commit('setToken', data)
    }
  }
}
