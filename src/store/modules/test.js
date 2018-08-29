import { UPDATETEST } from '../mutation-types'
import _ from 'lodash'

const state = {
  testArr: [1, 2, 3],
  testInfo: {
    a: 1,
    b: '测试文本'
  }
}

const mutations = {
  [UPDATETEST] (state, obj) { // state 为 局部状态
    // _.merge(state, obj)
    _.assign(state, obj)
  }
}

const actions = {
  updateTest: ({ commit }, ...args) => {
    commit(UPDATETEST, ...args)
  }
}

export default {
  state,
  mutations,
  actions
}
