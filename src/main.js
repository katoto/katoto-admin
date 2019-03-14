import Vue from 'vue'
import 'normalize.css/normalize.css' // resets CSS
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import commonPlugin from './plugin/common'

// 1、 import icons 文件
// 2、 引入svg  全局组件
// 3、 通过组件props 类目进行控制加入那个icon

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */

import '../mock' // simulation data
Vue.use(ElementUI, { locale })
Vue.use(commonPlugin)

// 设置为 false 以阻止 vue 在启动时生成生产提示
// Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
