<template>
  <div class="goods">
    <div class="goods_type">
      <ul>
        <li v-for="(item, index) in goods" :class="{on: getIndex===index}" :key="index" @click="selectDetail(index, $event)" class="goods_type_li">
          <p class="goods_son">
            <span v-if="item.type >= 0" class="goodsOffset">
              <DiscountsIcon :size="24" :type="item.type" solid="solid"></DiscountsIcon>
            </span>{{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <div class="goods_detail">
      <ul class="goods_right">
        <li v-for="(item, index) in goods" :key="index" class="jsSelect">
          <h5 class="title">{{item.name}}</h5>
          <ul>
            <li v-for="(e,i) in item.foods" :key="i" class="goods_item">
              <div class="goods_line">
                <img v-lazy="e.icon" class="goods_img">
                <div class="goods_info">
                  <h6 class="goods_name">{{e.name}}</h6>
                  <p class="goods_description" v-if="e.description">{{e.description}}</p>
                  <p class="goods_volume">
                    <span class="goods_sellCount">月售{{e.sellCount}}份</span>
                    <span>好评率{{e.rating}}%</span>
                  </p>
                  <p class="goods_prices">
                    <span class="goods_price"><em class="yen">&yen;</em>{{e.price}}</span>
                    <span class="goods_oldPrice" v-if="e.oldPrice"><em class="yen">&yen;</em>{{e.oldPrice}}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import DiscountsIcon from '../common/discountsIcon'

const resOk = 1

export default {
  components: {
    DiscountsIcon
  },
  data() {
    return {
      goods: [],
      heights: [],
      scrollY: 0
    }
  },
  async created() {
    const { data } = await this.$http.get('/proxy/goods')
    if (data.status !== resOk) return
    this.goods = data.data
    console.log(data)
    // 保证整个视图都渲染完毕 在去调用
    this.$nextTick(() => {
      this._initBScroll()
      this._getHeights()
    })
  },
  computed: {
    // 监听scrollY 当前那个索引 高亮
    getIndex() {
      let index = 0
      for (let i = 0; i < this.heights.length; i++) {
        if (this.scrollY >= this.heights[i] && i !== this.heights.length - 1) {
          index = i
        }
      }
      // this.goodsLeft.scrollTo(0, -this.heights[index], 300)
      return index
    }
  },
  methods: {
    // 初始化 better-scroll
    _initBScroll() {
      // 挂载到vue实例上 方便使用
      this.goodsLeft = new BScroll('.goods_type', {
        click: true // 默认会阻止浏览器的原生 click 事件 要使用需开启
      })
      this.goodsRight = new BScroll('.goods_detail', { probeType: 3 })
      this.goodsRight.on('scroll', pos => {
        this.scrollY = -pos.y
      })
    },
    // 获取每个li的累积高 添加到数组中
    _getHeights() {
      const lis = document.querySelectorAll('.jsSelect')
      let sum = 0
      this.heights.push(sum)
      for (let i = 0; i < lis.length; i++) {
        sum += lis[i].clientHeight
        this.heights.push(sum)
      }
    },
    // 选择详细
    selectDetail(index, $event) {
      if ($event._constructed) { // better-scroll派发的click事件 会多这么一个属性为true 只执行派发的click 而不执行 原声的click事件
        this.goodsRight.scrollTo(0, -this.heights[index], 300)
      }
    }
  }
}

</script>
<style lang="scss">
// 从这里开始考虑 css渲染性能问题 1.嵌套最好不要超过3层 2.关键选择器尽量使用类选择器
@import '../../assets/scss/app';

.goods {
  // 定位的元素 同时设置 top bottom 可以限定范围
  @include c3(display, flex);
  position: absolute;
  @include px2rem(top, 348);
  @include px2rem(bottom, 96);
  width: 100%;
  overflow: hidden;
  .goods_type {
    @include flex-basis(160); // flex实现的2拦布局
  }
  .goods_detail {
    @include c3(flex, 1);
  }
}

.goods_type_li {
  display: table;
  width: 100%;
  @include lh(108, 28);
  @include px2rem(padding, 0 24);
  @include font-dpr(24);
  background-color: #f3f5f7;
  &.on {
    position: relative;
    top: -1px;
    background-color: #fff;
    .goods_son {
      font-weight: 700;
    }
    .goods_son::before {
      display: none;
    }
  }
  &:last-of-type .goods_son::before {
    display: none;
  }
  .goods_son {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    color: #07111B;
    @include border(rgba(7, 17, 21, .1));
  }
  .goodsOffset {
    @include px2rem(margin-right, 4);
  }
}

.goods_right {
  .title {
    position: relative;
    @include lh(52, 52);
    @include px2rem(padding-left, 24);
    @include font-dpr(26);
    background-color: #F3F5F7;
    color: #93999F;

    @include border(#D9DDE1, 2, left)
  }
  .goods_item {
    @include px2rem(padding, 36 36 0);
    .goods_line {
      display: flex;
      @include border(rgba(7, 17, 27, .1));
      @include px2rem(padding-bottom, 36);
    } // 去掉最后一个
    &:last-of-type .goods_line::before {
      display: none;
    }
  }

  .goods_img {
    @include flex-basis(114);
    @include wh(114, 114);
    @include px2rem(margin-right, 20);
  }
  .goods_info {
    flex: 1;
  }
  .goods_name {
    @include px2rem(line-height, 28);
    @include px2rem(margin, 4 0 10);
    @include font-dpr(28);
    color: rgb(7, 17, 27);
  }
  .goods_description,
  .goods_volume {
    @include px2rem(line-height, 29);
    @include px2rem(margin-bottom, 10);
    @include font-dpr(20);
    color: #93999F;
  }
  .goods_volume {
    @include px2rem(margin-bottom, 0);
  }
  .goods_sellCount {
    @include px2rem(margin-right, 24);
  }
  .goods_prices {
    @include lh(48, 48);
    font-weight: 700;
    .goods_price {
      @include px2rem(margin-right, 16);
      @include font-dpr(28);
      color: #F01414;
    }
    .goods_oldPrice {
      @include font-dpr(20);
      color: rgb(147, 153, 159);
    }
    .yen {
      @include font-dpr(20);
      font-weight: normal;
      vertical-align: bottom;
    }
  }
}

</style>
