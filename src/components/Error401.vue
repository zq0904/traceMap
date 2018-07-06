<template>
  <div class="error401">
    <div class="error401-row">
      <el-row>
        <el-col :span="12">
          <h1 class="error401-row-h1">Oops!</h1>
          <h4 class="error401-row-h4">您没有权限去该页面</h4>
          <h6 class="error401-row-h6">如您有任何的不满，请联系您的领导</h6>
          <ul>
            <li class="error401-row-li">随便看看</li>
            <li class="error401-row-li">
              <router-link to="/">回首页</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <img :src="errGif401" width="313" height="428">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import errGif401 from '../assets/images/401.gif'

export default {
  data () {
    return {
      errGif401: errGif401 + '?' + Date.now()
    }
  }
}
</script>

<style lang="scss">
.error401 {
  width: 100%;
  height: 100%;
  padding: 100px 0;
  &-row {
    width: 800px;
    height: 428px;
    margin: 0 auto;
    text-align: center;
    &-h1 {
      padding-top: 118px;
      color: #007A87;
      font-size: 60px;
      font-weight: 700;
    }
    &-h4 {
      margin: 20px 0;
      font-size: 25px;
      font-weight: 700;
    }
    &-h6 {
      margin: 27px 0;
      font-size: 12px;
      font-weight: 500;
    }
    &-li {
      color: #007A87;
      line-height: 24px;
      a {
        color: #007A87;
        text-decoration: none;
        &:active {
          color: #0087FF;
        }
      }
    }
  }
}
</style>
