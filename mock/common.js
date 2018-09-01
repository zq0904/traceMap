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

// 用户登出
Mock.mock("/oauthWeb/logout", 'post', {
  msg: "操作成功",
  referer: null,
  result: null,
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
