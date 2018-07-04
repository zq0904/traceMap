import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Test from '../components/test' // 测试文件
import Login from '../components/Login' // 登录
import Register from '../components/Register' // 注册
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

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    { path: '/test', component: Test }, // 测试文件
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/',
      component: Home,
      children: [
        { path: '', component: HomePage },
        { path: 'air', component: AirMap },
        { path: 'air/list', component: AirList },
        { path: 'traceSource', component: TraceSourceMap },
        { path: 'alarmRuleConfig', component: AlarmRuleConfig },
        { path: 'pollutionSource', component: PollutionSourceMap },
        { path: 'pollutionSource/list', component: PollutionSourceList },
        { path: 'pollutionSource/crud', component: PollutionSourcCrud }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // console.log(to, from, next)
  // if (to.path === '/login' || to.path === '/register') return next() // 登录 注册 不校验权限
  // if (store.state.userInfo.baseInfo.token === '') return router.push('/login') // 先从本地存储中拿 在从vuex中那 token 没有 去登录
  // const {data} = await Vue.prototype.$fetch({
  //   url: store.state.api.weatherInfo
  // })
  // if (data) {
  //   console.log('判断是否 具有权限')
  //   next()
  // }
  next()
})

export default router
