<template>
  <div class="login">
    <div class="log">
      <div class="content1">
        <h2>用户登录</h2>
        <form id="form" @submit.prevent="loginRequest">
          <input type="text" v-model="form.username" reg="email" placeholder="请输入邮箱">
          <input type="password" v-model="form.password" reg="registerPwd" placeholder="请输入密码" auto-complete="off">
          <div class="button-row">
            <input type="submit" class="sign-in" value="登录">
            <input type="reset" class="reset" value="重置">
            <div class="clear"></div>
          </div>
        </form>
      </div>
      <!-- <div class="content2">
        <h2>Sign Up Form</h2>
        <form>
          <input type="text" name="userid" value="USERNAME" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'NAME AND SURNAME';}">
          <input type="tel" name="usrtel" value="PHONE" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'PHONE';}">
          <input type="email" name="email" value="EMAIL ADDRESS" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'EMAIL ADDRESS';}">
          <input type="password" name="psw" value="PASSWORD" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'PASSWORD';}">
          <input type="submit" class="register" value="Register">
        </form>
      </div> -->
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  methods: {
    ...mapActions([
      'updataUserInfo'
    ]),
    async loginRequest() {
      const text = this.check('form')
      if (text) return this.$message.error(text)

      const {data} = await this.$fetch({
        url: this.api.weatherInfo,
        data: this.form
      })
      if (data) {
        // token 存储进vuex + 本地存储  跳到首页
        const baseInfo = { token: 123456798 }
        this.updataUserInfo({
          baseInfo: baseInfo
        })
        this.$router.push('/')
      }
    }
  }
}

</script>
<style lang="scss">

  .login {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: url(../assets/images/banner.jpg) no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    // 修改placeholder样式
    input::-webkit-input-placeholder {
      color: #fff;
      opacity: 1;
    }
    input::-moz-placeholder {
      color: #fff;
      opacity: 1;
    }
    input:-ms-input-placeholder {
      color: #fff;
      opacity: 1;
    }
    input::placeholder {
      color: #fff;
      opacity: 1;
    }
    .log {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      .content1 {
        width: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }
</style>
