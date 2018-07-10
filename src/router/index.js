import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Test from '../components/test' // 测试文件
import Login from '../components/Login' // 登录
import Register from '../components/Register' // 注册
import Error401 from '../components/Error401' // 没有权限页
import Error404 from '../components/Error404' // 不存在页
import Home from '../components/home/Home' // 二级路由入口
import HomePage from '../components/home/HomePage' // 首页
import AirMap from '../components/home/AirMap' // 空气地图
import AirList from '../components/home/AirList' // 空气列表
import TraceSourceMap from '../components/home/TraceSourceMap' // 溯源地图
import AlarmRuleConfig from '../components/home/AlarmRuleConfig' // 报警规则配置
import PollutionSourceMap from '../components/home/PollutionSourceMap' // 污染源地图
import PollutionSourceList from '../components/home/PollutionSourceList' // 污染源列表
import PollutionSourcCrud from '../components/home/PollutionSourcCrud' // 污染源详情

Vue.use(Router)

// 不做权限校验 常量路由
const contantRouterMap = [
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new Router({
  linkActiveClass: 'active',
  routes: contantRouterMap
})

// 根据权限异步加载的路由
export const asyncRouterMap = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', component: HomePage, meta: { roles: ['disabled', 'admin'] } },
      { path: 'air', component: AirMap, meta: { roles: ['disabled', 'admin'] } },
      { path: 'air/list', component: AirList, meta: { roles: ['disabled', 'admin'] } },
      { path: 'traceSource', component: TraceSourceMap, meta: { roles: ['disabled', 'admin'] } },
      { path: 'alarmRuleConfig', component: AlarmRuleConfig, meta: { roles: ['disabled', 'admin'] } },
      { path: 'pollutionSource', component: PollutionSourceMap, meta: { roles: ['disabled', 'admin'] } },
      { path: 'pollutionSource/list', component: PollutionSourceList, meta: { roles: ['disabled', 'admin'] } },
      { path: 'pollutionSource/crud', component: PollutionSourcCrud, meta: { roles: ['disabled', 'admin'] } },
      { path: 'error/test', component: Test }, // 测试页
      { path: 'error/401', component: Error401 } // 局部401
    ]
  },
  // { path: '/asd', component: ASD, meta: { roles: ['disabled'], useGlobal401: true } }, // 1级路由 没有权限 根据useGlobal401字段 跳转到全局401
  { path: '/401', component: Error401 }, // 全局401
  { path: '*', component: Error404 } // 全局404
]

// 递归过滤异步路由 返回复合角色权限的路由表
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (passVerify(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 判断角色是否通过当前路由
function passVerify(roles, route) { // ['admin'] 当前路由
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) !== -1)
  } else {
    return true
  }
}

router.beforeEach(async (to, from, next) => {
  // console.log(to, from, next)
  // 判断是否具有token
  if (store.state.userInfo.baseInfo.token) {
    if (to.path === '/login') return next({ path: '/' })
    if (store.state.userInfo.baseInfo.roles.length === 0) { // 没有用户信息 请求用户信息
      const {data} = await Vue.prototype.$fetch({ url: store.getters.getApi.weatherInfo })
      // （code转角色 1.由于现有需求 所有路由都显示 仅仅是进入页面给与提示 这里任何用户都是admin 即渲染所有路由）
      const roles = ['admin']
      store.dispatch('updataUserInfo', { // 更新vuex用户信息
        baseInfo: {
          roles: roles
        }
      })
      // admin具有所有权限 其余的递归过滤异步路由
      const accessedRouters = roles.indexOf('admin') !== -1 ? asyncRouterMap : filterAsyncRouter(asyncRouterMap, roles)
      store.dispatch('updataAsyncRouterMap', accessedRouters) // 更新异步路由映射 为模块化做准备 方便调试
      router.addRoutes(accessedRouters) // 动态添加可访问路由表
      next({ ...to, replace: true }) // 会重新触发路由钩子 replace: true 导航不会留下历史记录
    } else { // 具有用户信息 说明已经生成过对应的路由了
      // （code转角色 1.由于现有需求 所有路由都显示 仅仅是进入页面给与提示 这里任何用户都是admin 即渲染所有路由）
      if (passVerify(store.state.userInfo.baseInfo.roles, to)) {
        next()
      } else {
        next({ path: to.meta.useGlobal401 ? '/401' : '/error/401', replace: true })
      }
    }
  } else {
    // 没有token除白名单外 一律重定向到登录页
    if (['/login', '/register'].indexOf(to.path) !== -1) return next()
    next({ path: '/login' })
  }
})

export default router
