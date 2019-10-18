<template>
  <div class="content">
    <Header title="订单支付" :back="true" confirm="您的订单尚未支付，是否要离开当前页面？"></Header>
    <div class="content_box">

      <div class="box">
        <div class="order_num">订单号：{{info.id}}</div>

        <div class="info">
          <div class="ticket">
            <p class="large">{{info.ticketName}}</p>
            <p class="larger">待支付</p>
          </div>
          <div class="time">
<!--            剩余支付时间：{{time}}-->
          </div>
        </div>

        <div class="common">
          <p class="large">游玩时间</p>
          <p class="large">{{info.playTime.slice(0,10)}}</p>
        </div>
        <div class="common">
          <p class="large">购买张数</p>
          <p class="large">{{info.amount}}张</p>
        </div>
        <div class="common">
          <p class="large">购买单价</p>
          <p class="orange large">{{info.totalSum/info.amount}}元</p>
        </div>

      </div>

      <div class="title large">选择支付方式</div>

      <div class="methods">
        <div class="item" v-for="(item,index) in lists" :key="index">
          <div class="left">
            <img :src="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
            <span class="small">优惠</span>
<!--            <span class="notes" @click="popupVisible=true"></span>-->
          </div>
          <div class="right" :class="{active: isActive==item.id}" @click="selectPay(item)"></div>
        </div>
      </div>

    </div>
    <div class="bottom">
      <div class="large">应付：{{info.totalSum}}元</div>
      <div class="large" @click="unionPay">立即支付</div>
    </div>


    <mt-popup
      v-model="popupVisible"
      style="width: 100%;"
      position="bottom">
      <div class="action_box large">
        <p class="title">活动说明</p>
        <p class="time">活动时间：每周六、周日（上午10点至23点）按时交付埃及记淡饭黄齑萨福克</p>
        <p class="obj">活动对象：工行金卡持有人</p>
        <p class="ctt">活动内容：不是多空看我破服务方面我们拍东方网破科普外科陪我玩开盘文件物品剧哦我玩具我们我们舞女你放技能为您服务分泌物蜂窝网</p>
        <div class="btn_sure">确定</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>

  import { Popup, MessageBox, Toast } from 'mint-ui';
  import Header from '../components/header'
  import https from '../assets/js/order_api'
  import {mapState} from 'vuex'

  export default {
    name: "payment",
    components:{Header},
    data(){
      return {
        info: {},           //订单信息
        isActive: 1,        //渲染选中的支付方式
        current: {},        //选中的支付方式
        total: 0,
        order_num: '33303039382',         //订单号
        name: '[门票]十三陵',
        time: '29分钟49秒',
        play_time: '2019-02-01',
        tickets_num: 0,
        price: 0,
        lists: [
          {
            id: 1,
            name: '云闪付',
            avatar: require('../assets/images/yinlianyunshanfu@3x.png'),
            offer: true,    //优惠
            info: true      //须知
          },
        ],
        popupVisible: false
      }
    },
    computed: mapState(['orderInfo']),
    created(){
      this.info = this.orderInfo;
      if(this.info.palyTime && !this.info.palyTime){this.info.playTime = this.info.palyTime};
    },
    methods:{
      selectPay(obj){
        this.isActive = obj.id;
        this.current = obj;
      },
      unionPay(){         //立即支付
        https.unionPay(this.info.id).then(res =>{
          this.finalPayment(res.data);
        })
      },
      // isUnionAppInstall(id){      //识别云闪付API是否安装
      //   const me = this;
      //   cordova.plugins.LantuUnionPay.isUnionAppInstalled((res)=>{
      //     if(res){
      //       me.finalPayment(id);
      //     }else{
      //       Toast(JSON.stringify(res));
      //     }
      //   });
      // },
      finalPayment(id){
        const me = this;
        cordova.plugins.LantuUnionPay.pay({
          tn: id,
          mode: '01'
        },(res)=>{       //成功会掉
          if(res.code=='success'){      //
            // Toast('支付成功');
            me.$router.replace({path: '/availabled', query:{type: false}})
          }else {
            Toast('支付失败');
            me.$router.go(-1);
          }
        },(err)=>{       //失败回调
          Toast('已取消支付');
          me.$router.go(-1);
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
.content{
  @include content_flex;
  .content_box{
    text-align: left;
    .box{
      .order_num{
        height: 100px;
        line-height: 100px;
        margin-top: 10px;
        padding: 0 30px;
      }
      .info{
        padding: 30px;
        .ticket{
          display: flex;
          justify-content: space-between;
          p{
            &:last-child{
              color: $light_blue;
            }
          }
        }
        .time{
          color: rgba($gray, 0.6);
          padding-top: 10px;
        }
      }
      .common{
        height: 100px;
        line-height: 100px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        p{
          &:last-child{
            color: rgba($gray, 0.6);
          }
          &.orange{
            color: $orange;
          }
        }
      }
      >div{
        background-color: #fff;
        &:not(:last-child){
          @include border-1px(#eee);
        }
      }
    }

    .title{
      height: 80px;
      line-height: 80px;
      padding: 0 30px;
      background-color: #fff;
      margin-top: 10px;
    }
    .methods{
      .item{
        height: 120px;
        margin-top: 10px;
        box-sizing: border-box;
        padding: 30px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        .left{
          display: flex;
          align-items: center;
          img {
            width: 70px;
            height: 70px;
          }
          .name{
            margin: 0 28px 0 20px;
          }
          .small{
            color: #fff;
            background-color: $orange;
            padding: 0px 6px;
            border-radius: 3px;
          }
          .notes{
            width: 34px;
            height: 34px;
            @include bg-image('../assets/images/asmkticon0239');
            background-repeat: no-repeat;
            -webkit-background-size: contain;
            background-size: contain;
            margin-left: 20px;
          }
        }
        .right{
          width: 60px;
          height: 60px;
          @include bg-image('../assets/images/weixuanzhong');
          -webkit-background-size: 80% auto;
          background-size: 80% auto;
          background-repeat: no-repeat;
          background-position: center center;
          &.active{
            @include bg-image('../assets/images/xuanzhong-1');
          }
        }
      }
    }

  }

  .action_box{
    box-sizing: border-box;
    padding: 30px;
    color: rgba($gray, 0.6);
    text-align: left;
    .title{
      color: #343434;
    }
    .time{
      padding: 30px 0;
    }
    .ctt{
      padding: 30px 0 60px;
    }
    .btn_sure{
      text-align: center;
      height: 108px;
      line-height: 108px;
      background-color: $light_blue;
      color: #fff;
      border-radius: 8px;
    }
  }
}
  .bottom{
    height: 112px;
    line-height: 112px;
    background-color: #fff;
    display: flex;
    >div{
      flex: 1;
      &:first-child{
        color: #FF8500;
      }
      &:last-child{
        background-color: #FF8500;
        color: #fff;
      }
    }
  }
</style>
