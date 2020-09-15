<template>
  <div>
    <a href="#" name="box"></a>
    <div class="top-first">
      <router-link to="/city"  class="icon1" @click="toCity()">
        {{$store.state.city.name}}
        <!-- <span class="iconfont icon-shenglvehao"></span> -->
      </router-link>
      <input type="text" placeholder="护肤套装" />
      <div class="icon2">
         <span class="iconfont icon-sousuo"></span>
      </div>
    </div>
    <div class="top-second"></div>
    <div class="top-third" ref="rowScroll">
      <ul :style="{width:getWidth}">
        <QuickList v-for="item in datalist" :key="item.productId" :item="item"></QuickList>
      </ul>
    </div>
    <div class="title-top"></div>
    <div class="title-second">
      <div class="title-one">
        <img src="../../../assets/images/24.jpg" alt />
        <p>薇诺娜2.9折抢</p>
      </div>
      <div class="title-two">
        <img src="../../../assets/images/25.jpg" alt />
        <p>佳洁士39元抢</p>
      </div>
      <div class="title-three">
        <img src="../../../assets/images/26.jpg" alt />
        <p>枕头39元抢</p>
      </div>
    </div>
    <div class="title-ad"></div>
    <div class="list" id="boxFixed" :class="{'is_fixed' : isFixed}">
      <div class="list-left">
        <ul>
          <!-- <router-link tag="li" to="{path:'/quick/overseas/aaa',query:items}" v-for="items in leftlist" :key="items.moduleId"> -->
          <!-- <router-link tag="li" :to="'/quick/'+items.moduleId" v-for="items in leftlist" :key="items.moduleId"> -->
          <li
            @click="$router.push('/quick/'+items.moduleId)"
            v-for="items in leftlist"
            :key="items.moduleId"
          >
            <p>{{items.moduleName}}</p>
          </li>

          <!-- </router-link> -->
        </ul>
      </div>
      <div class="list-right">
        <h2>C位精选</h2>
        <div class="list-right-content">
          <ul>
            <router-link
              tag="li"
              to="/quick/2536"
              :class="activeClass == index ? 'active':''"
              v-for="(item,index) in toplist"
              @click.native="clickHandle(item,index)"
              :key="item.moduleId"
            >{{item.moduleName}}</router-link>
          </ul>
          <router-view></router-view>
        </div>
        <div class="list-right-content-second">
          <ul>
            <router-link
              tag="li"
              to="/quick/2536"
              :class="activeClass == index ? 'active':''"
              v-for="(item,index) in toplist"
              @click.native="clickHandle(item,index)"
              :key="item.moduleId"
            >{{item.moduleName}}</router-link>
          </ul>
          <router-view></router-view>
        </div>
        <div>
          <ul class="text">
            <LeftList v-for="(item,index) in getList" :data="item" :key="index"></LeftList>
          </ul>
        </div>
      </div>
    </div>
    <a href="#box">
      <div class="up">
      <a class="iconfont icon-huidingbu"></a>
      <span>顶部</span>
    </div>
    </a>
    
  </div>
</template>

<script>
// 导入top li
import QuickList from "@/views/quick/center/QuickList";
// 导入 left li
import LeftList from "@/views/quick/center/LeftList";
// import ExtrCenter from "@/views/quick/center/ExtrCenter";
// 导入axios请求方式
import { get } from "@/api/http";
// 导入滚动
import BScroll from "@better-scroll/core";
export default {
  components: {
    QuickList,
    LeftList,
    // ExtrCenter
  },
  data() {
    return {
      // 滚动数组
      datalist: [],
      // TopList数组
      toplist: [],
      // listLeft数组
      leftlist: [],
      // leftContent数组
      leftContentlist: {},
      // 显示背景
      activeClass: 0,

      isFixed: false,
      offsetTop: 0,
    };
  },
  created() {
    this.getQuickData();
    this.getTopList();
    this.listLeft();
    this.leftContent();
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  computed: {
    getWidth() {
      return 30 * this.datalist.length + "vw";
    },
    mount() {
      return this.$route.params.id;
    },
    getList() {
      // this.$route.params.id;
      let id = this.$route.params.id || "2356";
      return this.leftContentlist[id];
    },
  },
  methods: {
    // 吸顶
    initHeight() {
      //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
      this.offsetTop = document.querySelector("#boxFixed").offsetTop;
      // console.log(this.offsetTop);
      let scrollTop = parseInt(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      // console.log(document.querySelector('.list-right-content-second'))
      if (scrollTop >= this.offsetTop + 79) {
        document.querySelector(".list-right-content-second").style.display =
          "block";
        document.querySelector(".up").style.display = "block";
      } else {
        document.querySelector(".list-right-content-second").style.display =
          "none";
        document.querySelector(".up").style.display = "none";
      }
    },
    // 横向滚动
    async getQuickData() {
      let rs = await get("/api/firstProducts");
      // console.log(rs);
      this.datalist = rs.data;

      // 确保DOM生成完毕
      this.$nextTick(() => {
        this.init();
      });
    },
    init() {
      // 第二次时不需要重新创建实例 要刷新确保滑动正常
      if (this.bs) {
        this.bs.refresh();
        return;
      }
      this.bs = new BScroll(this.$refs.rowScroll, {
        scrollX: true,
        probeType: 3, // listening scroll hook
      });
    },

    // topList头部数据获取
    async getTopList() {
      let rs = await get("/api/data");
      // console.log(rs);
      this.toplist = rs.data.moduleList;
      // console.log(this.toplist)
    },

    // listLeft左部数据获取
    async listLeft() {
      let rs = await get("/api/listLeft");
      // console.log(rs);
      this.leftlist = rs.data.moduleList;
      // console.log(this.leftlist);
    },

    // 点击TopList变底纹背景位粉色
    clickHandle(item,index) {
      // console.log(index);
      this.activeClass = index;
      this.$router.push('/quick/'+item.moduleId)
    },

    // 右边的内容leftContent
    async leftContent() {
      let rs = await get("/api/leftContent");
      console.log(rs);
      this.leftContentlist = rs.data;
    },
  
    // 去往城市页面
    toCity(){
      
    }
  },
};
</script>

<style lang="scss" scoped>
.top-first {
  background: url("../../../assets/images/02.jpg");
  background-size: cover;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  input {
    width: 325px;
    height: 30px;
    border: none;
    padding-left: 20px;
    box-sizing: border-box;
     border-radius: 3px;
    margin: 0 3px;
    font-size: 12px;
    color: #6d6d70;
  }
  .icon1{
    width: 67px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background: white;
    text-align: center;
    font-size: 14px;
    .icon-shenglvehao{
      font-size: 20px;
      background: rgba(88, 69, 69, 0.5);
      color: white;
      border-radius: 50%;
      margin: 0 3px;
    }
  }
  .icon2{
    width: 37px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background: white;
    margin-right: 4px;
    .icon-sousuo{
      font-size: 18px;
      color: black;
      margin: 0 3px;
    }
  }
  
  
}
.top-second {
  height: 139.5px;
  background: url("../../../assets/images/00.jpg");
  background-size: cover;
}
.top-third {
  height: 258px;
  background: url("../../../assets/images/01.png");
  background-size: cover;
  overflow: hidden;
  ul {
    width: 355px;
    height: 200px;
    margin-top: 50px;
    margin-left: 10px;
    display: flex;
  }
}
.title-top {
  height: 38px;
  background: url("../../../assets/images/22.jpg");
  background-size: cover;
}
.title-second {
  background: url("../../../assets/images/23.jpg");
  background-size: cover;
  height: 175px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 12px;
    position: absolute;
    top: 146px;
  }
  img {
    width: 112px;
    height: 112px;
  }
  .title-one {
    width: 112px;
    height: 160px;
    img {
      position: absolute;
      top: 12px;
      left: 16px;
    }
    p {
      margin-left: 12px;
    }
  }
  .title-two {
    width: 112px;
    height: 160px;
    img {
      position: absolute;
      top: 12px;
      left: 131px;
    }
    p {
      margin-left: 18px;
    }
  }
  .title-three {
    width: 112px;
    height: 160px;
    img {
      position: absolute;
      top: 12px;
      left: 246px;
    }
    p {
      margin-left: 26px;
    }
  }
}
.title-ad {
  height: 44.5px;
  background: url("../../../assets/images/27.jpg");
  background-size: cover;
}
.list {
  border: 2px dashed pink;
  border-radius: 20px;
  margin: 0 auto;
  background: white;
  position: relative;
  display: flex;
  .list-left {
    width: 50px;
    position: sticky;
    top: 0;
    font-size: 8px;
    ul {
      position: sticky;
      top: 0;
    }
    li {
      width: 50px;
      height: 64px;
      p {
        width: 25px;
        height: 64px;
        margin-left: 12px;
        padding-top: 20px;
        box-sizing: border-box;
      }
    }
  }
  .list-right {
    position: relative;
    width: 325px;
    color: rgb(0, 0, 0);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    h2 {
      font-size: 14px;
      width: 320px;
      height: 16px;
      margin-left: 4px;
      padding-left: 6px;
      font-weight: 200;
      border-left: 2px solid black;
      color: rgb(65, 64, 64);
    }
    .list-right-content {
      position: sticky;
      top: 0;
      height: 79px;
      ul {
        padding-top: 7px;
        width: 325px;
        height: 72px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 72px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 1px solid rgb(243, 64, 133);
          font-size: 12px;
          border-radius: 2px;
        }
      }
    }
    .list-right-content-second {
      display: none;
      position: fixed;
      top: 0;
      right: 0;
      height: 79px;
      background: white;
      ul {
        padding-top: 7px;
        width: 325px;
        height: 72px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 72px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 1px solid rgb(243, 64, 133);
          font-size: 12px;
          border-radius: 2px;
        }
      }
    }
    .text {
      background: rgb(238, 238, 238);
    }
  }
}
.is_fixed {
  position: fixed;
  top: 0;
  z-index: 999;
}
.active {
  background-color: rgb(243, 64, 133);
  color: white;
}
.up {
  display: none;
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  a {
    width: 40px;
    // height: 10px;
    height: 2.66667vw;
    line-height: 7.66667vw;
    display: inline-block;
    margin: 0;
    padding: 0;
  }
  .icon-huidingbu {
    font-size: 16px;
    color: white;
  }
  span {
    color: white;
    font-size: 8px;
    display: inline-block;
  }
}
</style>