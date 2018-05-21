import { INCREMENT, CHANGELOADING } from './mutation-types'

export default {
  increment: ({ commit }) => {
    commit(INCREMENT)
  },
  changeloading: ({ commit }, flag) => {
    commit(CHANGELOADING, flag)
  }
}
