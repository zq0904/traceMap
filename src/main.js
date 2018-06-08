// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui' // 引入element-ui
import $http from './lib/httpPlugin' // 简单封装$ftach
import sessionStorage from './lib/sessionStoragePlugin' // 兼容safari无痕模式
import formVerify from './lib/formVerify' // 自定义校验

// 引入样式
import './assets/css/reset_m.css'
import './assets/fonts/iconfont.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css' // 引入element-ui
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css' // 引入bootstrap

Vue.prototype.$http = axios // axios挂到Vue原型中
Vue.use(ElementUI)
Vue.use(VueLazyload) // 使用 :src="" 换成 v-lazy=""
Vue.use($http)
Vue.use(sessionStorage)
Vue.use(formVerify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
