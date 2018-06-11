<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <a class="logo" href="#">
      <div class="logo-img" style="width: 50px;height: 50px;"></div>溯源地图
    </a>
    <ul class="pull-right">
      <li class="navbar-li">Aimer<span class="triangle"></span></li>
      <li class="navbar-li">通知</li>
    </ul>
  </nav>
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
.navbar {
  height: 50px;
  margin-bottom: 0;
  background-color: #0087FF;
  .logo {
    float: left;
    display: block;
    width: 160px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    &-img {
      float: left;
      margin-right: 10px;
    }
  }
  &-li {
    position: relative;
    float: left;
    height: 24px;
    line-height: 24px;
    margin: 13px 0;
    padding: 0 20px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    &::before {
      content: '';
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      border-right: 1px solid #41A3FC;
    }
    &:last-of-type::before {
      border: 0 none;
    }
    .triangle{
      float: right;
      width: 20px;
      height: 20px;
      margin-top: 1px;
      margin-left: 5px;
      margin-right: -5px;
      background: url('../../assets/images/triangle.png') no-repeat center;
    }
  }
}

</style>
