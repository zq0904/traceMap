import { UPDATAUSERINFO, SETTOKEN } from '../mutation-types'
import Vue from 'vue'
import store from '@/store'
import _ from 'lodash'
import { setCookie, getCookie, delCookie } from '@/lib/sessionStorage'
import { getPermission } from '@/router/permission'

const state = {
  name: '',
  status: '',
  avatar: '',
  roles: [], // 角色
  token: getCookie('traceToken') || '',
  routes: [], // 转化后的 路由级别权限表
  components: [], // 用户具有的组件级权限
  btns: [] // 用户具有的按钮级权限
}

const mutations = {
  // 更新用户信息
  [UPDATAUSERINFO](state, obj) { // state 为 局部状态
    // 对象一律merge合并 数组采取替换
    _.merge(state, obj)
    if (obj.roles && obj.roles.length) {
      state.roles = obj.roles
    }
    if (obj && obj.routes && obj.routes.length) {
      state.routes = obj.routes
    }
    if (obj && obj.components && obj.components.length) {
      state.components = obj.components
    }
    if (obj && obj.btns && obj.btns.length) {
      state.btns = obj.btns
    }
  },
  // 设置token
  [SETTOKEN](state, token) {
    state.token = token
  }
}

// 提交异步 mutaion
const actions = {
  // 更新用户信息
  updataUserInfo({ commit }, ...args) {
    commit(UPDATAUSERINFO, ...args)
  },
  // 用户登录
  login({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      const {data} = await Vue.prototype.$fetch({
        url: store.getters.getApi.login,
        data: form
      })
      if (data) {
        // 登录成功 token 存储进
        const token = data.result.tokenType + ' ' + data.result.accessToken
        setCookie('traceToken', token, Date.now() + data.result.expiresIn) // token存入cookie设置过期时间
        commit(SETTOKEN, token) // token存入vuex
        resolve()
      }
    })
  },
  // 用户登出
  logout({ commit }, ...args) {
    return new Promise(async (resolve, reject) => {
      const {data} = await Vue.prototype.$fetch({ url: store.getters.getApi.logout })
      if (data) {
        delCookie('traceToken')
        commit(SETTOKEN, '')
        resolve()
      }
    })
  },
  // 获取用户信息
  getUserInfo({ commit }, ...args) {
    return new Promise(async (resolve, reject) => {
      const {data} = await Vue.prototype.$fetch({ url: store.getters.getApi.weatherInfo })
      if (data) {
        // mock
        const arr = ['990000', '990100', '990300', '990500', '990503', '010000', '020000', '030000', '040000', '050000', '060000', '070000', '080000']
        const permission = getPermission(arr) // 转化权限表
        commit(UPDATAUSERINFO, {
          roles: ['admin'],
          routes: permission.routes,
          components: permission.components,
          btns: permission.btns
        })
        resolve()
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
