<template>
    <li class="content">
        <div class="img"><img :src="data.smallImage" @click="toDetail(data)" alt=""></div>
        <div class="right">
          <img :src="data.brandVO.brandLogo" alt="">
          <p class="mask">{{data.sellingPoint}}</p>
          <p class="num">{{data.productName}}</p>
          <p class="add">{{data.stockVO.bossChosenDesc}}</p>
          <div class="last">
            <div class="price">
              <span>{{data.priceTipsVO.specialPriceName}}</span>
              <span>￥{{data.priceTipsVO.specialPrice}}</span>
            </div>
            <div class="buy"></div>
          </div>
        </div>
    </li>
</template>

<script>
export default {
    props:['data'],
    methods:{
        toDetail(data){
            this.$router.push({path:'/detail',query:data});
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    width: 315px;
    height: 135px;
    display: flex;
    margin-bottom: 6px;
    background: white;
    .img{
        width: 125px;
        img{
            width: 125px;
            height: 125px;
            margin: 10px;
        }
    }
    .right{
        width: 176.5px;
        height: 140px;
        margin-left: 18px;
        margin-top: 10px;
        img{
            width: 39px;
            height: 20px;
        }
        .mask{
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        .num{
            height: 20px;
            line-height: 20px;
            font-weight: 400;
            font-size: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            margin-bottom: 5px;
        }
        .add{
            width: 120px;
            color: #e8178b;
            font-size: 12px;
            text-align: center;
            background-color: hsla(0,0%,100%,.9);
            border: 1px solid #f03867;
            height: 15px;
            line-height: 15px;
            border-radius: 8px;
            margin-bottom: 8px;
        }
        .last{
            display: flex;
            .price{
                width: 99px;
                height: 23px;
                line-height: 23px;
                text-align: center;
                background:url('../../../assets/images/21.jpg');
                background-size: cover;
                color: white;
                font-size: 14px;
                border-radius: 5px;
            }
            .buy{
                width: 30px;
                height: 30px;
                background:url('../../../assets/images/19.jpg');
                background-size: cover;
                margin-left: 34px;
            }
        }
    }
}
</style>