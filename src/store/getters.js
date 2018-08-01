// 派生模块路径 方便获取
export default {
  getTest: state => state.test, // 测试
  getApi: state => state.api, // 获取接口地址
  getPermission: state => state.permission, // 获取权限表
  getRegexp: state => state.regexp, // 获取正则校验规则
  getUserInfo: state => state.userInfo // 获取用户信息
}
