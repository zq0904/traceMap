<template>
  <div class="fooer">
    <div class="cart">
      <span class="icon-shopping_cart cartHeart"></span>
    </div>
    <div class="money">
      <em class="moneyHeart">&yen;10</em>
      <p class="moneyContent">另需配送费&yen;4元</p>
    </div>
    <div class="startSend">
      <p>&yen;20起送</p>
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

.fooer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  @include px2rem(height, 96);
  background-color: #141D27;
  color: #80858A;
  .cart {
    float: left;
    position: relative;
    @include wh(112, 112);
    @include px2rem(margin, -20 0 0 22);
    background-color: #141D27;
    @include c3(border-radius, 50%);
    .cartHeart {
      @include absolute_center(88, 88);
      @include lh(88, 88);
      @include font-dpr(48);
      text-align: center;
      background-color: #2B343C;
      @include c3(border-radius, 50%);
    }
  }
  .money {
    float: left;
    @include px2rem(padding, 24 0 0 22);
    .moneyHeart {
      float: left;
      @include lh(48, 48);
      @include px2rem(padding-right, 25);
      @include font-dpr(26);
      font-weight: 700;
      @include border(rgba(255, 255, 255, .1), 1, right);
    }
    .moneyContent {
      float: left;
      @include lh(48, 48);
      @include px2rem(padding-left, 24);
      @include font-dpr(20);
    }
  }
  .startSend {
    float: right;
    @include wlh(210, 96, 96);
    @include font-dpr(26);
    text-align: center;
    font-weight: 700;
    background-color: #2B333B;
  }
}

</style>
