import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import { passVerify, injectRole } from './permission'
// 异步组件 懒加载路由
const Test = () => import('@/components/test') // 测试文件
const Login = () => import('@/components/Login') // 登录
const Register = () => import('@/components/Register') // 注册
const Error401 = () => import('@/components/Error401') // 没有权限页
const Error404 = () => import('@/components/Error404') // 不存在页
const Home = () => import('@/components/home/Home') // 二级路由入口
const HomePage = () => import('@/components/home/HomePage') // 首页
const AirMap = () => import('@/components/home/AirMap') // 空气地图-溯源地图
const AirList = () => import('@/components/home/AirList') // 空气列表-数据排行
const TraceSourceMap = () => import('@/components/home/TraceSourceMap') // 溯源地图-溯点地图
const AlarmRuleConfig = () => import('@/components/home/AlarmRuleConfig') // 报警规则配置
const PollutionSourceMap = () => import('@/components/home/PollutionSourceMap') // 污染源地图-溯责地图
const PollutionSourceList = () => import('@/components/home/PollutionSourceList') // 污染源列表-溯责报表
const PollutionSourcCrud = () => import('@/components/home/PollutionSourcCrud') // 污染源详情
const Permission = () => import('@/components/home/Permission') // 设置权限

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [ // 不做权限校验 常量路由
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})

// 根据权限异步加载的路由
let asyncRouterMap = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', component: HomePage, meta: { roles: ['disabled'] } },
      { path: 'air', component: AirMap, meta: { roles: ['disabled'] } },
      { path: 'air/list', component: AirList, meta: { roles: ['disabled'] } },
      { path: 'traceSource', component: TraceSourceMap, meta: { roles: ['disabled'] } },
      { path: 'alarmRuleConfig', component: AlarmRuleConfig, meta: { roles: ['disabled'] } },
      { path: 'pollutionSource', component: PollutionSourceMap, meta: { roles: ['disabled'] } },
      { path: 'pollutionSource/list', component: PollutionSourceList, meta: { roles: ['disabled'] } },
      { path: 'pollutionSource/crud', component: PollutionSourcCrud, meta: { roles: ['disabled'] } },
      { path: 'permission', component: Permission },
      { path: 'error/test', component: Test, meta: { roles: ['disabled'] } }, // 测试页
      { path: 'error/401', component: Error401 } // 局部401
    ]
  },
  // { path: '/asd', component: ASD, meta: { roles: ['disabled'], useGlobal401: true } }, // 1级路由 没有权限 根据useGlobal401字段 跳转到全局401
  { path: '/401', component: Error401 }, // 全局401
  { path: '*', component: Error404 } // 全局404
]

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 判断是否具有token
  if (store.state.userInfo.token) {
    if (to.path === '/login') return next({ path: '/' }) // 已登录直接跳转到首页
    if (store.state.userInfo.roles.length === 0) { // 没有用户信息
      // 获取用户信息
      store.dispatch('getUserInfo').then(response => {
        // 注入角色
        asyncRouterMap = injectRole(asyncRouterMap)
        // 角色方式实现的权限
        // const roles = ['admin'] // 后台返回的角色
        // const accessedRouters = roles.indexOf('admin') !== -1 ? asyncRouterMap : filterAsyncRouter(asyncRouterMap, roles) // admin具有所有权限 其余的递归过滤异步路由
        router.addRoutes(asyncRouterMap) // 动态添加可访问路由表
        next({ ...to, replace: true }) // 会重新触发路由钩子
      })
    } else { // 具有用户信息 说明已经生成过对应的路由了
      // （注入角色 1.由于现有需求 所有路由都显示 仅仅是进入页面给与提示 这里任何用户都是admin 即渲染所有路由）
      if (passVerify(store.state.userInfo.roles, to)) {
        next()
      } else {
        next({ path: to.meta.useGlobal401 ? '/401' : '/error/401' })
      }
    }
  } else {
    // 没有token除白名单外 一律重定向到登录页
    if (['/login', '/register'].indexOf(to.path) !== -1) return next()
    next({ path: '/login' })
  }
})

export default router
