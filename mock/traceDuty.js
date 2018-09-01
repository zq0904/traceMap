import Mock, { Random } from 'mockjs'

// 溯责地图
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
        { creatorId: null, id: 185, saveName: "http://f11.baidu.com/it/u=752933719,2910359121&fm=72", size: 297806, sourceName: "027.png" },
        { creatorId: null, id: 186, saveName: "http://f11.baidu.com/it/u=752933719,2910359121&fm=72", size: 29995, sourceName: "027-2.png" }
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

// 溯责 状态列表
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

// 溯责 类型列表
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

// 溯责报表 3级联动字典
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

// 溯责报表 分页列表
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

// 溯责报表 多删除
Mock.mock("/pollutionSoil/delete", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 溯责报表 查单个
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
          saveName: "http://img2.imgtn.bdimg.com/it/u=3221513737,2348674445&fm=200&gp=0.jpg",
          size: 10990,
          sourceName: "a.jpg"
        },
        {
          creatorId: null,
          id: 278,
          saveName: "http://img2.imgtn.bdimg.com/it/u=3221513737,2348674445&fm=200&gp=0.jpg",
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
        creatorId: null, id: 276, saveName: "http://img2.imgtn.bdimg.com/it/u=3221513737,2348674445&fm=200&gp=0.jpg", size: 10990, sourceName: "a.jpg"
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

// 溯责报表 添加单个
Mock.mock("/pollutionSoil/savePollute", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
  state: "success",
  status: 1
})

// 溯责报表 上传图片
Mock.mock("/attach/upload", 'post', {
  msg: "加载成功",
  referer: null,
  result: {fileList: [{ creatorId: null, id: 283, saveName: "http://img2.imgtn.bdimg.com/it/u=3221513737,2348674445&fm=200&gp=0.jpg", size: 450743, sourceName: "2600911_2a2ec135f34e15b1880b30065a1b633d.jpg" }]},
  state: "success",
  status: 1
})

// 溯责报表 删除图片
Mock.mock("/pollutionSoil/deleteAttach", 'post', {
  msg: "Success",
  referer: null,
  result: null,
  state: "success",
  status: 1
})
