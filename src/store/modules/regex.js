// 正则表达式

const state = {
  // 验证类
  phone: { reg: /^0?(13|15|18|14|17)[0-9]{9}$/, tips: '请输入正确的手机号', required: '请输入手机号' },
  registerPwd: { reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, tips: '密码为6-16位字母和数字的组合', required: '请输入密码' }, // 注册时 密码
  loginPwd: { reg: /^[\w]{6,16}$/, tips: '账号或密码不正确', required: '请输入密码' }, // 登录时 密码
  verificationCode: { reg: /^\d{6}$/, tips: '请输入正确的验证码', required: '请输入验证码' }, // 6位纯数字验证码
  graphValidateCode: { reg: /^[0-9A-Za-z]{4}$/, tips: '请输入正确的图形验证码', required: '请输入图形验证码' }, // 4位图形验证码
  name: { reg: /^[\u4E00-\u9FA5-]{2,10}$/, tips: '请填写正确的姓名', required: '请填写您的姓名' }, // 2-10位纯数字
  nickname: { reg: /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#$^&*()=|{}':;',[\]./<>?~！@#¥￥……&*（）——|{}【】" "‘；：”`“'。~！@¥￥%……&*（）——+~!#-=$%^&*()_+……，`·、、？]+$/, tips: '请填写正确的昵称', required: '请填写您的昵称' },
  bankCard: { reg: /^(\d{16,19})$/, tips: '请填写正确的银行卡号', required: '请填写银行卡号' },
  identity: { reg: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/, tips: '请填写正确的身份证号', required: '请填写您的身份证号' },
  email: { reg: /^\w[\w.+]*@([A-Za-z0-9][A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, tips: '请填写正确的邮箱', required: '请填写您的邮箱' },
  company: { reg: /^[\u4e00-\u9fa5a-zA-Z0-9~':;,.{}【】"‘；：”“，。（）#()、]+$/, tips: '请填写正确的公司名称', required: '请填写您的公司' },
  site: { reg: [{ reg: /^[\u4e00-\u9fa5\w~':;,.{}【】"‘；：”“，。（）#()、@[\]\-_+*.<>/{｝&]+$/, tips: '详细地址存在非法字符，请重新输入' }, { reg: /^.{5,}$/, tips: '详细地址描述信息不得少于5个字符' }], required: '请填写您的详细地址' },

  // 截取类
  echoPhone: /(\d{3})(\d{4})(\d{4})/ // 手机回显
}

const actions = {}

const mutations = {}

export default {
  state,
  actions,
  mutations
}
