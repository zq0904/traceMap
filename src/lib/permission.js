import store from '@/store'

const permission = {}

permission.install = function (Vue) {
  // 添加全局方法 组件级权限校验 返回Boolean
  Vue.prototype.per = function (code) {
    return store.getters.getUserInfo.components.indexOf(code) !== -1
  }
  // 添加全局自定义指令 按钮级权限校验
  Vue.directive('per', {
    bind (el, binding, vnode, oldVnode) {
      if (store.getters.getUserInfo.btns.indexOf(binding.value) === -1) {
        // 无权限删除这个按钮
        el.parentNode.removeChild(el)
      }
    }
  })
}

export default permission
