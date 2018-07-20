import store from '@/store'

// 判断角色是否通过当前路由
// roles当前用户具备的角色如['admin']  route当前路由  返回Boolean
export const passVerify = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) !== -1)
  } else {
    return true
  }
}
// 递归过滤异步路由 返回符合角色权限的路由表
// asyncRouterMap所有异步路由  roles当前用户具备的角色如['admin']
export const filterAsyncRouter = (asyncRouterMap, roles) => {
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
// 根据code码数组 返回权限对象
export const getPermission = arr => {
  const routes = []
  const components = []
  const btns = []
  for (let e of arr) {
    if (store.getters.getRegexp.routesCode.test(e)) { // 路由级权限
      routes.push(store.getters.getPermission.routes[e].path)
    } else if (store.getters.getRegexp.componentCode.test(e)) { // 组件级权限
      components.push(e)
    } else { // 按钮级权限
      btns.push(e)
    }
  }
  return { routes, components, btns }
}
// 递归注入admin角色 返回注入角色后的路由
export const injectRole = asyncRouterMap => {
  let routes = store.getters.getUserInfo.routes
  return asyncRouterMap.map(route => {
    if (route.meta && route.meta.roles && (routes.indexOf(route.path) !== -1)) { // 需要权限校验的 且 有权限 注入admin角色
      route.meta.roles.push('admin')
    }
    if (route.children && route.children.length) { // 具备子路由 递归
      route.children = injectRole(route.children)
    }
    return route
  })
}
