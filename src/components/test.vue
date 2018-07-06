<template>
  <div class="test">
    <div class="home">
      <section class="home-title">
        <h4 class="home-title-h4">Hi, 张三</h4>
        <p class="home-title-p">上次登录时间: 12小时24分钟前</p>
      </section>
      <section class="home-wrap">
        <section class="home-amount">
          <div class="home-amount-left">
            <div class="home-amount-left-item" v-for="e in 8">
              <div class="home-amount-left-item-p">
                <h6 class="home-amount-left-item-p-h6">昨日报警数</h6>
                <span class="home-amount-left-item-p-span">7<em class="home-amount-left-item-p-span-em">次</em></span>
              </div>
            </div>
          </div>
          <div class="home-amount-right" id="home-carousel">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(e, i) in fillgaugeCount" :key="i">
                <svg :id="'fillgauge' + i " width="146" height="146"></svg>
                <h6 class="swiper-slide-h6">剩余排放吨数</h6>
                <div class="swiper-slide-div">
                  <p class="swiper-slide-div-p1">12<em class="swiper-slide-div-p1-em">吨</em></p>
                  <p class="swiper-slide-div-p2">预计剩余</p>
                  <p class="swiper-slide-div-p2">1小时59分59秒</p>
                </div>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </section>
        <section class="home-linepic"></section>
      </section>
    </div>
    <!-- D3测试 -->

    <!-- highcharts测试 -->
    <div id="container" v-if="false"></div>
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
import { liquidFillGaugeDefaultSettings, loadLiquidFillGauge } from '../lib/liquidFillGauge'
import Highcharts from 'highcharts'
import Swiper from 'swiper'

export default {
  data() {
    return {
      config: {}, // D3 配置项
      fillgaugeCount: [1, 2, 3]
    }
  },
  computed: {
    ...mapGetters({
      test: 'getTest',
      regex: 'getRegex'
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
    this.$nextTick(() => {
      this.initD3()
      // this.initHigcharts()
      this.initSwiper()
    })
  },
  methods: {
    ...mapActions([
      'mergeTest',
      'replaceTestArr',
      'spliceTestArr'
    ]),
    initSwiper() {
      this.swiper = new Swiper('#home-carousel', {
        // loop: true, // 由于 D3 渲染只能使用id 顾循环不能开启
        grabCursor: true, // 抓手
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true, // 动态页码
          clickable: true // 可点击
        }
      })
    },
    initD3() {
      this.config = liquidFillGaugeDefaultSettings() // 获取基础配置
      this.config.minValue = 0 // 测量最小值
      this.config.maxValue = 200 // 测量最大值
      this.config.circleThickness = 0.02 // 外圆的厚度是半径的百分数
      this.config.circleFillGap = 0 // 外圈和波圈之间的间隙大小是外圆半径的百分比
      this.config.circleColor = '#19D3FF' // 外圆的颜色
      // this.config.waveHeight = 0.05 // 波高是波圆半径的百分数
      // this.config.waveCount = 1 // 波圈每宽度的全波数
      // this.config.waveRiseTime = 1000 // 波从0上升到它的最终高度的毫秒数
      this.config.waveAnimateTime = 2000 // 整个波进入波圈的毫秒数
      // this.config.waveRise = true // 控制如果波从0上升到它的高度，或者从它的高度开始
      // this.config.waveHeightScaling = true
      // this.config.waveAnimate = true // 控制波浪滚动或静止
      this.config.waveColor = 'rgba(52, 125, 266, .7)' // 填充波的颜色
      // this.config.waveOffset = 0 // 初始偏移量。0 =没有抵消。1 =一个全波的偏移。
      this.config.textVertPosition = 0.5 // 文本距离底部百分比
      this.config.textSize = 1 // 在波圈中显示的文本的相对高度。1 = 50%
      // this.config.valueCountUp = true // 如果是true，则显示的值将从0计数到加载后的最终值。如果是false，则显示最终值。
      this.config.displayPercent = false // 如果是true，则在值之后显示%符号
      this.config.textColor = 'rgba(0, 0, 0, 0)' // 当波不重叠时，值文本的颜色
      this.config.waveTextColor = 'rgba(0, 0, 0, 0)' // 当波重叠时，数值文本的颜色
      // 自定义
      this.config.isShowLine = false // 不显示警戒线
      // this.config.lineValue = 100, // 警戒线考核值
      this.fillgaugeCount.forEach((e, i) => {
        loadLiquidFillGauge('fillgauge' + i, 100, this.config) // svgID, 当前值, 配置项
      })
    },
    initHigcharts() {
      Highcharts.chart('container', {
        chart: {
          type: 'spline'
        },
        title: {
          text: '某地积雪厚度监测'
        },
        subtitle: {
          text: '非规律性时间内的变化'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: null
          }
        },
        yAxis: {
          title: {
            text: '积雪 厚度 (m)'
          },
          min: 0
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true
            }
          }
        },
        series: [{
          name: '2007-2008 冬',
          data: [
            [Date.UTC(1970, 9, 27), 0],
            [Date.UTC(1970, 10, 10), 0.6],
            [Date.UTC(1970, 10, 18), 0.7],
            [Date.UTC(1970, 11, 2), 0.8],
            [Date.UTC(1970, 11, 9), 0.6],
            [Date.UTC(1970, 11, 16), 0.6],
            [Date.UTC(1970, 11, 28), 0.67],
            [Date.UTC(1971, 0, 1), 0.81],
            [Date.UTC(1971, 0, 8), 0.78],
            [Date.UTC(1971, 0, 12), 0.98],
            [Date.UTC(1971, 0, 27), 1.84],
            [Date.UTC(1971, 1, 10), 1.80],
            [Date.UTC(1971, 1, 18), 1.80],
            [Date.UTC(1971, 1, 24), 1.92],
            [Date.UTC(1971, 2, 4), 2.49],
            [Date.UTC(1971, 2, 11), 2.79],
            [Date.UTC(1971, 2, 15), 2.73],
            [Date.UTC(1971, 2, 25), 2.61],
            [Date.UTC(1971, 3, 2), 2.76],
            [Date.UTC(1971, 3, 6), 2.82],
            [Date.UTC(1971, 3, 13), 2.8],
            [Date.UTC(1971, 4, 3), 2.1],
            [Date.UTC(1971, 4, 26), 1.1],
            [Date.UTC(1971, 5, 9), 0.25],
            [Date.UTC(1971, 5, 12), 0]
          ]
        }, {
          name: '2008-2009 冬',
          data: [
            [Date.UTC(1970, 9, 18), 0],
            [Date.UTC(1970, 9, 26), 0.2],
            [Date.UTC(1970, 11, 1), 0.47],
            [Date.UTC(1970, 11, 11), 0.55],
            [Date.UTC(1970, 11, 25), 1.38],
            [Date.UTC(1971, 0, 8), 1.38],
            [Date.UTC(1971, 0, 15), 1.38],
            [Date.UTC(1971, 1, 1), 1.38],
            [Date.UTC(1971, 1, 8), 1.48],
            [Date.UTC(1971, 1, 21), 1.5],
            [Date.UTC(1971, 2, 12), 1.89],
            [Date.UTC(1971, 2, 25), 2.0],
            [Date.UTC(1971, 3, 4), 1.94],
            [Date.UTC(1971, 3, 9), 1.91],
            [Date.UTC(1971, 3, 13), 1.75],
            [Date.UTC(1971, 3, 19), 1.6],
            [Date.UTC(1971, 4, 25), 0.6],
            [Date.UTC(1971, 4, 31), 0.35],
            [Date.UTC(1971, 5, 7), 0]
          ]
        }, {
          name: '2009-2010 冬',
          data: [
            [Date.UTC(1970, 9, 9), 0],
            [Date.UTC(1970, 9, 14), 0.15],
            [Date.UTC(1970, 10, 28), 0.35],
            [Date.UTC(1970, 11, 12), 0.46],
            [Date.UTC(1971, 0, 1), 0.59],
            [Date.UTC(1971, 0, 24), 0.58],
            [Date.UTC(1971, 1, 1), 0.62],
            [Date.UTC(1971, 1, 7), 0.65],
            [Date.UTC(1971, 1, 23), 0.77],
            [Date.UTC(1971, 2, 8), 0.77],
            [Date.UTC(1971, 2, 14), 0.79],
            [Date.UTC(1971, 2, 24), 0.86],
            [Date.UTC(1971, 3, 4), 0.8],
            [Date.UTC(1971, 3, 18), 0.94],
            [Date.UTC(1971, 3, 24), 0.9],
            [Date.UTC(1971, 4, 16), 0.39],
            [Date.UTC(1971, 4, 21), 0]
          ]
        }]
      })
    }
  }
}

</script>
<style lang='scss'>
@import '../assets/scss/app';
  .home {
    background-color: #fff;
    &-title {
      padding-left: 20px;
      height: 97px;
      &-h4 {
        height: 54px;
        line-height: 54px;
        font-size: 24px;
        font-weight: 600;
        color: #333333;
      }
      &-p {
        padding-top: 10px;
        height: 42px;
        font-size: 14px;
        color: #999999;
      }
    }
    &-wrap {
      padding: 20px 20px 0;
      background-color: #F5F7FA;
    }
    &-amount {
      @include c3(display, flex);
      &-left {
        @include c3(flex, 1);
        @include c3(display, flex);
        @include c3(flex-wrap, wrap);
        &-item {
          @include c3(flex, 0 0 25%);
          width: 25%;
          padding-right: 20px;
          margin-bottom: 20px;
          &-p {
            padding-left: 20px;
            height: 100px;
            background-color: #fff;
            &-h6 {
              height: 50px;
              line-height: 50px;
              font-size: 14px;
              color: #333;
            }
            &-span {
              font-size: 30px;
              color: #0087FF;
              &-em {
                font-size: 14px;
                color: #333;
              }
            }
          }
        }
      }
      &-right {
        position: relative;
        overflow: hidden;
        width: 220px;
        height: 220px;
        border-radius: 4px;
        background-image: linear-gradient(to top, #534ADF, #1D9EEB);
        .swiper-slide {
          position: relative;
          padding: 37px;
          &-h6 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 37px;
            line-height: 37px;
            font-size: 14px;
            color: #fff;
            text-align: center;
          }
          &-div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 37px;
            text-align: center;
            &-p1 {
              padding: 32px 0 0;
              height: 78px;
              font-size: 36px;
              color: #fff;
              &-em {
                font-size: 14px;
              }
            }
            &-p2 {
              height: 22px;
              line-height: 22px;
              font-size: 12px;
              color: #fff;
            }
          }
        }
      }
    }
    &-linepic {}
  }
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
