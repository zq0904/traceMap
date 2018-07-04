import { UPDATAUSERINFO } from '../mutation-types'
import _ from 'lodash'

const state = {
  baseInfo: {
    token: ''
  }
}

// 提交异步 mutaion
const actions = {
  updataUserInfo: ({ commit }, ...args) => {
    commit(UPDATAUSERINFO, ...args)
  }
}

const mutations = {
  // 更新用户信息
  [UPDATAUSERINFO] (state, obj) { // state 为 局部状态
    _.merge(state, obj)
  }
}

export default {
  state,
  actions,
  mutations
}
