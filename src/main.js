import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/filters'
import 'lib-flexible/flexible.js'
import '@/styles/index.scss'
import { Toast, Dialog, Lazyload } from 'vant'
import Vconsole from 'vconsole'
import './permission.js' // 权限

Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Lazyload)
Vue.config.productionTip = false

// 非生产环境打印
if (process.env.NODE_ENV !== 'production') {
  const vConsole = new Vconsole()
  Vue.use(vConsole)
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
