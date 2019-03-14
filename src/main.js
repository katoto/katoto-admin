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
