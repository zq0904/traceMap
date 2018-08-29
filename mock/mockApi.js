import Mock, { Random } from 'mockjs'

// 用户登录
Mock.mock("/oauthWeb/token", 'post', {
  msg: "登录成功",
  referer: null,
  result: {
    accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDMxM2QzOGZlOTQ0N2NlODYzZmU4NTg0NzQzYTAxMCIsInN1YiI6ImFkbWluIiwiYXVkIjoiMDM1NmE2OWQtYjlmOS00OWE1LTgwNDYtNTE2YTAyNjQwMGM0IiwiZXhwIjoxNTM1NjA4OTg2LCJuYmYiOjE1MzU1MjI1ODZ9.C-aC3ZNyix5li88iovGEGdNfEdRiNkj_rCa7s4Sabq4",
    expiresIn: 86400000,
    tokenType: "Bearer"
  },
  state: "success",
  status: 1
})

// 实时天气信息
Mock.mock("/data/reTimeWeather", 'post', {
  msg: "请求成功",
  referer: null,
  result: {
    humidity: "60",
    temperature: "30.4",
    time: "2018-08-29 13:40:00",
    weatherText: "多云",
    windDirection: "东北风",
    windRank: "3级",
    windSpeed: "4.4"
  },
  state: "success",
  status: 1
})

// 空气地图
Mock.mock("/data/airMap", 'post', {
  msg: "请求成功",
  referer: null,
  result: {
    alarm: [
      { aqi: 124, co: "0.7", dtype: "国控", full_name: "-1", humidity: "60", id: "ZQ00000890002168", lat: "36.78283", lon: "114.49659", most: "PM2.5", name: "永年政府宾馆", no2: "21", o3: "211", pm10: "116", pm25: "94", so2: "21", station: "ZQ00000890002168", status: 1, street: "永年县", synthesis: "6.72", temperature: "31.2", text: "预警中", time: "2018-08-29 13:00:00", weatherText: "多云", windDirection: "东北风", windRank: "微风", windSpeed: "3.1" }
    ],
    gridding: [
      { aqi: "110", city: "邯郸市", co: "0.6", deviceId: "HEBEIYN000015969", dtype: "altas", full_name: "-1", humidity: "58", lat: "36.776111724", lon: "114.495704179", most: "PM2.5", name: "邯郸市 · 永年政府宾馆", no2: "13", o3: "88", pm10: "76", pm25: "83", so2: "9", status: "3", synthesis: "4.63", temperature: "30.7", time: "2018-07-31 09:00:00", weatherText: "多云", windDirection: "东北风", windRank: "3级", windSpeed: "3.8" },
      { aqi: "59", city: "邯郸市", co: "0.7", deviceId: "HEBEIYN000015992", dtype: "altas", full_name: "-1", humidity: "58", lat: "36.7593798909", lon: "114.492040693", most: "PM2.5", name: "邯郸市 · 永年通兴轧钢北侧 1916", no2: "22", o3: "79", pm10: "47", pm25: "42", so2: "13", status: "3", synthesis: "3.31", temperature: "30.7", time: "2018-07-31 09:00:00", weatherText: "多云", windDirection: "东北风", windRank: "3级", windSpeed: "3.8" },
      { aqi: "90", city: "邯郸市", co: "0.8", deviceId: "HEBEIYN000025105", dtype: "altas", full_name: "-1", humidity: "58", lat: "36.819049425337", lon: "114.53635514959", most: "PM2.5", name: "邯郸市 · 恒创2 3309", no2: "33", o3: "68", pm10: "103", pm25: "67", so2: "12", status: "3", synthesis: "5.02", temperature: "30.7", time: "2018-07-31 09:00:00", weatherText: "多云", windDirection: "东北风", windRank: "3级", windSpeed: "3.8" }
    ],
    state: [
      { aqi: 108, co: "0.6", dtype: "国控", full_name: "-1", humidity: "60", id: "1047A", lat: "36.623635684105", lon: "114.52529151114", most: "O3", name: "环保局", no2: "8", o3: "215", pm10: "88", pm25: "41", so2: "11", station: "1047A", status: 1, street: "邯山区", synthesis: "4.3", temperature: "31.2", time: "2018-08-29 13:00:00", weatherText: "多云", windDirection: "东北风", windRank: "微风", windSpeed: "3.1" },
      { aqi: 101, co: "0.8", dtype: "国控", full_name: "-1", humidity: "60", id: "1048A", lat: "36.622166369973", lon: "114.55493951134", most: "O3", name: "东污水处理厂", no2: "10", o3: "201", pm10: "75", pm25: "41", so2: "13", station: "1048A", status: 1, street: "邯郸县", synthesis: "4.17", temperature: "31.2", time: "2018-08-29 13:00:00", weatherText: "多云", windDirection: "东北风", windRank: "微风", windSpeed: "3.1" },
      { aqi: 105, co: "0.8", dtype: "省控", full_name: "-1", humidity: "60", id: "ZQ00000890033389", lat: "36.617", lon: "114.45", most: "O3", name: "复兴区第十中学", no2: "16", o3: "209", pm10: "111", pm25: "54", so2: "15", station: "ZQ00000890033389", status: 1, street: "复兴区", synthesis: "5.29", temperature: "31.2", time: "2018-08-29 13:00:00", weatherText: "多云", windDirection: "东北风", windRank: "微风", windSpeed: "3.1" }
    ]
  },
  state: "success",
  status: 1
})

// 空气地图48小时历史回放
Mock.mock("/data/selectHistory", 'post', {
  msg: "请求成功",
  result: [{
    alarm: [],
    gridding: [
      { address: "永年区临洺关镇", aqi: 51, autoid: 947775, ci: 1.5, city: "邯郸市", co: -1, deviceId: "HEBEIYN000018019", district: "永年区", dtype: "ATLAS3.0", humidity: 71, lat: 36.7740448636, lon: 114.51655139, most: "PM2.5", name: "河北省.永年区临洺关镇", no2: -1, o3: -1, pOut: 996, pm10: -1, pm25: 36, so2: 28, synthesis: 1.5, temperature: 24.1, time: 1535389200000, weatherText: "晴", windDirection: "西北风", windRank: "微风", windSpeed: 2.1 },
      { address: "永年区刘营镇", aqi: 70, autoid: 947776, ci: 2.61, city: "邯郸市", co: -1, deviceId: "HEBEIYN000018020", district: "永年区", dtype: "ATLAS3.0", humidity: 71, lat: 36.8153064207, lon: 114.596476089, most: "PM2.5", name: "河北省.永年区刘营镇", no2: -1, o3: -1, pOut: 996, pm10: -1, pm25: 51, so2: 69, synthesis: 2.61, temperature: 24.1, time: 1535389200000, weatherText: "晴", windDirection: "西北风", windRank: "微风", windSpeed: 2.1 },
      { address: "永年区西苏乡", aqi: 51, autoid: 947793, ci: 1.31, city: "邯郸市", co: -1, deviceId: "HEBEIYN000018122", district: "永年区", dtype: "ATLAS3.0", humidity: 71, lat: 36.7649020656, lon: 114.569247148, most: "PM2.5", name: "河北省.永年区西苏乡", no2: -1, o3: -1, pOut: 996, pm10: -1, pm25: 36, so2: 17, synthesis: 1.31, temperature: 24.1, time: 1535389200000, weatherText: "晴", windDirection: "西北风", windRank: "微风", windSpeed: 2.1 }
    ],
    state: [
      { address: "邯山区", aqi: 60, ci: 4.18, city: "邯郸", co: 0.7, deviceId: "1047A", district: "邯山区", dtype: "national", humidity: 86, lat: 36.623635684105, lon: 114.52529151114, most: "pm10", name: "河北省.环保局", no2: 27, o3: 152, pOut: 1001, pm10: 69, pm25: 39, so2: 16, status: "W00", synthesis: 4.18, temperature: 22.5, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 },
      { address: "邯郸县", aqi: 69, ci: 4.7, city: "邯郸", co: 0.9, deviceId: "1048A", district: "邯郸县", dtype: "national", humidity: 86, lat: 36.622166369973, lon: 114.55493951134, most: "pm10", name: "河北省.东污水处理厂", no2: 39, o3: 116, pOut: 1001, pm10: 87, pm25: 38, so2: 27, status: "W00", synthesis: 4.7, temperature: 22.5, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 },
      { address: "邯郸", aqi: 66, ci: 3.76, city: "邯郸", co: 0.8, deviceId: "邯郸", district: "邯郸", dtype: "national", humidity: 86, lat: 36.623635684105, lon: 114.52529151114, most: "pm10", name: "河北省.邯郸", no2: 34, o3: -1, pOut: 1001, pm10: 82, pm25: 40, so2: 24, status: "W00", synthesis: 3.76, temperature: 22.5, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 }
    ]
  }],
  state: "success",
  status: 1
})

// 空气报表
Mock.mock("/data/airList", 'post', {
  msg: "操作成功",
  result: [
    { aqi: 93, ci: 5.85, co: 1.1, most: "PM2.5", no2: 36, o3: 87, pm10: 128, pm25: 69, so2: 20, station: { checkValueInNr: 0, checkValueOutNr: 0, dname: "环保局", status: 0 } },
    { aqi: 77, ci: 4.94, co: 1, most: "PM10", no2: 24, o3: 102, pm10: 103, pm25: 56, so2: 23, station: { checkValueInNr: 0, checkValueOutNr: 0, dname: "魏县第一完小康疃分校", status: 0 } },
    { aqi: 90, ci: 5.73, co: 1.4, most: "PM2.5", no2: 27, o3: 99, pm10: 111, pm25: 67, so2: 35, station: { checkValueInNr: 0, checkValueOutNr: 0, dname: "香泉濮院小区", status: 0 } }
  ],
  state: "success",
  status: 1
})

// 溯源地图
Mock.mock("/warn/traceSource", 'post', {
  msg: "请求成功",
  referer: null,
  result: [
    {
      aqi: 124,
      co: "0.7",
      dtype: "国控",
      full_name: "-1",
      humidity: "58",
      id: "ZQ00000890002168",
      lat: "36.78283",
      lon: "114.49659",
      most: "PM2.5",
      name: "永年政府宾馆",
      no2: "21",
      o3: "211",
      pm10: "116",
      pm25: "94",
      relevance: [
        {
          advise: null,
          afterDisposePhotoUrl: "",
          afterPhotoList: null,
          areaCode: "130429100218",
          areacode: { areaCode: "130429100218", areaName: null, children: null, city: "邯郸市", cityCode: "4", county: "永年县", countyCode: "29", province: "河北省", provinceCode: "13", town: "临洺关镇", townCode: "100", village: "施庄村委会", villageCode: "218" },
          baiduLatitude: 36.788114,
          baiduLongitude: 114.516785,
          beforeDisposePhotoUrl: "74",
          beforePhotoList: null,
          distance: 1894.1123569481065,
          endTime: "2018-06-13",
          gpsLatitude: null,
          gpsLongitude: null,
          handlingStatus: "1",
          handlingStatusName: null,
          influenceFactor: null,
          liablePerson: "住建局",
          liablePhoneNumber: "。",
          liableSubject: "住建局",
          limit: 10,
          msg: "健康东大街与中华大街交叉口,实验高中东北方向。有道路维修,未发现抑制扬尘措施。↵距离省控点1.5公里。",
          offset: 0,
          polluteId: 127,
          polluteName: "实验高中-A1",
          polluteTypeId: 1,
          polluteTypeName: null,
          startTime: "2018-06-07",
          time: 1528968896000
        },
        {
          advise: null,
          afterDisposePhotoUrl: "",
          afterPhotoList: null,
          areaCode: "130429100218",
          areacode: { areaCode: "130429100218", areaName: null, children: null, city: "邯郸市", cityCode: "4", county: "永年县", countyCode: "29", province: "河北省", provinceCode: "13", town: "临洺关镇", townCode: "100", village: "施庄村委会", villageCode: "218" },
          baiduLatitude: 36.788213,
          baiduLongitude: 114.516133,
          beforeDisposePhotoUrl: "212",
          beforePhotoList: null,
          distance: 1842.5002225619846,
          endTime: "2018-06-24",
          gpsLatitude: null,
          gpsLongitude: null,
          handlingStatus: "2",
          handlingStatusName: null,
          influenceFactor: null,
          liablePerson: "住建局",
          liablePhoneNumber: "1",
          liableSubject: "住建局",
          limit: 10,
          msg: "健康东大街与中华北大街交叉口西北角，距离实验中学省控站点1.2公里。↵问题描述：裸土苫盖不严，请相关部门立即安排人进行完全覆盖。",
          offset: 0,
          polluteId: 199,
          polluteName: "实验高中086",
          polluteTypeId: 1,
          polluteTypeName: null,
          startTime: "2018-06-24",
          time: 1529837028000
        }
      ],
      so2: "21",
      station: "ZQ00000890002168",
      status: 1,
      street: "永年县",
      synthesis: "7.17",
      temperature: "31.1",
      text: "预警中",
      time: "2018-08-29 13:00:00",
      weatherText: "多云",
      windDirection: "东北风",
      windRank: "3级",
      windSpeed: "4.3"
    }
  ],
  state: "success",
  status: 1
})

// 报警规则 设备
Mock.mock("/device/getWebGkStationAll", 'post', {
  msg: "加载成功",
  referer: null,
  result: [
    {
      address: "邯山区",
      checkValueInNr: 0,
      checkValueOutNr: 0,
      city: "邯郸",
      cityId: null,
      deviceWarnData: null,
      deviceid: "1047A",
      district: "邯山区",
      dname: "环保局",
      dtype: "national",
      endTimeStamp: null,
      gkHourData: { aqi: 108, aqid: null, ci: 4.3, co: 0.6, deviceid: "1047A", mData: null, most: "o3", no2: 8, o3: 215, pm10: 88, pm25: 41, so2: 11, station: null, status: "W00", time: 1535518800000 },
      installtime: 1420070400000,
      lat: 36.623635684105,
      lon: 114.52529151114,
      poitype: null,
      province: "河北省",
      startTimeStamp: null,
      status: 0,
      street: null
    },
    {
      address: "永年县",
      checkValueInNr: 0,
      checkValueOutNr: 0,
      city: "邯郸",
      cityId: null,
      deviceWarnData: null,
      deviceid: "ZQ00000890033394",
      district: "永年县",
      dname: "永年河工大洺关校区",
      dtype: "province",
      endTimeStamp: null,
      gkHourData: { aqi: 120, aqid: null, ci: 5.85, co: 0.5, deviceid: "ZQ00000890033394", mData: null, most: "o3", no2: 21, o3: 239, pm10: 111, pm25: 60, so2: 25, station: null, status: "W00", time: 1535518800000 },
      installtime: 1524096000000,
      lat: 36.754,
      lon: 114.475,
      poitype: null,
      province: "河北省",
      startTimeStamp: null,
      status: 0,
      street: null
    }
  ],
  state: "success",
  status: 1
})

// 报警规则列表
Mock.mock("/warn/getGkWarnPageList", 'post', {
  msg: "加载成功",
  referer: null,
  result: {
    AirParam: { 1: "PM2.5", 2: "PM10", 3: "SO2", 4: "NO2", 5: "O3", 6: "CO", 7: "AQI" },
    Warns: { 1: "相对", 2: "绝对", 3: "断线" },
    pageInfo: {
      endRow: 6,
      firstPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      isFirstPage: true,
      isLastPage: true,
      lastPage: 1,
      list: [
        { absoluteLimit: 40, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530717170000, dwDeviceid: "HEBEI01304000101", dwId: 33, dwName: "优（一级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 1, offset: 0, relativeLimit: null, upperLimit: 35, wrStatus: null },
        { absoluteLimit: 40, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530613414000, dwDeviceid: "HEBEI01304000101", dwId: 34, dwName: "良（二级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 36, offset: 0, relativeLimit: null, upperLimit: 75, wrStatus: null },
        { absoluteLimit: 40, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530613416000, dwDeviceid: "HEBEI01304000101", dwId: 35, dwName: "轻度（三级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 76, offset: 0, relativeLimit: null, upperLimit: 115, wrStatus: null },
        { absoluteLimit: 50, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530613419000, dwDeviceid: "HEBEI01304000101", dwId: 36, dwName: "中度（四级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 116, offset: 0, relativeLimit: null, upperLimit: 150, wrStatus: null },
        { absoluteLimit: 50, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530613422000, dwDeviceid: "HEBEI01304000101", dwId: 37, dwName: "重度（五级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 151, offset: 0, relativeLimit: null, upperLimit: 250, wrStatus: null },
        { absoluteLimit: 50, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530613425000, dwDeviceid: "HEBEI01304000101", dwId: 38, dwName: "严重（六级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 251, offset: 0, relativeLimit: null, upperLimit: 500, wrStatus: null }
      ],
      navigatePages: 8,
      navigatepageNums: [1],
      nextPage: 0,
      orderBy: null,
      pageNum: 1,
      pageSize: 9999,
      pages: 1,
      prePage: 0,
      size: 6,
      startRow: 1,
      total: 6
    },
    queryParam: { absoluteLimit: null, checkMinCount: 0, deiceMap: null, dwCreateTime: null, dwDeviceid: null, dwId: null, dwName: null, dwParam: null, dwParamStr: null, dwReserve1: null, dwReserve2: null, dwTime: null, dwType: null, dwTypeStr: null, isDwCount: null, limit: 9999, lowerLimit: null, offset: 0, relativeLimit: null, upperLimit: null, wrStatus: null }
  },
  state: "success",
  status: 1
})

// 报警规则 根据设备 查找规则
Mock.mock("/warn/selectGkDWByDeviceid", 'post', {
  msg: "操作成功",
  referer: null,
  result: {
    has: [
      { absoluteLimit: 40, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530717170000, dwDeviceid: "HEBEI01304000101", dwId: 33, dwName: "优（一级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 1, offset: 0, relativeLimit: null, upperLimit: 35, wrStatus: null },
      { absoluteLimit: 40, checkMinCount: 0, deiceMap: null, dwCreateTime: 1530613414000, dwDeviceid: "HEBEI01304000101", dwId: 34, dwName: "良（二级）相对高值", dwParam: 1, dwParamStr: "PM2.5", dwReserve1: null, dwReserve2: null, dwTime: 1, dwType: 1, dwTypeStr: "相对", isDwCount: 5, limit: 10, lowerLimit: 36, offset: 0, relativeLimit: null, upperLimit: 75, wrStatus: null }
    ],
    unHas: []
  },
  state: "success",
  status: 1
})

// 报警规则 根据规则 查找设备
Mock.mock("/warn/selectDeviceByGkDwId", 'post', {
  msg: "操作成功",
  referer: null,
  result: {
    has: [
      { address: "邯山区", checkValueInNr: 0, checkValueOutNr: 0, city: "邯郸", cityId: null, deviceWarnData: null, deviceid: "1047A", district: "邯山区", dname: "环保局", dtype: "national", endTimeStamp: null, gkHourData: null, installtime: 1420070400000, lat: 36.623635684105, lon: 114.52529151114, poitype: null, province: "河北省", startTimeStamp: null, status: 0, street: null },
      { address: "邯郸县", checkValueInNr: 0, checkValueOutNr: 0, city: "邯郸", cityId: null, deviceWarnData: null, deviceid: "1048A", district: "邯郸县", dname: "东污水处理厂", dtype: "national", endTimeStamp: null, gkHourData: null, installtime: 1420070400000, lat: 36.622166369973, lon: 114.55493951134, poitype: null, province: "河北省", startTimeStamp: null, status: 0, street: null }
    ],
    unHas: []
  },
  state: "success",
  status: 1
})

// 污染源状态列表
Mock.mock("/pollutionSoil/getHandlingStatusDict", 'post', {
  msg: "加载成功",
  referer: null,
  result: {
    dict: [
      {code: "", name: "全部"},
      {code: "0", color: null, name: "疑似污染源"},
      {code: "1", color: null, name: "未处理"},
      {code: "2", color: null, name: "处理中"},
      {code: "3", color: null, name: "已处理"}
    ]
  },
  state: "success",
  status: 1
})

// 污染源类型列表
Mock.mock("/pollutionSoilType/getDict", 'post', {
  msg: "加载成功",
  referer: null,
  result: {
    list: [
      {code: "", name: "全部"},
      {code: 1, name: "建筑施工扬尘"},
      {code: 2, name: "城乡裸露地面扬尘"},
      {code: 3, name: "城市道路扬尘"},
      {code: 4, name: "公路扬尘"},
      {code: 5, name: "工业料堆场扬尘"},
      {code: 6, name: "露天矿山扬尘"}
    ]
  },
  state: "success",
  status: 1
})

// 污染源地图
Mock.mock("/pollutionSoil/getAllList", 'post', {
  msg: "加载成功",
  referer: null,
  result: [
    {
      advise: null,
      afterDisposePhotoUrl: "",
      afterPhotoList: null,
      areaCode: "130371401216",
      areacode: { areaCode: "130371401216", areaName: null, children: null, city: "秦皇岛市", cityCode: "3", county: "秦皇岛市经济技术开发区", countyCode: "71", province: "河北省", provinceCode: "13", town: "牛头崖管理区办事处", townCode: "401", village: "苍上村委会", villageCode: "216" },
      baiduLatitude: 39.908011172378224,
      baiduLongitude: 119.43095043167035,
      beforeDisposePhotoUrl: "",
      beforePhotoList: null,
      distance: 0,
      endTime: "3000-01-01",
      gpsLatitude: null,
      gpsLongitude: null,
      handlingStatus: "0",
      handlingStatusName: "疑似污染源",
      influenceFactor: "PM10|PM2.5",
      liablePerson: "",
      liablePhoneNumber: null,
      liableSubject: "",
      limit: 10,
      msg: "信息：仓上村；面积：8000",
      offset: 0,
      polluteId: 51,
      polluteName: "仓上村",
      polluteTypeId: 1,
      polluteTypeName: "建筑施工扬尘",
      startTime: "2018-04-26",
      time: null
    },
    {
      advise: null,
      afterDisposePhotoUrl: "",
      afterPhotoList: null,
      areaCode: "130429100231",
      areacode: { areaCode: "130429100231", areaName: null, children: null, city: "邯郸市", cityCode: "4", county: "永年县", countyCode: "29", province: "河北省", provinceCode: "13", town: "临洺关镇", townCode: "100", village: "东召庄村委会", villageCode: "231" },
      baiduLatitude: 36.77301,
      baiduLongitude: 114.487343,
      beforeDisposePhotoUrl: "185,186",
      beforePhotoList: [
        { creatorId: null, id: 185, saveName: "http://101.201.141.45:2000/file/201806/20180621165153464902.png", size: 297806, sourceName: "027.png" },
        { creatorId: null, id: 186, saveName: "http://101.201.141.45:2000/file/201806/20180621165158572456.png", size: 29995, sourceName: "027-2.png" }
      ],
      distance: 0,
      endTime: "2018-06-07",
      gpsLatitude: null,
      gpsLongitude: null,
      handlingStatus: "3",
      handlingStatusName: "已处理",
      influenceFactor: null,
      liablePerson: "工业园区",
      liablePhoneNumber: "1",
      liableSubject: "工业园区",
      limit: 10,
      msg: "永年中赵庄澳洲小镇小区东侧主路，距离河北工程大学（洺关校区）省控点西北方向直线距离860米。当前北风4级，该路位于河北工程大学（洺关校区）省控站北面860米，路面道尘土较多，请相关部门及时进行湿扫并洒水。",
      offset: 0,
      polluteId: 186,
      polluteName: "河工大027",
      polluteTypeId: 2,
      polluteTypeName: "城乡裸露地面扬尘",
      startTime: "2018-06-07",
      time: 1529599956000
    }
  ],
  state: "success",
  status: 1
})

// 污染源报表 3级联动字典
Mock.mock("/areacode/getAllList", 'post', {
  msg: "加载成功",
  referer: null,
  result: {
    areaDict: [
      { children: [{code: "", children: [{code: "", text: "全部"}], text: "全部"}], code: "", text: "全部" },
      {
        children: [
          { children: [{code: "", children: [{code: "", text: "全部"}], text: "全部"}], code: "", text: "全部" },
          {
            children: [ {code: "", children: [{code: "", children: [{code: "", text: "全部"}], text: "全部"}], text: "全部"}, {code: "130371005001", text: "祥安里社区居委会"}, {code: "130371005003", text: "长城东里社区居委会"}, {code: "130371005004", text: "船厂社区居委会"} ],
            code: "130371005",
            text: "船厂路街道办事处"
          }
        ],
        code: "130371",
        text: "秦皇岛市经济技术开发区"
      }
    ]
  },
  state: "success",
  status: 1
})

// 污染源报表 分页列表
Mock.mock("/pollutionSoil/getPageList", 'post', {
  msg: "加载成功",
  referer: null,
  result: {
    pageInfo: {
      endRow: 10,
      firstPage: 1,
      hasNextPage: true,
      hasPreviousPage: false,
      isFirstPage: true,
      isLastPage: false,
      lastPage: 8,
      list: [
        {
          advise: null,
          afterDisposePhotoUrl: null,
          areaCode: "130429000000",
          areacode: { areaCode: "130429000000", areaName: null, children: null, city: "邯郸市", cityCode: "4", county: "永年县", countyCode: "29", province: "河北省", provinceCode: "13", town: "", townCode: "0", village: "", villageCode: "0" },
          baiduLatitude: 123,
          baiduLongitude: 123,
          beforeDisposePhotoUrl: null,
          endTime: "2018-08-08",
          gpsLatitude: null,
          gpsLongitude: null,
          handlingStatus: "疑似污染源",
          influenceFactor: null,
          liablePerson: "123",
          liablePhoneNumber: "123",
          liableSubject: "123",
          limit: 10,
          msg: "123",
          offset: 0,
          polluteId: 227,
          polluteName: "123",
          polluteTypeId: 1,
          polluteTypeName: "建筑施工扬尘",
          startTime: "2018-08-08",
          time: null
        }
      ],
      navigatePages: 8,
      navigatepageNums: [1, 2, 3, 4, 5, 6, 7, 8],
      nextPage: 2,
      orderBy: "time desc",
      pageNum: 1,
      pageSize: 10,
      pages: 14,
      prePage: 0,
      size: 10,
      startRow: 1,
      total: 136
    },
    queryParam: { advise: null, afterDisposePhotoUrl: null, afterPhotoList: null, areaCode: "", areacode: null, baiduLatitude: null, baiduLongitude: null, beforeDisposePhotoUrl: null, beforePhotoList: null, distance: 0, endTime: null, gpsLatitude: null, gpsLongitude: null, handlingStatus: "", handlingStatusName: null, influenceFactor: null, liablePerson: null, liablePhoneNumber: null, liableSubject: null, limit: 10, msg: null, offset: 0, polluteId: null, polluteName: null, polluteTypeId: null, polluteTypeName: null, startTime: null, time: null }
  },
  state: "success",
  status: 1
})

// 污染源报表 查单个
Mock.mock("/pollutionSoil/getInfo", 'post', {
  msg: "操作成功",
  referer: null,
  result: {
    basepath: "http://101.201.141.45:2000/file/",
    info: {
      advise: null,
      afterDisposePhotoUrl: "277,278",
      afterPhotoList: [
        {
          creatorId: null,
          id: 277,
          saveName: "http://101.201.141.45:2000/file/201808/20180806180122517156.jpg",
          size: 10990,
          sourceName: "a.jpg"
        },
        {
          creatorId: null,
          id: 278,
          saveName: "http://101.201.141.45:2000/file/201808/20180806180124798296.jpg",
          size: 10990,
          sourceName: "a.jpg"
        }
      ],
      areaCode: "130371011001",
      areacode: {
        areaCode: "130371011001",
        areaName: null,
        children: null,
        city: "秦皇岛市",
        cityCode: "3",
        county: "秦皇岛市经济技术开发区",
        countyCode: "71",
        province: "河北省",
        provinceCode: "13",
        town: "珠江道街道办事处",
        townCode: "11",
        village: "碧水园社区居委会",
        villageCode: "1"
      },
      baiduLatitude: 123,
      baiduLongitude: 123,
      beforeDisposePhotoUrl: "276,279",
      beforePhotoList: [{
        creatorId: null, id: 276, saveName: "http://101.201.141.45:2000/file/201808/20180806180119970858.jpg", size: 10990, sourceName: "a.jpg"
      }],
      distance: 0,
      endTime: "2018-08-08",
      gpsLatitude: null,
      gpsLongitude: null,
      handlingStatus: "0",
      handlingStatusName: null,
      influenceFactor: null,
      liablePerson: "123",
      liablePhoneNumber: "123",
      liableSubject: "123",
      limit: 10,
      msg: "123",
      offset: 0,
      polluteId: 226,
      polluteName: "123",
      polluteTypeId: 1,
      polluteTypeName: null,
      startTime: "2018-08-02",
      time: 1533549689000
    }
  },
  state: "success",
  status: 1
})

// 用户登出
Mock.mock("/oauthWeb/logout", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 污染源报表 多删除
Mock.mock("/pollutionSoil/delete", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 污染源报表 添加单个
Mock.mock("/pollutionSoil/savePollute", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 污染源 上传图片
Mock.mock("/attach/upload", 'post', {
  msg: "加载成功",
  referer: null,
  result: {fileList: [{ creatorId: null, id: 283, saveName: "http://101.201.141.45:2000/file/201808/20180829170715829750.jpg", size: 450743, sourceName: "2600911_2a2ec135f34e15b1880b30065a1b633d.jpg" }]},
  state: "success",
  status: 1
})

// 污染源 删除图片
Mock.mock("/pollutionSoil/deleteAttach", 'post', {
  msg: "Success",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 报警规则 设置关联 保存
Mock.mock("/warn/saveDeviceRelatedDwId", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 报警规则列表 新增修改保存
Mock.mock("/warn/saveGkDeviceWarn", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 报警规则列表 删除
Mock.mock("/warn/deleteGkDeviceWarn", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})
