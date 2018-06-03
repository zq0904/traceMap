<template>
  <!-- 一级路由 -->
  <router-view></router-view>
</template>
<script>

export default {
  data() {
    return {
    }
  }
}
</script>
<style lang="scss">
// 公共样式

// 去掉logo和版权
.anchorBL {
  display: none;
}
// 修改BMapLib提示框下三角位置
.BMapLib_trans {
  top: auto !important;
}
// 公共颜色
.rgb-204-204-204 {
  background-color: rgb(204, 204, 204) !important;
}
.rgb-0-228-0 {
  background-color: rgb(0, 228, 0) !important;
}
.rgb-255-255-0 {
  background-color: rgb(255, 255, 0) !important;
}
.rgb-255-126-0 {
  background-color: rgb(255, 126, 0) !important;
}
.rgb-255-0-0 {
  background-color: rgb(255, 0, 0) !important;
}
.rgb-153-0-76 {
  background-color: rgb(153, 0, 76) !important;
}
.rgb-126-0-35 {
  background-color: rgb(126, 0, 35) !important;
}
// 覆盖element-ui 面包屑
.custom-breadcrumb {
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  font-size: 15px;
}
// 解决element-ui与bootstrap样式冲突
.el-upload__input {
  display: none !important;
}
</style>
