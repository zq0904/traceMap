<template>
  <div class="header">
    <section class="top">
      <div class="img pull-left"><img :src="seller.avatar"></div>
      <div class="title pull-left">
        <h4><span></span>{{seller.name}}</h4>
        <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <!-- 父子组件传值 有数据在渲染以没有数据时防止报错 -->
        <p v-if="seller.supports">
          <span class="sellerDistance">
            <DiscountsIcon :size="24" :type="seller.supports[0].type"></DiscountsIcon>
          </span>{{seller.supports[0].description}}
        </p>
      </div>
      <a href="#" v-if="seller.supports" @click.prevent="detailShow = true">{{seller.supports.length}}个<span class="icon-keyboard_arrow_right"></span></a>
    </section>
    <section class="bottom" @click="detailShow = true">
      <p><span></span>{{seller.bulletin}}<em class="icon-keyboard_arrow_right"></em></p>
    </section>
    <div class="bg"><img :src="seller.avatar"></div>
    <transition name="details">
      <div class="container" v-show="detailShow">
        <div class="scrollZones">
          <div class="main">
            <h4>{{seller.name}}</h4>
            <Star v-if="seller.score" :size="48" :score="seller.score"></Star>
            <div class="wrap">
              <MiddleLine text="优惠信息"></MiddleLine>
            </div>
            <ul v-if="seller.supports">
              <li v-for="(item, index) in seller.supports" :key="index">
                <p>
                  <span class="sellersType">
                    <DiscountsIcon :size="32" :type="item.type"></DiscountsIcon>
                  </span>{{item.description}}
                </p>
              </li>
            </ul>
            <MiddleLine text="商家公告"></MiddleLine>
            <div class="merchantAffiche">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
          <div class="close icon-close" @click="detailShow = false"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Star from './star'
import MiddleLine from './middleLine'
import DiscountsIcon from './discountsIcon'

export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  components: {
    Star,
    MiddleLine,
    DiscountsIcon
  },
  data() {
    return {
      detailShow: false
    }
  }
}

</script>
<style lang='scss'>
@import '../../assets/scss/app';
$url: '../../assets/images/';

// 过渡
.details-enter-active,
.details-leave-active {
  transition: all 0.3s linear;
}

.details-enter,
.details-leave-to {
  opacity: 0;
}

.header {
  position: relative;
  @include px2rem(height, 268);
  @include px2rem(padding, 48 24 0 48);
  background-color: rgba(7, 17, 27, .5);
  .img img {
    @include wh(128, 128);
    @include c3(border-radius, 4px);
  }
  .title {
    @include px2rem(height, 130);
    @include px2rem(margin, 4 0 0 32);
    color: #fff;
    h4 {
      @include lh(36, 36);
      @include px2rem(margin-bottom, 16);
      @include font-dpr(32);
      span {
        @include _icon(60, 36, 0);
        @include px2rem(margin-right, 12);
        @include background-image($url + 'brand');
      }
    }
    p:nth-of-type(1) {
      @include lh(24, 24);
      @include px2rem(margin-bottom, 20);
      @include font-dpr(24);
    }
    p:nth-of-type(2) {
      @include lh(24, 24);
      @include font-dpr(20);
      .sellerDistance {
        @include px2rem(margin-right, 8);
      }
    }
  }
  a {
    position: absolute;
    @include px2rem(top, 134);
    @include px2rem(right, 24);
    @include wlh(87, 48, 48);
    @include font-dpr(20);
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, .2);
    @include c3(border-radius, 35px);
    span {
      // 真对字体图标 需要重置line-height
      @include wlh(12, 48, 48);
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    @include lh(56, 56);
    background-color: rgba(7, 17, 27, .2);
    color: #fff;
    p {
      @include px2rem(padding, 0 52 0 24);
      @include se();
      @include font-dpr(20);
      span {
        @include _icon(44, 25, 0);
        @include px2rem(margin-right, 8);
        @include background-image($url + 'bulletin');
      }
      em {
        position: absolute;
        @include px2rem(right, 24); // 不给高 重写行高 实现居中
        @include lh(56, 56);
      }
    }
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    @include c3(filter, blur(3px));
    img {
      width: 100%;
    }
  }
  .container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    /*对容器超出滚动*/
    overflow-y: auto; // 背景滤镜效果 只有 ios浏览器
    @include c3(backdrop-filter, blur(10px));
    background-color: rgba(7, 17, 27, .8);
    .scrollZones {
      position: relative;
      /*对容器超出滚动*/
      min-height: 100%;
      @include px2rem(padding, 128 0 128);
      .main {
        h4 {
          @include lh(32, 32);
          @include px2rem(margin-bottom, 32);
          text-align: center;
          font-weight: 700;
          @include font-dpr(32);
          color: #fff;
        }
        .wrap {
          @include px2rem(padding, 56 0 48);
        }
        ul {
          @include px2rem(padding, 0 0 30 96);
          li {
            @include px2rem(margin-bottom, 24);
            p {
              @include lh(32, 32);
              @include font-dpr(24);
              color: #fff;
              .sellersType {
                @include px2rem(margin-right, 12);
              }
            }
          }
        }
        .merchantAffiche {
          @include px2rem(padding, 48 96 0);
          p {
            @include px2rem(line-height, 48);
            @include font-dpr(24);
            font-weight: 200;
            color: #fff;
          }
        }
      }
      .close {
        position: absolute;
        left: 50%;
        @include px2rem(bottom, 64);
        @include c3(transform, translate(-50%));
        @include font-dpr(64);
        color: rgba(255, 255, 255, .5);
        text-align: center;
      }
    }
  }
}

</style>
