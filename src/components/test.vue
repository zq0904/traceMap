<template>
  <div clsas="test">
    <!-- <input id="input" :pass="123" type="text" v-model="test.testInfo.a"> -->
    <!-- <ul>
      <li v-for="item in test.testArr" :key="item">{{ item }}</li>
    </ul>
    <button @click="splice">splice testArr</button> -->
    <!-- <form id="root" @submit.prevent="submit">
      <input type="text" reg="registerPwd" pass="pass"><br>
      <input type="text" reg="bankCard,identity"><br>
      <input type="text" reg="site"><br>
      <span reg="loginPwd">123456</span><br>
      <p class="pp" reg="loginPwd">12345</p>
      <button>提交表单vuex regex校验</button>
    </form> -->
    <!-- <img src="../assets/images/Aimer.jpg" height="50" width="50" alt="">
    <p>{{ message }}</p>
    <p>number:{{ number }}</p>
    <p>store: {{test}}</p>
    <p>getTestArrLength: {{getTestArrLength}}</p>
    <button @click="increment">action</button>
    <p>
      <span class="glyphicon glyphicon-user"></span>
      <span class="el-icon-success"></span>
    </p> -->
    <!-- 测试bootstrap -->
    <!-- <ul class="pagination">
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
    </ul> -->
    <!-- 测试element-ui -->
    <!-- <el-progress type="circle" :percentage="number" status="success"></el-progress> -->
    <!-- D3测试 -->
    <svg id="fillgauge" width="250" height="250"></svg>
    <div id="container"></div>
  </div>
</template>
<script>
// import _ from 'lodash'
// import $ from 'jquery'
// import moment from 'moment'
// import zepto from 'zepto'
// import { mapState, mapGetters, mapActions } from 'vuex'
import { mapGetters, mapActions } from 'vuex'
// import { isMobile } from '../lib/until'
// import { Base64 } from 'js-base64'
import { liquidFillGaugeDefaultSettings, loadLiquidFillGauge } from '../lib/liquidFillGauge'
import Highcharts from 'highcharts'

export default {
  data() {
    return {
      // message: '测试信息',
      // number: 0,
      config: {} // D3 配置项
    }
  },
  computed: {
    // 测试 state
    // ...mapState([
    //   'test'
    // ]),
    // ...mapGetters([
    //   'getTestArrLength'
    // ])
    ...mapGetters({
      test: 'getTest',
      regex: 'getRegex'
    })
  },
  async created() {
    // // 测试 promis
    // console.log(await this.p())
    // // 测试lodash
    // console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
    // // 测试 $
    // console.log($('body'))
    // // 测试moment
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    // // 测试zepto
    // console.log(zepto('body'))
    // // 测试element-ui
    // setInterval(this.add, 100)
    // // 测试代理 测试$http
    // const data = await this.$http.get('/proxy/topics')
    // console.log(data)
    // 测试自己封装的$fetch
    // const {data} = await this.$fetch({
    //   type: 'post',
    //   url: '/cc/data/airList',
    //   data: {
    //     a: 'asd',
    //     b: 'asdasd'
    //   }
    // })
    // console.log(data)
    // const {data: name} = await this.$http.get('/proxy/airMap')
    // console.log(name)
    // console.log(this.test)
    // setTimeout(() => this.mergeTest({
    //   testArr: [6, 6, 6, 8], // 数组 merge按照 索引
    //   testInfo: {
    //     a: 2,
    //     b: '测试1'
    //   },
    //   a: 1
    // }), 5000)
    // this.replaceTestArr({ a: 1 })
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
    // 测试是否是 手机
    // this.$nextTick(() => {
    //   window.alert(isMobile())
    // })
    this.$nextTick(() => {
      this.initD3()
      this.initHigcharts()
    })
  },
  methods: {
    ...mapActions([
      'mergeTest',
      'replaceTestArr',
      'spliceTestArr'
    ]),
    initD3() {
      this.config = liquidFillGaugeDefaultSettings()
      this.config.minValue = 0 // 测量最小值
      this.config.maxValue = 200 // 测量最大值
      // this.config.circleThickness = 0.05 // 外圆的厚度是半径的百分数
      this.config.circleFillGap = 0.01 // 外圈和波圈之间的间隙大小是外圆半径的百分比
      // this.config.circleColor = '#178BCA' // 外圆的颜色
      // this.config.waveHeight = 0.05 // 波高是波圆半径的百分数
      // this.config.waveCount = 1 // 波圈每宽度的全波数
      // this.config.waveRiseTime = 1000 // 波从0上升到它的最终高度的毫秒数
      this.config.waveAnimateTime = 1000 // 整个波进入波圈的毫秒数
      // this.config.waveRise = true // 控制如果波从0上升到它的高度，或者从它的高度开始
      // this.config.waveHeightScaling = true
      // this.config.waveAnimate = true // 控制波浪滚动或静止
      // this.config.waveColor = '#178BCA' // 填充波的颜色
      // this.config.waveOffset = 0 // 初始偏移量。0 =没有抵消。1 =一个全波的偏移。
      this.config.textVertPosition = 0.5 // 文本距离底部百分比
      this.config.textSize = 1 // 在波圈中显示的文本的相对高度。1 = 50%
      // this.config.valueCountUp = true // 如果是true，则显示的值将从0计数到加载后的最终值。如果是false，则显示最终值。
      this.config.displayPercent = false // 如果是true，则在值之后显示%符号
      // this.config.textColor = '#045681' // 当波不重叠时，值文本的颜色
      // this.config.waveTextColor = '#A4DBf8' // 当波重叠时，数值文本的颜色
      // 自定义
      this.config.lineWidth = 3 // 线的宽度
      // this.config.lineInterval = 5 // 虚线间隔
      this.config.lineColor = '#ff4444' // 线颜色
      this.config.lineText = '警戒线文本1' // 警戒线文本
      this.config.lineTextSize = 16 // 警戒线文本大小
      this.config.lineTextColor = '#ff4444' // 警戒线文本颜色
      loadLiquidFillGauge('fillgauge', 100, 100, this.config) // svgID, 当前值, 考核值, 配置项
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
          // Define the data points. All series have a dummy year
          // of 1970/71 in order to be compared on the same x axis. Note
          // that in JavaScript, months start at 0 for January, 1 for February etc.
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
    // submit() {
    //   // 截取手机号
    //   // console.log('12345678901'.match(this.$store.state.regex.echoPhone))
    //   const checkInfo = this.check('#root', 'span, .pp')
    //   if (checkInfo) {
    //     this.$message(checkInfo)
    //     return
    //   }
    //   console.log('校验通过走请求')
    // }
    // splice() {
    //   this.replaceTestArr([5, 4, 3])
    // }
    // add() {
    //   if (++this.number === 101) {
    //     this.number = 0
    //   }
    // },
    // // 测试promis
    // async p() {
    //   return 1
    // }
    // increment() {
    //   this.$store.dispatch('INCREMENT')
    // }
    // // 测试 actions
    // ...mapActions([
    //   'increment'
    // ])
  }
}

</script>
<style lang='scss'>
/*测试scss*/
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

</style>
