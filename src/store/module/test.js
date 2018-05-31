import { MERGETEST, REPLACETESTARR } from '../mutation-types'
import _ from 'lodash'

const state = {
  testArr: [1, 2, 3],
  testInfo: {
    a: 1,
    b: '测试文本'
  }
}
// 提交异步 mutaion
const actions = {
  mergeTest: ({ commit }, ...args) => {
    commit(MERGETEST, ...args)
  },
  replaceTestArr: ({ commit }, ...args) => {
    commit(REPLACETESTARR, ...args)
  }
}

const mutations = {
  // 合并test
  [MERGETEST] (state, obj) { // state 为 局部状态
    _.merge(state, obj)
  },
  // 替换testArr
  [REPLACETESTARR] (state, obj) {
    state.testArr = obj
  }
}

export default {
  state,
  actions,
  mutations
}
