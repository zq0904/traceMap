import { INCREMENT } from './mutation-types'

export default {

  increment: ({ commit }) => {
    commit(INCREMENT)
  }

}
