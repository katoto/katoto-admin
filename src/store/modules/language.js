import { login, logout, getInfo } from '@/api/login'
import { getCk, setCk, removeCk } from '@/utils/auth'

const language = {
  state: {
    ms_ck: getCk(),
    userinfo: null,
  },

  mutations: {
    SET_ms_ck: (state, ck) => {
      state.ms_ck = ck
    },
    setUserinfo: (state, info) => {
      state.userinfo = info
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setCk(data.ck)
          commit('SET_ms_ck', data.ck)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.ms_ck).then(response => {
          const data = response.data
          if(data){
            commit('setUserinfo', data)
          }else{
            reject('getInfo: roles must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_ms_ck', '')
        removeCk()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_ms_ck', '')
        removeCk()
        resolve()
      })
    }
  }
}

export default language
