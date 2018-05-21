import { INCREMENT, CHANGELOADING } from './mutation-types'

export default {
  [INCREMENT](state) {
    state.test++
    state.testArr.push(state.test)
  },
  [CHANGELOADING](state, flag) {
    state.loading = flag
  }
}
