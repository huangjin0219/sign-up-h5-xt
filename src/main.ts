/*
 * @Author: jiangruohui
 * @Date: 2022-03-14 14:42:23
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-09-15 21:06:20
 * @Description:
 */
import { createApp } from 'vue'
import { Dialog, Lazyload, Popup, Button, Toast } from 'vant'
import SvgIcon from '@/components/SvgIcon.vue'
import router from '@/router/index'
import store from '@/store/index'
import filters from '@/common/filters'
import XTDialog from '@/components/Dialog.vue'
import XTJsBridge from '@/utils/xtJsBridge'
import '@/utils/forbidWxSetFontSize'
import App from './App.vue'
import 'lib-flexible/flexible'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(XTJsBridge)
app.use(Dialog)
app.use(Lazyload)
app.use(Popup)
app.use(Button)
app.use(Toast)
app.component('SvgIcon', SvgIcon)
app.component('XTDialog', XTDialog)

app.config.globalProperties.$filters = filters
app.mount('#app')
