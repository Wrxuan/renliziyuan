import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    RMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    RMOVE_SET_TOKEN(state) {
      state.token = null
    },
    SET_HRSAAS_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      // console.log(data)
      commit('SET_TOKEN', data)
      commit('SET_HRSAAS_TIME', new Date().getTime())
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const res1 = await getUserDetailById(res.userId)
      console.log(res1)
      const result = { ...res, ...res1 }
      console.log(result)
      commit('SET_USER_INFO', result)
      // 深拷贝解决问题
      return JSON.parse(JSON.stringify(result))
    },
    logout({ commit }) {
      // 清除本地的token和userInfo 注：在本地清除的时候还要注意缓存是否清除
      commit('RMOVE_USER_INFO')
      commit('RMOVE_SET_TOKEN')
    }
  }
}
