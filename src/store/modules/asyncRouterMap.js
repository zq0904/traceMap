import { UPDATAASYNCROUTERMAP } from '../mutation-types'

const state = {
  asyncRouterMap: []
}

// 提交异步 mutaion
const actions = {
  updataAsyncRouterMap: ({ commit }, ...args) => {
    commit(UPDATAASYNCROUTERMAP, ...args)
  }
}

const mutations = {
  // 更新异步路由映射
  [UPDATAASYNCROUTERMAP] (state, arr) { // state 为 局部状态
    state.asyncRouterMap = arr
  }
}

export default {
  state,
  actions,
  mutations
}
