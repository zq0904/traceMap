import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  test: 0,
  testArr: [],
  loading: false
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 热重载模块
if (module.hot) {
  module.hot.accept([
    './getters', './mutations', './actions'
  ], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newGetters = require('./getters').default
    const newMutations = require('./mutations').default
    const newActions = require('./actions').default
    // 加载新模块
    store.hotUpdate({
      getters: newGetters,
      mutations: newMutations,
      actions: newActions
    })
  })
}

export default store
