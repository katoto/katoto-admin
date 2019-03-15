import { languageFilter, languageadd } from '@/api/language'
import { getCk, setCk, removeCk } from '@/utils/auth'

const language = {
  state: {
    aa: null,
  },

  mutations: {
    setUserinfo: (state, info) => {
      state.userinfo = info
    },
  },

  actions: {
    // 多语言
    languagePage({ commit }, obj) {
      return new Promise((resolve, reject) => {
        languageFilter(obj).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    languageAdd({commit}, data){
        return new Promise((resolve, reject)=>{
            languageadd(data).then(res =>{
                resolve(res.data)
            })
        })
    }
  }
}

export default language
