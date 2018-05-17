<template>
  <div class="middleLine">
    <div class="line"></div>
    <p>{{text}}</p>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      require: true
    }
  },
  data() {
    return {

    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
.middleLine {
  @include c3(display, flex);
  @include px2rem(padding, 0 72 0);
  p {
    @include px2rem(padding, 0 24);
    @include c3(flex, 1.6);
    text-align: center;
    font-weight: 700;
    @include font-dpr(28);
    color: #fff;
  }
  .line {
    @include c3(flex, 2.24);
    &::before {
      content: '';
      display: inline-block;
      width: 100%;
      height: 2px;
      vertical-align: middle;
      background-color: rgba(255, 255, 255, .2);
    }
  }
}

</style>
