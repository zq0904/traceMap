import Vue from 'vue'
import Vuex from 'vuex'
import test from './module/test' // 测试
import api from './module/api' // 接口地址
import getters from './getters' // 派生模块路径

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { // state actions异步 mutations同步
    test,
    api
  },
  getters
})

// 热重载模块
if (module.hot) {
  module.hot.accept([
    './getters'
    // , './actions'
  ], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newGetters = require('./getters').default
    // const newActions = require('./actions').default
    // 加载新模块
    store.hotUpdate({
      getters: newGetters
      // , actions: newActions
    })
  })
}

export default store
