// 代理
// let p1 = '/proxy'
let p2 = '/api'
// let p3 = '/cc'

// 上线 指定代理为 p1
// p2 = p3 = p1

// 接口地址
const state = {
  login: p2 + '/oauthWeb/token', // 用户登录
  logout: p2 + '/oauthWeb/logout', // 用户登出
  weatherInfo: p2 + '/data/reTimeWeather', // 实时天气信息
  AirMap: p2 + '/data/airMap', // 空气地图
  AirMapHistory: p2 + '/data/selectHistory', // 空气地图48小时历史回放
  AirList: p2 + '/data/airList', // 空气报表
  pollutionState: p2 + '/pollutionSoil/getHandlingStatusDict', // 污染源状态列表
  pollutionType: p2 + '/pollutionSoilType/getDict', // 污染源类型列表
  pollutionMap: p2 + '/pollutionSoil/getAllList', // 污染源地图
  pollutionThreeLinkage: p2 + '/areacode/getAllList', // 污染源报表 3级联动字典
  pollutionList: p2 + '/pollutionSoil/getPageList', // 污染源报表 分页列表
  pollutionListDel: p2 + '/pollutionSoil/delete', // 污染源报表 多删除
  pollutionlistRetrieve: p2 + '/pollutionSoil/getInfo', // 污染源报表 查单个
  pollutionlistCreate: p2 + '/pollutionSoil/savePollute', // 污染源报表 添加单个
  pollutionListUploadImg: p2 + '/attach/upload', // 污染源 上传图片
  pollutionListDelImg: p2 + '/pollutionSoil/deleteAttach', // 污染源 删除图片
  traceMap: p2 + '/warn/traceSource', // 溯源地图
  alarmList: p2 + '/warn/getGkWarnPageList', // 报警规则列表
  alarmListCreate: p2 + '/warn//saveGkDeviceWarn', // 报警规则列表 新增修改保存
  alarmListDel: p2 + '/warn/deleteGkDeviceWarn', // 报警规则列表 删除
  device: p2 + '/device/getWebGkStationAll', // 报警规则 设备
  findRuleByDevice: p2 + '/warn/selectGkDWByDeviceid', // 报警规则 根据设备 查找规则
  findDeviceByRule: p2 + '/warn/selectDeviceByGkDwId', // 报警规则 根据规则 查找设备
  setLinkSave: p2 + '/warn/saveDeviceRelatedDwId' // 报警规则 设置关联 保存
}

const mutations = {}
const actions = {}

export default {
  state,
  mutations,
  actions
}
