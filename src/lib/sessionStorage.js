// safari手机开启无痕模式 localStroage，sessionStorage虽然存在但是不让使用
// 不支持则保存到cookie中

// 添加cookie
function addCookie(name, value) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + 50 * 365)
  document.cookie = name + '=' + escape(value) + ';expires=' + exdate.toGMTString()
}
// 获取cookie
function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}
// 删除cookie
function delCookie(name) {
  if (getCookie(name) !== null) {
    document.cookie = name + '=;'
  }
}
export default {
  prefix: 'sessionStorage_', // 区分是因为 不支持才存入cookie中的sessionStorage
  localOk: function() {
    let localOk = true // 支持本地存储
    try {
      sessionStorage.setItem1('sessionStorageTest', 'test')
      sessionStorage.removeItem('sessionStorageTest')
    } catch (e) {
      // window.alert(e)
      localOk = false
    }
    return localOk
  },
  setItem: function(key, val) {
    this.localOk() ? sessionStorage.setItem(key, val) : addCookie(this.prefix + key, val)
  },
  getItem: function(key) {
    return (this.localOk() ? sessionStorage.getItem(key) : getCookie(this.prefix + key)) || null
  },
  removeItem: function(key) {
    this.localOk() ? sessionStorage.removeItem(key) : delCookie(this.prefix + key)
  },
  clear: function() {
    if (this.localOk()) {
      sessionStorage.clear()
    } else {
      const arr = document.cookie.split(';')
      for (let i = 0; i < arr.length; i++) {
        const name = arr[i].split('=')[0].trim()
        if (name.indexOf(this.prefix) === 0) {
          delCookie(name)
        }
      }
    }
  }
}
