// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

// 引入初始化样式
import './assets/css/reset_m.css'
import './assets/css/icon.css'

// 引入bootstrap样式
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// 完整引入 element-ui
// import ElementUI from 'element-ui'
// import '../node_modules/element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

Vue.prototype.$http = axios // axios挂到Vue原型中
Vue.use(VueLazyload) // 使用 :src="" 换成 v-lazy=""

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
