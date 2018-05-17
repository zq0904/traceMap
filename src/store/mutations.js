import { INCREMENT } from './mutation-types'

export default {

  [INCREMENT](state) {
    state.test++
    state.testArr.push(state.test)
  }

}
