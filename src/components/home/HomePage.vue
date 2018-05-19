<template>
  <div class="details">
    <div class="item1 i">
      <div class="name">邯郸.231</div>
      <p class="time">2018-05asdasd</p>
    </div>
    <div class="item2 i">
      <div style="background-color: #EBDC53;">AQI</div>
      <p>94</p>
    </div>
    <div class="item2 i">
      <div style="background-color: #62D13E;">综合指数</div>
      <p>5.86</p>
    </div>

    <div class="item6 i">
      <div>PM2.5</div>
      <p>70</p>
    </div>
    <div class="item6 i">
      <div>PM10</div>
      <p>70</p>
    </div>
    <div class="item6 i">
      <div>SO2</div>
      <p>70</p>
    </div>
    <div class="item6 i">
      <div>NO2</div>
      <p>70</p>
    </div>
    <div class="item6 i">
      <div>CO</div>
      <p>70</p>
    </div>
    <div class="item6 i">
      <div>O3</div>
      <p>70</p>
    </div>

    <div class="item3 i">
      <p>温度: 21℃</p>
      <p>风向: 东风</p>
    </div>
    <div class="item3 i">
      <p>湿度: 61%</p>
      <p>风速: 9km/h</p>
    </div>
    <div class="item3 i">
      <p>天气: 阴转阵雨</p>
      <p>风级: 2级</p>
    </div>
  </div>
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
@import '../../assets/scss/app';
.details {
  @include c3(display, flex);
  @include c3(flex-wrap, wrap);
  @include c3(justify-content, space-between);
  @include c3(align-content, flex-start);
  width: 420px;
  padding: 20px;
  text-align: center;
  background-color: rgba(0,0,0,.7);
  .i {
    height: 44px;
    margin-bottom: 8px;
    background-color: #EAEAEA;
  }
  .item1 {
    width: 188px;
    div {
      height: 27px;
      line-height: 27px;
      font-size: 21px;
    }
    p {
      height: 17px;
      line-height: 17px;
      font-size: 10px;
    }
  }
  .item2 {
    width: 92px;
    div {
      height: 20px;
      line-height: 20px;
      font-size: 10px;
    }
    p {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
    }
  }
  .item6 {
    width: 60px;
    div {
      height: 20px;
      line-height: 20px;
      font-size: 10px;
    }
    p {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
    }
  }
  .item3 {
    width: 124px;
    background-color: #F8F8F8;
    p {
      height: 22px;
      line-height: 22px;
      font-size: 14px;
    }
  }
}
</style>
