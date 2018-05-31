import Vue from 'vue'
import Router from 'vue-router'
import Test from '../components/test' // 测试文件
import Login from '../components/Login' // 登录
import Register from '../components/Register' // 注册
import Home from '../components/home/Home' // 二级路由入口
import HomePage from '../components/home/HomePage' // 首页
import AirMap from '../components/home/AirMap' // 空气地图
import AirList from '../components/home/AirList' // 空气列表
import PollutionSourceMap from '../components/home/PollutionSourceMap' // 污染源地图
import PollutionSourceList from '../components/home/PollutionSourceList' // 污染源列表
import PollutionSourceDetails from '../components/home/PollutionSourceDetails' // 污染源详情
import TraceSource from '../components/home/TraceSource' // 溯源

Vue.use(Router)

export default new Router({
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
        { path: 'pollutionSource', component: PollutionSourceMap },
        { path: 'pollutionSource/list', component: PollutionSourceList },
        { path: 'pollutionSource/details', component: PollutionSourceDetails },
        { path: 'traceSource', component: TraceSource }
      ]
    }
  ]
})
