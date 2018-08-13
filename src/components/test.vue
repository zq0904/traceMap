<template>
  <div class="test">
    <BaseButton v-if="per('990100')">微站</BaseButton><br>
    <BaseButton v-if="per('990200')">国控</BaseButton><br>
    <BaseButton v-if="per('990300')">逻辑</BaseButton><br>
    <br>
    <br>
    <br>
    <BaseButton v-if="per('990400')">整体保存</BaseButton><br>
    <BaseAa v-if="per('990500')"></BaseAa>
    <BaseBb v-if="per('990600')"></BaseBb>
    <p>test: {{ test }}</p>
    <button @click="$store.dispatch('updateTest', {testArr:[1]})">action</button>
    <!-- 使用 全局 过滤 -->
    <p>{{ date | time('YYYY-MM-DD HH:mm:ss') }}</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import $ from 'jquery'
// import zepto from 'zepto'
// import _ from 'lodash'
// import { Base64 } from 'js-base64'
// import { isMobile } from '../lib/until'

export default {
  data() {
    return {
      date: new Date().getTime()
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi',
      test: 'getTest',
      regexp: 'getRegexp'
    })
  },
  async created() {
    // // 测试safari兼容无痕模式
    // this.sessionSetItem('bbb', 'qw1e32qw12e')
    // this.sessionSetItem('aaa', 'aaaaa')
    // // this.sessionRemoveItem('bbb')
    // this.sessionClear()
    // console.log(this.sessionGetItem('bbb'))
    // console.log(this.sessionGetItem('aaa'))
    // // 测试 Base64
    // console.log(Base64.encode('asdsa'))
    // console.log(Base64.decode('YXNkc2E='))
    // // 测试是否是 手机
    // this.$nextTick(() => {
    //   window.alert(isMobile())
    // })
  },
  methods: {
    ...mapActions([
      'mergeTest',
      'replaceTestArr',
      'spliceTestArr'
    ])
  }
}

</script>
<style lang='scss'>
// @import '../assets/scss/app'; 全局引入了
  .test {
    background-color: #B4B8BE;
  }
</style>
