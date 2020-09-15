<template>
<div style="height:100%">
    <div class="cityContainer" ref="scrollWrap">
         <section id="city-list" class="city-list-container" style="display: block;" >
    <section>
      <div id="locate" class="city-title">定位城市</div>
      <div class="city-list city-list-inline clearfix">
        <div class="location-city">定位失败，请点击重试</div>
      </div>
    </section>

    <section class="history-city-list"></section>

    <section>
      <div id="hot" class="city-title">热门城市</div>
      <div class="city-list city-list-inline clearfix">
        <div class="city-item" 
            v-for="item in datalist.hotCities" :key="item.id"
            @click="toWhere(item)"
        >{{item.name}}</div>
      </div>
    </section>

    <section>
        <template v-for="(city,key) in datalist.cities">
            <div :id="key" :key="key" class="city-title city-title-letter">{{key}}</div>
            <div class="city-list city-list-block clearfix">
                <div class="city-item"
                v-for="(item,index) in city" :key="index" @click="toWhere(item)">
                    {{item.name}}
                </div>
            </div>
        </template>
    </section>

    
  </section>
    </div>
   
  <section class="nav">
      <div class="nav-item" data-id="locate" @click="go('locate')">定位</div>

      <div class="nav-item" data-id="hot" @click="go('hot')">热门</div>

      <div class="nav-letter nav-item" data-id="A"
        v-for="(city,key) in datalist.cities" :key="key"
        @touchmove="move" :ref="key"
      >{{key}}</div>
    </section>
</div>
</template>

<script>
// 引入axios方法
import {get} from '@/api/http'
// 引入滚动方法
import BScroll from "@better-scroll/core";
export default {
    data(){
        return {
            datalist:{
                hotCities:[],
                cities:[]
            }

        }
    },
    // 获取city中的数据
    async created(){
        let rs = await get('/cities.json');
        console.log(rs)
        this.datalist.hotCities = rs.data.hotCities;
        this.datalist.cities = rs.data.cities;

        // 页面渲染完成后实现滚动
        this.$nextTick(()=>{
            this.initScroll();
        })
    },
      methods:{
        toWhere(item){
            this.$store.commit('setCityName',item);
            this.$router.go(-1);
        },
        move(event){
            // console.log(event)
            // 获取当前点击的标签的坐标Y值
            let currentY = event.touches[0].pageY
            // 获取A到顶部的高度
            let topA = this.$refs.A[0].getBoundingClientRect().top;
            // 获取一个字母的高度
            let height = this.$refs.A[0].getBoundingClientRect().height;
            // 获取索引值
            let index = Math.floor((currentY - topA) / height);
            // 获取当前字母
            let letter = Object.keys(this.datalist.cities)[index];
            console.log(letter)

            // 添加同时滚动事件
            if(letter){
                this.bscroll.scrollToElement(document.querySelector(`#`+letter),500)
            }
            
        },
        initScroll(){
            this.bscroll = new BScroll(this.$refs.scrollWrap, {
                click:true,
                scrollY : true
            })
        },
        // 点击去往指定位置
        go(location){
            this.bscroll.scrollToElement(document.querySelector(`#`+location),500)
        }
    },
}
</script>

<style lang="scss" scoped>
.cityContainer{
  height: 100%;
  overflow: hidden;
}

.city-list-container {
    display: none;
    background-color: #ebebeb;
    font-size: 14px;
    color: #333;
}

.clearfix:after {
    content: " ";
    display: table;
    clear: both
}

.city-title {
    padding-left: 15px;
    line-height: 30px
}

.city-title-letter {
    padding-left: 25px
}

.city-list {
    padding-right: 30px
}

.city-list-inline {
    background-color: #f5f5f5;
    padding-bottom: 8px
}

.city-list-inline .city-item,.city-list-inline .location-city {
    float: left;
    background: #fff;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 4%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.city-list-inline .location-city {
    width: auto;
    min-width: 30%;
    padding: 0 20px
}

.city-list-block {
    background-color: #f5f5f5
}

.city-list-block .city-item {
    height: 44px;
    line-height: 44px;
    margin-left: 15px;
    border-bottom: 1px solid #c8c7cc
}

.city-list-block .city-item:last-child {
    border-bottom: none
}

.nav {
    position: fixed;
    top: 75px;
    top: 11vh;
    right: 0;
    width: 35px;
    z-index: 10;
    text-align: center;
    font-size: 12px
}

.nav .nav-item {
    height: 16px;
    height: 2.8vh
}

.nav .nav-letter {
    width: 15px;
    margin-left: 15px
}
</style>