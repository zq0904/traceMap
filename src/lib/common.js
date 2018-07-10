import $ from 'jquery'
import BMap from 'BMap'
import moment from 'moment'

// jQ清空form表单 removeForm('#form1')
export const removeForm = formId => $(formId + ' :input').not(':button, :submit, :reset').val('').prop({ 'checked': false, 'selected': false })
// 根据 最近天数 获取 时间段 getTimeByDay(1) -> [1531115921607, 1531202358086]
export const getTimeByDay = day => [Date.now() - 3600 * 1000 * 24 * day, Date.now()]
// 污染物名字 转换 大写  nameUpperCase(pm25) -> PM2.5  O3_E_H -> O3-E-H  无 -> 无
export const nameUpperCase = name => name.trim() === 'pm25' ? 'PM2.5' : name.trim().toLocaleUpperCase().replace(/_/g, '-')
// 污染物名字 转换 小写  nameLowerCase(PM2.5) -> pm25
export const nameLowerCase = name => name.trim().toLocaleLowerCase().replace(/\./g, '')
// 污染物名称(尽量小写) 转换成 颜色 AQIColor('pm25', -1)  ->  'rgb(204, 204, 204)'
export const AQIColor = (name, value) => {
  // 对没有数据 约定 返回 '-' 颜色处理
  if (value === '-') return 'rgb(204, 204, 204)'
  // 灰 绿 黄 橙 红 紫 褐红
  const colors = ['rgb(204, 204, 204)', 'rgb(0, 228, 0)', 'rgb(255, 255, 0)', 'rgb(255, 126, 0)', 'rgb(255, 0, 0)', 'rgb(153, 0, 76)', 'rgb(126, 0, 35)']
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
    // case 'synthesis': // 综合指数 使用 aqi规则计算
    //   array = [0, 50, 100, 150, 200, 300, 400, 500]
    //   break
  }
  for (let i = 0; i < colors.length; i++) { // i最大能取到6
    if (Number(value) <= array[i]) {
      return colors[i]
    }
  }
  return colors[6]
}
// 污染物名称(尽量小写) 转换成 类颜色 classColor('pm25', -1)  ->  'rgb-204-204-204'
export const classColor = (name, value) => {
  return AQIColor(name, value).replace(/[\s|)]/g, '').replace(/[,|(]/g, '-')
}
// 污染物名称(尽量小写) 转换成 污染等级 AQIlevel('aqi', 10)  ->  '优'
export const AQIlevel = (name, value) => {
  // 对没有数据 约定 返回 '-' 处理
  if (value === '-') return '-'
  // 级别数组
  const levels = ['-', '优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
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
    case 'synthesis': // 目前使用aqi的
      array = [0, 50, 100, 150, 200, 300, 400, 500]
      break
  }
  for (let i = 0; i < levels.length; i++) { // i最大能取到6
    if (Number(value) <= array[i]) {
      return levels[i]
    }
  }
  return levels[6]
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
      return 'mg/m³'
    default:
      return 'μg/m³'
  }
}
// 调试地图 工具  debugMap(map)
export const debugMap = map => {
  map.addEventListener('dragend', e => { // 拖拽完成时触发 获取地图中心点
    const center = map.getCenter()
    console.log('地图中心点变更为:' + center.lng + ',' + center.lat)
  })
  map.addEventListener('zoomend', e => { // 缩放获取地图级别
    console.log('地图缩放至:' + map.getZoom())
  })
  map.addEventListener('click', e => { // 点击获取点击的经纬度坐标
    console.log('点击坐标为:' + e.point.lng + ',' + e.point.lat)
  })
}
// 地图自定义样式
export const styleJson = [{
  'featureType': 'all',
  'elementType': 'all',
  'stylers': {
    'color': '#313745',
    'hue': '#313745'
  }
},
{
  'featureType': 'building',
  'elementType': 'geometry',
  'stylers': {
    'color': '#2b2b2b',
    'visibility': 'off'
  }
},
{
  'featureType': 'highway',
  'elementType': 'all',
  'stylers': {
    'lightness': -42,
    'saturation': -91,
    'visibility': 'off'
  }
},
{
  'featureType': 'water',
  'elementType': 'all',
  'stylers': {
    'color': '#222931',
    'weight': '0.6',
    'lightness': 8,
    'saturation': 20
  }
},
{
  'featureType': 'green',
  'elementType': 'geometry',
  'stylers': {
    'color': '#1b1b1b',
    'visibility': 'off'
  }
},
{
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': {
    'color': '#181818'
  }
},
{
  'featureType': 'subway',
  'elementType': 'geometry.stroke',
  'stylers': {
    'color': '#181818'
  }
},
{
  'featureType': 'railway',
  'elementType': 'geometry',
  'stylers': {
    'lightness': -52
  }
},
{
  'featureType': 'all',
  'elementType': 'labels.text.stroke',
  'stylers': {
    'color': '#313131'
  }
},
{
  'featureType': 'all',
  'elementType': 'labels.text.fill',
  'stylers': {
    'color': '#ffffff'
  }
},
{
  'featureType': 'manmade',
  'elementType': 'geometry',
  'stylers': {
    'color': '#1b1b1b'
  }
},
{
  'featureType': 'local',
  'elementType': 'geometry',
  'stylers': {
    'lightness': -75,
    'saturation': -91
  }
},
{
  'featureType': 'subway',
  'elementType': 'geometry',
  'stylers': {
    'lightness': -65
  }
},
{
  'featureType': 'railway',
  'elementType': 'all',
  'stylers': {}
},
{
  'featureType': 'boundary',
  'elementType': 'geometry',
  'stylers': {
    'color': '#8b8787',
    'weight': '0.6',
    'lightness': -29
  }
}]
// 自定义覆盖物构造函数 div类名ComplexCustomOverlay span三角类名arrow 写自定义样式
export const ComplexCustomOverlay = function (point, url, text) {
  this._point = point
  this._url = url
  this._text = text
}
ComplexCustomOverlay.prototype = new BMap.Overlay()
ComplexCustomOverlay.prototype.initialize = function (map) {
  this._map = map
  const $div = $('<div class="ComplexCustomOverlay"></div>')
  const div = this._div = $div[0]
  $div
    .css({
      'box-sizing': 'content-box',
      position: 'absolute',
      width: '150px',
      padding: '3px 3px 0',
      border: '1px solid #00A2E8',
      'border-radius': '3px',
      'background-color': '#00A2E8',
      'line-height': '18px',
      'text-align': 'center',
      color: '#000',
      'white-space': 'nowrap',
      'z-index': BMap.Overlay.getZIndex(this._point.lat)
    })
    .append('<img width="150" height="100" src="' + this._url + '">')
    .append('<p>' + this._text + '</p>')

  const $arrow = $('<span class="arrow"></span>').appendTo($div)
    .css({
      position: 'absolute',
      width: '0',
      height: '0',
      border: '10px solid transparent',
      'border-top': '10px solid #00A2E8',
      bottom: '-20px',
      left: '50%',
      transform: 'translateX(-50%)'
    })

  this._arrow = $arrow[0]

  map.getPanes().labelPane.appendChild(div)
  return div
}
ComplexCustomOverlay.prototype.draw = function () {
  const map = this._map
  const pixel = map.pointToOverlayPixel(this._point)
  this._div.style.left = pixel.x - parseInt(this._arrow.style.left) - 30 + 'px'
  this._div.style.top = pixel.y - 132 + 'px'
}
// 空气地图 提示框
export const airDetails = e => {
  // console.log(e)
  return `
  <div class="air-tooltip">
    <h4 class="air-tooltip-h4">
      ${e.name}
      <span class="air-tooltip-time">${moment(e.time).format('YYYY-MM-DD HH:mm:ss')}</span>
      <em id="AirTooltipQuestion" class="air-tooltip-em iconfont icon-wenhao"></em>
      <em id="AirTooltipCollect" class="air-tooltip-em iconfont icon-shoucangxing2 ${'on'}"></em>
    </h4>
    <table class="air-tooltip-table">
      <tr class="air-tooltip-table-tr"><td class="air-tooltip-table-td50 ${classColor('aqi', e.aqi)}" colspan="3">AQI</td><td class="air-tooltip-table-td50 ${classColor('aqi', e.aqi)}" colspan="3">综合指数</td></tr>
      <tr class="air-tooltip-table-tr"><td class="air-tooltip-table-td50" colspan="3">${e.aqi}</td><td class="air-tooltip-table-td50" colspan="3">${e.synthesis}</td></tr>
      <tr class="air-tooltip-table-tr"><td class="${classColor('pm25', e.pm25)}">PM2.5</td><td class="${classColor('pm10', e.pm10)}">PM10</td><td class="${classColor('so2', e.so2)}">SO<sub>2</sub></td><td class="${classColor('no2', e.no2)}">NO<sub>2</sub></td><td class="${classColor('co', e.co)}">CO</td><td class="${classColor('o3', e.o3)}">O<sub>3</sub></td></tr>
      <tr class="air-tooltip-table-tr tooltip-most-${e.most ? nameLowerCase(e.most) : ''}"><td>${e.pm25}</td><td>${e.pm10}</td><td>${e.so2}</td><td>${e.no2}</td><td>${e.co}</td><td>${e.o3}</td></tr>
    </table>
    <div class="tooltip-weather">
      <div class="tooltip-weather-item">
        <p class="tooltip-weather-item-p">温度: ${e.temperature}°</p>
        <p class="tooltip-weather-item-p">风向: ${e.windDirection}</p>
      </div>
      <div class="tooltip-weather-item">
        <p class="tooltip-weather-item-p">湿度: ${e.humidity}%</p>
        <p class="tooltip-weather-item-p">风速: ${e.windSpeed}m/s</p>
      </div>
      <div class="tooltip-weather-item">
        <p class="tooltip-weather-item-p">天气: ${e.weatherText}</p>
        <p class="tooltip-weather-item-p">风级: ${e.windRank}</p>
      </div>
    </div>
    <!-- highcharts渲染预留 -->
    <div id="recent24" style="height: 110px;"></div>
  </div>
  `
}
// 污染源地图 infoWindow 弹框
export const pollutionInfoWindow = e => {
  // console.log(e)
  return `
  <div class="sourceMap-infoWindow">
    <h4 class="sourceMap-infoWindow-title">基本信息</h4>
    <div class="row">
      <div class="col-sm-12"><lable>名称 :</lable><span>${e.polluteName || ''}</span></div>
    </div>
    <div class="row">
      <div class="col-sm-6"><lable>位置 :</lable><span>${e.areacode.village || e.areacode.town || e.areacode.county || ''}</span></div>
      <div class="col-sm-6"><lable>污染源类型 :</lable><span>${e.polluteTypeName}</span></div>
    </div>
    <div class="row">
      <div class="col-sm-6"><lable>经度 :</lable><span>${e.baiduLongitude}</span></div>
      <div class="col-sm-6"><lable>纬度 :</lable><span>${e.baiduLatitude}</span></div>
    </div>
    <div class="row">
      <div class="col-sm-6"><lable>开始时间 :</lable><span>${e.startTime === '-' ? '-' : e.startTime}</span></div>
      <div class="col-sm-6"><lable>结束时间 :</lable><span>${e.endTime === '3000-01-01' ? '- - - -' : e.endTime}</span></div>
    </div>
    <div class="row">
      <div class="col-sm-12"><lable>处理状态 :</lable><span>${e.handlingStatusName}</span></div>
    </div>
    <div class="row">
      <div class="col-sm-6"><lable>负责人 :</lable><span>张三</span></div>
      <div class="col-sm-6"><lable>负责主体 :</lable><span>区居委会</span></div>
    </div>
    <h4 class="sourceMap-infoWindow-title">其他信息</h4>
    <div class="row">
      <div class="col-sm-12"><lable>联系电话 :</lable><span>${e.liablePhoneNumber}</span></div>
    </div>
    <div class="row">
      <div class="col-sm-12"><lable>污染面积 :</lable><span>${e.area ? e.area + '平方米' : ''}</span></div>
    <div class="row">
      <div class="col-sm-12"><lable>位置信息补充 :</lable><span>${e.msg}</span></div></div>
    </div>
    <div class="row">
      <div class="col-sm-12"><lable>处理意见 :</lable><span>${e.advise || ''}</span></div>
    </div>
    <div class="row">
      <div class="col-sm-6"><lable>处理前照片 :</lable><span></span></div>
      <div class="col-sm-6"><lable>处理后照片 :</lable><span></span></div>
    </div>
    <div class="row">
      <div class="col-sm-6">` +
        (e => {
          let str = ''
          if (e.beforePhotoList) {
            e.beforePhotoList.forEach(item => {
              str += `<img src="${item.saveName}">`
            })
          } else { // 没有后台返回null 使用一张默认图片
            str += '<div class="mock-img"></div>'
          }
          return str
        })(e) +
      `</div>
      <div class="col-sm-6">` +
        (e => {
          let str = ''
          if (e.afterPhotoList) {
            e.afterPhotoList.forEach(item => {
              str += `<img src="${item.saveName}">`
            })
          } else { // 没有后台返回null 使用一张默认图片
            str += '<div class="mock-img"></div>'
          }
          return str
        })(e) +
      `</div>
    </div>
    <div class="row designate">
      <span>指派</span>
    </div>
  </div>
  `
}
