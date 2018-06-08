import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test' // 测试
import api from './modules/api' // 接口地址
import regex from './modules/regex' // 正则校验规则
import getters from './getters' // 派生模块路径

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { // state actions异步 mutations同步
    test,
    api,
    regex
  },
  getters
})

// 热重载模块
if (module.hot) {
  module.hot.accept([
    './getters'
    // ,
    // './modules/test'
  ], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newGetters = require('./getters').default
    // const newModuleTest = require('./modules/test').default
    // 加载新模块
    store.hotUpdate({
      getters: newGetters
      // ,
      // modules: {
      //   test: newModuleTest
      // }
    })
  })
}

export default store
