import Vue from 'vue'
import Router from 'vue-router'
import Test from '../components/test' // 测试文件
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/home/Home'
import HomePage from '../components/home/HomePage'
import Air from '../components/home/air/Air'
import AirMap from '../components/home/air/Map'
import AirList from '../components/home/air/List'
import PollutionSource from '../components/home/PollutionSource'
import TraceSource from '../components/home/TraceSource'

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
        { path: 'air',
          component: Air,
          children: [
            { path: '', component: AirMap },
            { path: 'list', component: AirList }
          ]
        },
        { path: 'pollutionSource', component: PollutionSource },
        { path: 'traceSource', component: TraceSource }
      ]
    }
  ]
})
