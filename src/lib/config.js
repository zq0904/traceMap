import BMap from 'BMap'

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
