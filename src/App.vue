<template>
  <div>
    <AppHeader :seller="seller"></AppHeader>
    <ul class="tag">
      <li>
        <router-link to="/">商品</router-link>
      </li>
      <li>
        <router-link to="/ratings">评价</router-link>
      </li>
      <li>
        <router-link to="/merchant">商家</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <AppFooter></AppFooter>
  </div>
</template>
<script>
import AppHeader from './components/common/Header'
import AppFooter from './components/common/Footer'

const resOk = 1 // 声明请求成功 标识

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      seller: {}
    }
  },
  async created() {
    const { data } = await this.$http.get('/proxy/seller')
    if (data.status !== resOk) return
    this.seller = data.data
  }
}

</script>
<style lang='scss'>
@import './assets/scss/app';
.tag {
  /* 这里 cli 依赖的包已经处理了 felx的兼容 */
  @include c3(display, flex);
  width: 100%;
  @include lh(80, 80);
  text-align: center;
  @include font-dpr(28);
  @include border(rgba(7, 17, 27, .1));
  li {
    @include c3(flex, 1);
    a {
      display: block;
      color: rgb(77, 85, 93);
      &.on {
        color: rgb(240, 20, 20)
      }
    }
  }
}

</style>
