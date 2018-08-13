import Vue from 'vue'
import * as filters from './filters'
// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
