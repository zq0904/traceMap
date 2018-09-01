import Mock, { Random } from 'mockjs'

// 溯点地图
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

// 报警规则 设置关联 保存
Mock.mock("/warn/saveDeviceRelatedDwId", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})
