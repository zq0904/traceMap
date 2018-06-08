// 代理
// let p1 = '/proxy'
let p2 = '/api'
// let p3 = '/cc'

// 上线 指定代理为 p1
// p2 = p3 = p1

// 接口地址
const state = {
  weatherInfo: p2 + '/data/reTimeWeather', // 实时天气信息
  AirMap: p2 + '/data/airMap', // 空气地图
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
  traceMap: p2 + '/warn/traceSource' // 溯源地图
}

const actions = {}
const mutations = {}

export default {
  state,
  actions,
  mutations
}