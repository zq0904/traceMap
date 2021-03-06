// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui' // 引入element-ui
import $http from './lib/httpPlugin' // 封装$ftach
import permission from './lib/permission' // 权限校验
import sessionStorage from './lib/sessionStoragePlugin' // 兼容safari无痕模式
import formVerify from './lib/formVerify' // 自定义校验
import './filters' // 全局注册过滤器
import './components/base/globalRegister' // 全局注册基础组件
// 引入样式
import '../node_modules/bootstrap/dist/css/bootstrap.min.css' // 引入bootstrap
import '../node_modules/swiper/dist/css/swiper.min.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css' // 引入element-ui
// import '../node_modules/moment/locale/zh-cn' // import 方式 moment国际化
import './assets/fonts/iconfont.css' // Iconfont 阿里字体图标
import './assets/css/reset_m.css'

if (process.env.NODE_ENV === 'development') require('../mock') // 开发环境 启用mockjs

Vue.use(ElementUI)
Vue.use(VueLazyload) // 使用 :src="" 换成 v-lazy=""
Vue.use($http)
Vue.use(permission)
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
