import session from './sessionStorage.js'

const sessionStorage = {}
sessionStorage.install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    sessionSetItem: {
      get() {
        return (key, val) => {
          session.setItem(key, val)
        }
      }
    },
    sessionGetItem: {
      get() {
        return (key) => {
          return session.getItem(key)
        }
      }
    },
    sessionRemoveItem: {
      get() {
        return (key) => {
          session.removeItem(key)
        }
      }
    },
    sessionClear: {
      get() {
        return (key) => {
          session.clear()
        }
      }
    }
  })
}

export default sessionStorage
