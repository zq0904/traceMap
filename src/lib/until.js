
// 判断是否是手机
export const isMobile = () => {
  const ua = navigator.userAgent.toLocaleLowerCase()
  const isIpad = ua.match(/ipad/i)
  const isIphoneOs = ua.match(/iphone os/i)
  const isMidp = ua.match(/midp/i)
  const isUc7 = ua.match(/rv:1.2.3.4/i)
  const isUc = ua.match(/ucweb/i)
  const isAndroid = ua.match(/android/i)
  const isCE = ua.match(/windows ce/i)
  const isWM = ua.match(/windows mobile/i)
  return !!(isIpad || isIphoneOs || isMidp || isUc7 || isUc || isAndroid || isCE || isWM)
}

// 判断是否是Android
export const isAndroid = () => {
  const ua = navigator.userAgent.toLocaleLowerCase()
  return ua.indexOf('android') > -1 || ua.indexOf('linux') > -1
}

// 判断是否是Iphone
export const isIphone = () => {
  const ua = navigator.userAgent.toLocaleLowerCase()
  return ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('macintosh') > -1
}

// 判断是否是IOS版本微信
export const isIosWX = () => {
  const ua = navigator.userAgent.toLocaleLowerCase()
  return (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('macintosh') > -1) && ua.indexOf('micromessenger') > -1
}

// 获取path （不含#不含查询字符串）
export const getPath = () => {
  let url = window.location.hash.substr(1)
  const indexEnd = url.indexOf('?')
  return indexEnd === -1 ? url : url.substr(0, indexEnd)
}
