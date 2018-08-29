let p1 = '' // mock 和 生产环境
let p2 = '/api' // 代理

// 生产环境
if (process.env.NODE_ENV === 'production') p2 = p1

// 接口地址
const state = {
  login: p1 + '/oauthWeb/token', // 用户登录
  logout: p1 + '/oauthWeb/logout', // 用户登出
  weatherInfo: p1 + '/data/reTimeWeather', // 实时天气信息
  AirMap: p1 + '/data/airMap', // 空气地图
  AirMapHistory: p1 + '/data/selectHistory', // 空气地图48小时历史回放
  AirList: p1 + '/data/airList', // 空气报表
  pollutionState: p1 + '/pollutionSoil/getHandlingStatusDict', // 污染源状态列表
  pollutionType: p1 + '/pollutionSoilType/getDict', // 污染源类型列表
  pollutionMap: p1 + '/pollutionSoil/getAllList', // 污染源地图
  pollutionThreeLinkage: p1 + '/areacode/getAllList', // 污染源报表 3级联动字典
  pollutionList: p1 + '/pollutionSoil/getPageList', // 污染源报表 分页列表
  pollutionListDel: p1 + '/pollutionSoil/delete', // 污染源报表 多删除
  pollutionlistRetrieve: p1 + '/pollutionSoil/getInfo', // 污染源报表 查单个
  pollutionlistCreate: p1 + '/pollutionSoil/savePollute', // 污染源报表 添加单个
  pollutionListUploadImg: p1 + '/attach/upload', // 污染源 上传图片
  pollutionListDelImg: p1 + '/pollutionSoil/deleteAttach', // 污染源 删除图片
  traceMap: p1 + '/warn/traceSource', // 溯源地图
  alarmList: p1 + '/warn/getGkWarnPageList', // 报警规则列表
  alarmListCreate: p1 + '/warn//saveGkDeviceWarn', // 报警规则列表 新增修改保存
  alarmListDel: p1 + '/warn/deleteGkDeviceWarn', // 报警规则列表 删除
  device: p1 + '/device/getWebGkStationAll', // 报警规则 设备
  findRuleByDevice: p1 + '/warn/selectGkDWByDeviceid', // 报警规则 根据设备 查找规则
  findDeviceByRule: p1 + '/warn/selectDeviceByGkDwId', // 报警规则 根据规则 查找设备
  setLinkSave: p1 + '/warn/saveDeviceRelatedDwId' // 报警规则 设置关联 保存
}

const mutations = {}
const actions = {}

export default {
  state,
  mutations,
  actions
}
