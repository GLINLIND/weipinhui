<template>
    <li>
        <div class="listImg">
            <img :src="item.smallImage" alt="">
            <div class="count">
                <em>限量</em> 
                <em>{{item.quotaVO.totalQuota}}件</em>
            </div>
            <div class="time">
                <div>距结束</div> 
                <div><van-count-down millisecond :time="time" format="HH:mm:ss:SS" /></div>
                <!-- <div class="timegif"></div> -->
            </div>
        </div>
        
        <p>{{item.productName}}</p>
        <div class="bac">
            <div class="price">¥{{item.priceTipsVO.vipshopPrice}}</div> 
            <div class="dec">直降<br>{{item.priceTipsVO.vipshopPrice-item.priceTipsVO.specialPrice}}元</div> 
            <div class="price">¥{{item.priceTipsVO.vipshopPrice}}</div>
        </div>
        <div class="last">
            <p class="font">¥<span>{{item.priceTipsVO.specialPrice}}</span></p> 
            <p class="buy">马上抢</p>
        </div>
    </li>
</template>

<script>
export default {
    props:['item'],
     data() {
        return {
        time: 60 * 60 * 1000,
        };
    },
}
</script>

<style lang="scss" scoped>
li{
    width: 108px;
    height: 194px;
    margin-right: 6px;
    .listImg{
        position: relative;
        img{
            width: 103px;
            height: 103px;
        }
        .count{
            width: 38px;
            height: 32px;
            text-align: center;
            font-size: 4px;
            color: white;
            position: absolute;
            top: 0;
            left: 6px;
            background:url('../../../assets/images/05.png');
            background-size: cover;
        }
        .time{
            width: 150px;
            height: 15px;
            background-color: #e21397;
            color: white;
            font-size: 8px;
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            .timegif{
                width: 10px;
                height: 10px;
                background:url('../../../assets/images/04.gif');
                background-size: cover;
            }
        }
    }
    
    p{
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 103px;
    }
    .bac{
        background:url('../../../assets/images/03.png');
        background-size: cover;
        width: 98.5px;
        height: 39px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
        .price{
            margin-top: 10px;
        }
        .dec{
            font-size: 10px;
            color: white;
        }
    }
    .last{
        display: flex;
        width: 108px;
        height: 25.5px;
        .font{
            color: #e21397;
            font-size: 22px;
        }
        .buy{
            background-color: #e21397;
            color: white;
            font-size: 12px;
            width: 80px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            margin-top: 6px;
        }
    }
}
</style>