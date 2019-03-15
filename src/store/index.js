import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

let modules = {}
// 第二个参数表示是否包括子目录中的文件
const modulePage = require.context('./modules', true, /\.js$/)
modulePage.keys().forEach((path)=>{
    const modulename = path.replace(/(\.\/)|(\.js$)/g, '')
    modules[modulename] = modulePage(path).default
})
const store = new Vuex.Store({
  modules: {
    ...modules
  },
  getters
})

export default store
