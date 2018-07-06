import { UPDATAUSERINFO } from '../mutation-types'
import _ from 'lodash'

const state = {
  baseInfo: {
    name: '',
    status: '',
    avatar: '',
    roles: [],
    token: window.localStorage.token || ''
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
    if (obj.baseInfo && obj.baseInfo.roles && obj.baseInfo.roles.length) {
      state.baseInfo.roles = obj.baseInfo.roles
    }
  }
}

export default {
  state,
  actions,
  mutations
}
