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
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import $ from 'jquery'
// import zepto from 'zepto'
// import _ from 'lodash'
// import moment from 'moment'
// import { Base64 } from 'js-base64'
// import { isMobile } from '../lib/until'

export default {
  data() {
    return {
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
@import '../assets/scss/app';

  // 注释 /**/ //
  // @import '../assets/css/test'; // 导入_.scss文件 不需写后缀 _test.scss中的变量及样式都会引入这里
  // 使用$声明变量 具有块级作用域(可以使用 $fz: 10px !global; 直接提升至全局)
  // 可以被覆盖 不可以跟数字 $1 注意赋值一定要使用 : 没有用 = 一说
  // 变量声明默认值 在后面加 !default 多个默认值 后面覆盖前面 一旦有值去对应的值
  // 多值变量 一维 空格   二维 , 或者 ()
  // list类型 $list: 1px 2px 3px; 单独使用$list 取第一个nth($list, 1)  求长度length($list) 融合join($list,[4px, 5px]) -> 1px 2px 3px 4px 5px
  // 追加append($list, [1px]) -> 1px 2px 3px [1px]
  // 二维list $list: 1px 2px, 3px;   nth($list, 1) -> 1px 2px
  // 二维list $list: (1px 2px) 3px;  nth($list, 2) -> 3px
  // map类型
  // $map: (h1: 3em, h2: 2em); 取值 map-get($map,h2) -> 2em
  // @at-root { .a{} } .a这个选择器直接跳到最外层
  // 变量的填充使用 #{$a}
  // scss具有计算功能 变量等都可以参与运算 100px+10 单位只写一个
  // $gray: #ccc !default;  color: lighten($gray, 10%); 在原来的颜色基础上减淡  darken($gray, 20%); 加深
  // 属性可以嵌套写法
  // 占位符选择器 %a{} 如果没有使用 @extend %a; 则浏览器不会渲染 使用了才会渲染
  // 继承 @extend .a; 继承.a的类样式
  // @xixin a($p:1px) {} 类似函数 写兼容等 参数必须 以$开始 可以设置默认值  使用 @include a(100px) 如果有单位必须传入
  // 条件语句 @if 1 != 0 { } @else if 1 != 3 { } @else { } 三元表达式 注意此if必须紧跟() line-height: if(false, 1, 2);
  // 遍历 @for $i from 1 through 10 {width: $i + 'px'}  @for $i from 1 to 10 { width: $i + 'px' }   through关键字包括结尾 to不包括
  // @while 直到不满足条件退出循环
  // $i: 1;
  // @while $i < 3 {
  //   .a-#{$i}{ width: $i + 'px'; }
  //   $i: $i + 1;
  // }
  // @each 循环 list类型 和 map类型
  // 循环一维list @each $i in 1, 2, 3 { }
  // 循环三维list @each $i, $ii, $iii in (1, 2, 3),(4, 5, 6) { }   $i取 1 4 $ii取 2 5 $iii取 3 6
  // 循环map      @each $key, $val in (h1: 2, h2: 4) { }
  // 函数
  // @function number($p) { @return $p + 1; }  使用 font-size: number(1) + 'px';
  .test {
    background-color: #B4B8BE;
  }
</style>
