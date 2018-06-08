import $ from 'jquery'
import _ from 'lodash'

// 自定义表单校验
const formVerify = {}

formVerify.install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    check: { // 全局校验方法 支持非表单元素 支持多reg=","校验 支持一个 reg有2个检验规则
      get() {
        return (rootSelector, theRestSelector) => {
          const all = $(rootSelector).find(`input, select, textarea${theRestSelector ? ', ' + theRestSelector : ''}`) // 获取所有元素
          const inputArr = ['input', 'select', 'textarea']
          for (let i = 0; i < all.length; i++) {
            const item = $(all[i])
            if (!item.attr('reg') || item.attr('pass')) continue // 不存在reg 或 存在reg但有通过标识 不校验
            const keys = item.attr('reg').split(',') // 有多少个校验规则
            const val = inputArr.includes(all[i].nodeName.toLocaleLowerCase()) ? item.val().trim() : item.text() // 表单元素val() 其余text() 需要校验的字段
            for (let key of keys) {
              const obj = this.$store.state.regex[key]
              const regex = obj['reg'] // 正则表达式 可能是数组
              if (val === '') return obj['required'] // 非空校验
              if (_.isArray(regex)) {
                for (let o of regex) {
                  if (!o['reg'].test(val)) return o['tips']
                }
              } else {
                if (!regex.test(val)) return obj['tips']
              }
            }
          }
        }
      }
    }
  })
}

export default formVerify
