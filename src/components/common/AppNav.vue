<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">溯源地图</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <div class="userinfo col-md-2 pull-right">
          <i class="iconfont icon--lingdang pull-left"></i>
          <div class="pull-left">用户名:admin</div>
        </div>
        <!-- <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Help</a></li>
        </ul> -->
      </div>
    </div>
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
  .navbar-brand {
    margin-left: 20px !important;
    color: #fff;
  }
  .icon--lingdang {
    font-size: 30px;
    color: #F39D00;
  }
  .userinfo {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    div {
      margin-left: 10px;
    }
  }
}

</style>
