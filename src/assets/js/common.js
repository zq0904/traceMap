import $ from 'jquery'
import BMap from 'BMap'

// 污染物名字 转换 大写  nameUpperCase(pm25) -> PM2.5  O3_E_H -> O3-E-H
export const nameUpperCase = name => name.trim() === 'pm25' ? 'PM2.5' : name.trim().toLocaleUpperCase().replace(/_/g, '-')
// 污染物名字 转换 小写  nameLowerCase(PM2.5) -> pm25
export const nameLowerCase = name => name.trim().toLocaleLowerCase().replace(/\./g, '')
// 污染物名称(尽量小写) 转换成 颜色 AQIColor('pm25', -1)  ->  'rgb(204, 204, 204)'
export const AQIColor = (name, value) => {
  // 灰 绿 黄 橙 深橙 深粉 深紫
  const colors = ['rgb(204, 204, 204)', 'rgb(67, 206, 23)', 'rgb(255, 255, 0)', 'rgb(255, 170, 0)', 'rgb(255, 64, 26)', 'rgb(210, 0, 64)', 'rgb(156, 10, 78)']
  let array
  switch (nameLowerCase(name)) {
    case 'aqi':
      array = [0, 50, 100, 150, 200, 300, 400, 500]
      break
    case 'pm25':
      array = [0, 35, 75, 115, 150, 250, 350, 500]
      break
    case 'pm10':
      array = [0, 50, 150, 250, 350, 420, 500, 600]
      break
    case 'so2':
      array = [0, 50, 150, 475, 800, 1600, 2100, 2620]
      break
    case 'no2':
      array = [0, 100, 200, 700, 1200, 2340, 3090, 3840]
      break
    case 'co':
      array = [0, 5, 10, 35, 60, 90, 120, 150]
      break
    case 'o3':
      array = [0, 160, 200, 300, 400, 800, 1000, 1200]
      break
  }
  for (let i = 0; i < colors.length; i++) { // i最大能取到6
    if (Number(value) <= array[i]) {
      return colors[i]
    }
  }
  return colors[6]
}
// 风力数值 转换 级别  windLevel(5) -> '1级'
export const windLevel = value => {
  const level = ['0级', '1级', '2级', '3级', '4级', '5级', '6级', '7级', '8级', '9级', '10级', '11级', '12级', '12级以上']
  const number = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118, 133, 220]
  for (let i = 0; i < number.length; i++) {
    if (Number(value) < number[i]) {
      return level[i]
    }
  }
  return level[level.length]
}
// 污染物名称(尽量小写) 转换 单位  nameUnit(co)  ->  'mg/m<sup>3</sup>'  规则: aqi没有单位 co毫克 其余微克
export const nameUnit = name => {
  switch (nameLowerCase(name)) {
    case 'aqi':
      return ''
    case 'co':
      return 'mg/m<sup>3</sup>'
    default:
      return 'μg/m<sup>3</sup>'
  }
}
// jQ清空form表单 removeForm('#form1')
export const removeForm = formId => $(formId + ' :input').not(':button, :submit, :reset').val('').prop({ 'checked': false, 'selected': false })
// 调试地图 工具  debugMap(map)
export const debugMap = map => {
  map.addEventListener('dragend', e => { // 拖拽完成时触发 获取地图中心点
    const center = map.getCenter()
    console.log('地图中心点变更为:' + center.lng + ',' + center.lat)
  })
  map.addEventListener('zoomend', function () { // 缩放获取地图级别
    console.log('地图缩放至:' + this.getZoom())
  })
  map.addEventListener('click', e => { // 点击获取点击的经纬度坐标
    console.log('点击坐标为:' + e.point.lng + ',' + e.point.lat)
  })
}
// 绘制行政区   地图实例 填充色(透明) 边框颜色(粉色)
export const drawPolygon = (map, fillColor = 'rgba(0,0,0,0)', strokeColor = 'rgba(255, 0, 222, .8)') => {
  // 绘制已存在行政区
  ((str, fillColor, boolean) => {
    const bdary = new BMap.Boundary()
    bdary.get(str, function (rs) { // 获取行政区域
      if (boolean) map.clearOverlays() // 清除所有地图覆盖物
      const count = rs.boundaries.length // 行政区域定位个数
      if (count === 0) return window.alert('未能获取当前输入行政区域')
      let pointArray = []
      for (let i = 0; i < count; i++) {
        const ply = new BMap.Polygon(rs.boundaries[i], { fillColor, strokeWeight: 2, strokeColor }) // 创建多边形
        map.addOverlay(ply) // 添加覆盖物
        pointArray = pointArray.concat(ply.getPath())
      }
      // map.setViewport(pointArray) // 调整视野
    })
  })('永年区', fillColor, false) // 北京市 北京市东城区, 填充颜色, 是否清除所有的覆盖物

  // // 画圆 中心点 半径
  // map.addOverlay(new BMap.Circle(new BMap.Point(114.567165, 37.063838), 3000, {
  //   strokeColor: '#ff0000',
  //   strokeWeight: 2,
  //   strokeOpacity: 1,
  //   fillColor: '#ffffff',
  //   fillOpacity: 0.01
  // }))

  // // 绘制不存在的行政区
  // const points = [[new BMap.Point(114.534375, 37.055285)]]

  // if (typeof (points[0][0]) === 'undefined') { // 一维
  //   core(points, fillColor, strokeColor)
  // } else { // 二维
  //   if (!fillColor) {
  //     points.forEach(function (e, i) {
  //       core(e, false, strokeColor)
  //     })
  //     return false
  //   }
  //   if (fillColor[0].length === 1) { // 一维
  //     points.forEach(function (e, i) {
  //       core(e, fillColor, strokeColor)
  //     })
  //   } else { // 二维
  //     points.forEach(function (e, i) {
  //       core(e, fillColor[i], strokeColor)
  //     })
  //   }
  // }

  // function core(p, f, s) {
  //   const Polygon = new BMap.Polygon(p, { fillColor: f, strokeWeight: 2, strokeColor: s }) // 创建多边形
  //   map.addOverlay(Polygon) // 添加多边形
  // }
}
