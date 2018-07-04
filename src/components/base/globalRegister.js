import Vue from 'vue'
import _ from 'lodash'

// 全局注册基础组件 这里文件名需含有Base
const requireComponent = require.context(
  './', // 其组件目录的相对路径
  true, // 是否查询子目录
  /Base[A-Z]\w+\.(vue|js)$/ // 匹配基础组件文件名的正则表达式
)

// 文件路径所组成的数组
requireComponent.keys().forEach(filePath => {
  // 获取组件配置
  const config = requireComponent(filePath)
  // 获取文件名 转 驼峰命名 在转首字母大写
  const fileName = _.upperFirst(_.camelCase(filePath.replace(/^\.\/(.*)\..+$/, '$1')))
  // 全局注册基础组件 如果这个组件通过 export default 优先使用 否则使用模块根
  Vue.component(fileName, config.default || config)
})
