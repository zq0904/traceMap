import Mock, { Random } from 'mockjs'

// 溯源地图
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

// 溯源地图48小时历史回放
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
      { address: "邯山区", aqi: 60, ci: 4.18, city: "邯郸", co: 0.7, deviceId: "1047A", district: "邯山区", dtype: "national", humidity: 86, lat: 36.623635684105, lon: 114.52529151114, most: "pm10", name: "河北省.环保局", no2: 27, o3: 152, pOut: 1001, pm10: 69, pm25: 39, so2: 16, status: "W00", synthesis: 5.43, temperature: 11.1, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 },
      { address: "邯郸县", aqi: 69, ci: 4.7, city: "邯郸", co: 0.9, deviceId: "1048A", district: "邯郸县", dtype: "national", humidity: 86, lat: 36.622166369973, lon: 114.55493951134, most: "pm10", name: "河北省.东污水处理厂", no2: 27, o3: 152, pOut: 1001, pm10: 69, pm25: 39, so2: 16, status: "W00", synthesis: 4.3, temperature: 22.2, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 },
      { address: "邯郸", aqi: 66, ci: 3.76, city: "邯郸", co: 0.8, deviceId: "邯郸", district: "邯郸", dtype: "national", humidity: 86, lat: 36.623635684105, lon: 114.52529151114, most: "pm10", name: "河北省.邯郸", no2: 27, o3: 152, pOut: 1001, pm10: 69, pm25: 39, so2: 16, status: "W00", synthesis: 1.16, temperature: 33.3, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 }
    ]
  }, {
    alarm: [],
    gridding: [
      { address: "永年区刘镇", aqi: 60, autoid: 947999, ci: 2.1, city: "邯郸市1", co: 23, deviceId: "HEBEIYN000018025", district: "永年区1", dtype: "ATLAS3.0", humidity: 42, lat: 36.7740448636, lon: 114.51655139, most: "CO", name: "河北省.永年区西苏乡", no2: 2, o3: 3, pOut: 666, pm10: -1, pm25: 12, so2: 13, synthesis: 1.8, temperature: 24.1, time: 1535389200000, weatherText: "晴", windDirection: "西北风", windRank: "微风", windSpeed: 2.1 },
      { address: "永年区营镇", aqi: 80, autoid: 947888, ci: 1.13, city: "邯郸市2", co: 14, deviceId: "HEBEIYN000018012", district: "永年区2", dtype: "ATLAS3.0", humidity: 15, lat: 36.8153064207, lon: 114.596476089, most: "CO", name: "河北省.永年区临洺关镇", no2: -1, o3: -1, pOut: 996, pm10: -1, pm25: 51, so2: 69, synthesis: 2.61, temperature: 24.1, time: 1535389200000, weatherText: "晴", windDirection: "西北风", windRank: "微风", windSpeed: 2.1 },
      { address: "永年区其镇", aqi: 30, autoid: 947777, ci: 0.21, city: "邯郸市3", co: 25, deviceId: "HEBEIYN000018167", district: "永年区3", dtype: "ATLAS3.0", humidity: 25, lat: 36.7649020656, lon: 114.569247148, most: "CO", name: "河北省.永年区刘营镇", no2: -1, o3: -1, pOut: 996, pm10: -1, pm25: 36, so2: 17, synthesis: 1.31, temperature: 24.1, time: 1535389200000, weatherText: "晴", windDirection: "西北风", windRank: "微风", windSpeed: 2.1 }
    ],
    state: [
      { address: "邯山区", aqi: 60, ci: 4.18, city: "邯郸", co: 0.7, deviceId: "1047A", district: "邯山区", dtype: "national", humidity: 86, lat: 36.623635684105, lon: 114.52529151114, most: "pm10", name: "河北省.环保局", no2: 27, o3: 152, pOut: 1001, pm10: 69, pm25: 39, so2: 16, status: "W00", synthesis: 4.18, temperature: 22.5, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 },
      { address: "邯郸", aqi: 66, ci: 3.76, city: "邯郸", co: 0.8, deviceId: "邯郸", district: "邯郸", dtype: "national", humidity: 86, lat: 36.623635684105, lon: 114.52529151114, most: "pm10", name: "河北省.邯郸", no2: 34, o3: -1, pOut: 1001, pm10: 82, pm25: 40, so2: 24, status: "W00", synthesis: 3.76, temperature: 22.5, time: 1535389200000, weatherText: "晴", windDirection: "东北风", windRank: "微风", windSpeed: 0.3 }
    ]
  }],
  state: "success",
  status: 1
})

// 数据排行
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
