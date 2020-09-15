<template>
  <div class="content">
    <div class="icon-first">
      <van-icon name="arrow-left" class="icons" @click="back()" />
    </div>
    <div class="icon-second">
      <span class="iconfont icon-fenxiang"></span>
      <span class="iconfont icon-zhuanfa" @click="showShare = true"></span>
    </div>
    <div>
      <van-swipe :autoplay="3000">
        <!-- <van-swipe-item v-for="(image, index) in images" :key="index"> -->
        <van-swipe-item v-for="n in 6" :key="n">
          <!-- <img v-lazy="image" /> -->
          <img :src="item.squareImage" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="shop">
      <div class="shop-first">
        <span>￥{{item.priceTipsVO.specialPrice}}</span>
        <del>￥{{item.priceTipsVO.marketPrice}}</del>
        <span>{{item.priceTipsVO.discount}}折</span>
      </div>
      <div class="shop-second">
        <img src="../../assets/images/35.jpg" alt />
        <p>{{item.stockVO.bossChosenDesc}}</p>
      </div>
    </div>
    <div class="product-name">
      <p class="name-box">{{item.productName}}</p>
      <div class="haitao-wrapper">
        <span class="brand-name">{{item.brandVO.brandName}}</span>
      </div>
    </div>
    <div class="size">
      <p>规格</p>
      <span class="iconfont icon-duigou"></span>
      <p>均码</p>
    </div>
    <div class="brand">
      <span>商品参数</span>
      <span>层数、包装、国产进口等</span>
    </div>
    <div class="aftersale">
      <span class="iconfont icon-duihao"></span>
      <b>商家发货及售后</b>
      <span class="iconfont icon-duihao"></span>
      <b>7天无理由退货</b>
      <span class="iconfont icon-gantanhao"></span>
      <b>不支持换货</b>
    </div>
    <div class="shops">
      <div class="shop-first">
        <img :src="item.smallImage" alt />
        <span>{{item.brandVO.brandName}}官方旗舰店</span>
      </div>
      <div class="shop-second">
        <span>进入店铺</span>
      </div>
    </div>
    <div class="detail">
      <p>图文详情</p>
    </div>
    <div>
      <img :src="item.squareImage" alt />
    </div>
    <!-- <div class="bag2"></div>
    <div class="bag3"></div>
    <div class="bag4"></div>-->
    <div class="bottom">
      <span class="iconfont icon-kefu"></span>
      <span class="iconfont icon-gouwuche"></span>
      <span>加入购物车</span>
    </div>
    <van-share-sheet v-model="showShare" @click="show()" title="立即分享给好友" :options="options" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      // 显示转发
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      count: 0,
      isLoading: false,
    };
  },
  computed: {
    item() {
      return this.$route.query;
    },
  },
  methods: {
    back() {
      history.go(-1);
    },
    show() {
      this.$store.commit("setMenu", false);
    },
     onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  img {
    width: 100%;
    height: 375px;
  }
  .icon-first {
    z-index: 1;
    position: absolute;
    left: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    .icons {
      font-size: 20px;
      color: white;
      margin-top: 10px;
    }
  }
  .icon-second {
    z-index: 1;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 83px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    .icon-fenxiang {
      font-size: 25px;
      margin-right: 5px;
      color: rgb(255, 0, 85);
    }
    .icon-zhuanfa {
      font-size: 28px;
    }
  }
  .shop {
    height: 74px;
    background: url("../../assets/images/36.jpg");
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0 10px;
    margin-bottom: 10px;
    .shop-first {
      span:first-of-type {
        font-size: 26px;
        margin-right: 4px;
      }
      del {
        font-size: 14px;
        color: #d8d4d4;
        margin-right: 4px;
      }
      span:nth-of-type(2) {
        font-size: 14px;
        color: #d8d4d4;
      }
    }
    .shop-second {
      img {
        width: 69px;
        height: 18px;
        margin-left: 80px;
        margin-bottom: 8px;
      }
      p {
        font-size: 12px;
        margin-left: 50px;
      }
    }
  }
  .product-name {
    height: 77px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name-box {
      width: 345px;
      font-size: 14px;
      margin-left: 15px;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
    .haitao-wrapper {
      width: 345px;
      margin-left: 15px;
      font-size: 14px;
      color: blue;
    }
  }
  .size {
    height: 102px;
    position: relative;
    border-top: 1px solid lightgray;
    p:first-of-type {
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      padding-left: 15px;
      padding-top: 20px;
      box-sizing: border-box;
      margin-bottom: 16px;
    }
    p:last-of-type {
      width: 105px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #de3d96;
      font-size: 12px;
      margin-left: 15px;
    }
    .icon-duigou {
      font-size: 18px;
      color: #de3d96;
      position: absolute;
      left: 103px;
      top: 67px;
    }
  }
  .brand {
    border-top: 1px solid lightgrey;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    box-sizing: border-box;
    span:first-of-type {
      font-size: 14px;
      font-weight: 600;
      margin-right: 30px;
    }
    span:last-of-type {
      font-size: 12px;
    }
  }
  .aftersale {
    border-top: 1px solid lightgray;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    box-sizing: border-box;
    span {
      font-size: 12px;
      margin: 5px;
    }
    .icon-duihao {
      font-size: 14px;
      color: #de3d96;
    }
    b {
      font-weight: normal;
      font-size: 12px;
    }
  }
  .shops {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    width: 375px;
    height: 90px;
    display: flex;
    padding-left: 15px;
    align-items: center;
    .shop-first {
      display: flex;
      width: 261px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      img {
        width: 50px;
        height: 40px;
      }
    }
    .shop-second {
      width: 64px;
      height: 23px;
      line-height: 23px;
      border: 1px solid #de3d96;
      text-align: center;
      border-radius: 3px;
      span {
        font-size: 12px;
      }
    }
  }
  .detail {
    height: 53px;
    line-height: 53px;
    padding-left: 15px;
    p {
      font-size: 12px;
      font-weight: 600;
    }
  }
  .bag1 {
    background: url("../../assets/images/40.jpg");
    height: 590px;
    width: 100%;
    background-size: cover;
  }
  .bag2 {
    background: url("../../assets/images/41.jpg");
    height: 590px;
    width: 100%;
    background-size: cover;
  }
  .bag3 {
    background: url("../../assets/images/42.jpg");
    height: 590px;
    width: 100%;
    background-size: cover;
  }
  .bag4 {
    background: url("../../assets/images/43.jpg");
    height: 590px;
    width: 100%;
    background-size: cover;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    span:last-of-type {
      width: 203px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      color: white;
      background: #de3d96;
      border-radius: 20px;
    }
    .iconfont {
      font-size: 26px;
    }
    .icon-kefu {
      width: 42px;
      height: 42px;
      line-height: 42px;
      text-align: center;
    }
    .icon-gouwuche {
      width: 86px;
      height: 42px;
      line-height: 42px;
      text-align: center;
    }
  }
}
</style>