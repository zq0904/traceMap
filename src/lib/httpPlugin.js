// 简单封装 axios
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'
import store from '../store'
import router from '../router'

const $httpPlugin = {}
// 初始化axios
let instance = axios.create({
  timeout: 120000 // 超时时间2分钟
})

$httpPlugin.install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return ({ url, data = {}, type = 'post' }) => {
          let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          headers = _.merge(headers, {
            // 需要额外封装进请求头中的参数
            'version': '1.0',
            't': new Date().getTime(),
            'authorization': store.state.userInfo.baseInfo.token
          })
          return instance({
            method: type,
            url: url,
            data: qs.stringify(data),
            headers: headers
          }).then(data => {
            // console.log(data)
            const status = data.data.status
            // token失效的处理 清除用户的登录信息 去登录
            if (status === 1008) {
              Vue.prototype.$message({
                message: data.data.msg,
                type: 'warning'
              })
              window.localStorage.removeItem('token')
              store.dispatch('updataUserInfo', { baseInfo: { token: '' } })
              router.push('/login')
              return false
            }
            if (status !== 1) { // 只要 status状态不为1 信息由后端指定
              Vue.prototype.$message({
                message: data.data.msg,
                type: 'warning'
              })
              return false
            }
            return data // 没有问题返回data
          }, (err) => { // 错误同一处理
            console.dir(err)
            Vue.prototype.$message.error('网络不给力，请重新尝试')
            return false
          })
        }
      }
    },
    // 处理一组http并发请求, 接回调
    axiosAll: {
      get() {
        return (httpArr) => {
          return axios.all(httpArr)
        }
      }
    }
  })
}

export default $httpPlugin
