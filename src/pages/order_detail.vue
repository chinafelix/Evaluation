<!--景区须知页-->
<template>
  <div class="content">
    <Header title="订单详情" :back="true"></Header>

    <div class="content_box">
      <div class="box">
        <div class="title">
          <div class="text_box">
            <p class="large">{{detail.ticketName}}</p>
            <p class="small">游玩时间：{{detail.palyTime}}</p>
          </div>
          <div class="mini_box">
            <div class="circle left"></div>
            <div class="square">
              <div></div><div></div><div></div>
              <div></div><div></div><div></div>
              <div></div><div></div><div></div>
              <div></div><div></div>
              <div></div><div></div><div></div>
            </div>
            <div class="circle right"></div>
          </div>
        </div>

        <div class="info_box">

          <div class="ticket_title">
            <p class="large bold">取门票</p>
            <p class="color">{{detail.statusName}}</p>
          </div>

          <div class="qrcode">
            <img :src="detail.avatar" alt="" class="code">
            <p>门票{{detail.amount}}张</p>
            <img v-if="id==0||id==-1" src="../assets/images/bukeyong@3x.png" alt="" class="status">
            <img v-if="id==2" src="../assets/images/yishiyong-3@3x.png" alt="" class="status">
          </div>

          <div class="order_number common border-orange">
            <span>订单号</span>
            <span>{{detail.id}}</span>
          </div>

          <div class="common code border-orange">
            <span>验证码</span>
            <span>{{detail.validCode}}</span>
          </div>


          <div class="circle left_circle"></div>
          <div class="circle right_circle"></div>
          <div class="circle bottom_right"></div>
          <div class="circle bottom_left"></div>
        </div>

        <div class="money_box">
          <div class="circle left"></div>
          <div class="circle right"></div>

          <div class="customer_info">
            <div class="bold">取票人信息</div>
            <div class="info_detail">
              <span>姓名：</span>
              <span>{{detail.conactName}}</span>
            </div>
            <div class="info_detail special">
              <span>身份证号：</span>
              <span>{{detail.conactIdCardNo}}</span>
            </div>
            <div class="info_detail">
              <span>电话：</span>
              <span>{{detail.conactMobile}}</span>
            </div>
          </div>

          <div class="customer_info">
            <div class="bold">
              <span>实付金额</span>
              <span>￥{{detail.totalSum}}</span>
            </div>
            <div class="info_detail">
              <span>预定时间：</span>
              <span>{{detail.orderTime}}</span>
            </div>
            <div class="info_detail" v-if="id!=0">
              <span>付款时间：</span>
              <span>{{detail.payTime}}</span>
            </div>
            <div class="info_detail" v-if="id==2">
              <span>使用时间：</span>
              <span>{{detail.used_time}}</span>
            </div>
<!--            <div class="info_detail" v-if="id==-1">-->
<!--              <span>取消时间：</span>-->
<!--              <span>{{detail.cancel_time}}</span>-->
<!--            </div>-->
          </div>

        </div>

      </div>

    </div>

    <div class="pay_btn" v-if="id==0">
      <div class="large">应付：{{detail.totalSum}}元</div>
      <div class="large" @click="handleBuyer(detail)">立即支付</div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/header'
  import server from '../assets/js/serve'
  import https from '../assets/js/order_api'

  export default {
    name: "order_detail",
    components:{Header},
    data(){
      return {
        // status: ['待支付','已支付','已使用','已取消'],
        id: 1,        //0:待支付，1：已支付，2：已使用，-1已取消
        order_id: '',     //订单id
        // currentStatus: '',
        total: 800,
        detail:{},
      }
    },
    created(){
      this.id = this.$route.query.type;
      this.order_id = this.$route.query.id;
      // this.currentStatus = this.status[parseInt(this.id)-1];

      this.getTicket_detail();
    },
    methods:{
      getTicket_detail(){
        https.getTicket_detail(this.order_id).then(res=>{
          if(res.success){
            this.detail = res.data;
            this.detail.avatar = `${server}/api/file/imageCode/${res.data.validCode}.png?w=234&h=234&m=1`;
          }
        })
      },
      handleBuyer(item){      //立即支付
        this.$store.dispatch('getOrderInfo', item);
        this.$router.push('/payment');
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
      box-sizing: border-box;
      padding: 40px 30px 30px;
      .bold{
        font-weight: 700;
      }
      .box{
        .circle{
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background-color: #F5F8F9;
          z-index: 999;
          &.left{
            left: -20px;
          }
          &.right{
            right: -20px;
          }
        }
          .title{
          height: 206px;
          background-color: $light_blue;
          border-radius: 20px;
          color: #fff;
          display: flex;
          flex-direction: column;
          .text_box{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p:first-child{
              font-weight: 500;
              margin-bottom: 10px;
            }
          }
          .mini_box{
            height: 20px;
            padding: 0 40px;
            display: flex;
            position: relative;
            overflow: hidden;
            .square{
              flex: 1;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              >div{
                width: 28px;
                height: 4px;
                border-radius: 2px;
                background-color: #F5F8F9;
              }
            }
          }
        }

        .info_box{
          overflow: hidden;
          background-color: #fff;
          border-radius: 20px;
          padding: 40px;
          box-sizing: border-box;
          position: relative;

          .ticket_title{
            display: flex;
            justify-content: space-between;
            .color{
              color: $light_blue;
            }
            margin-bottom: 50px;
          }
          .qrcode{
            width: 300px;
            margin: 0 auto;
            height: 326px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            img.code{
              width: 234px;
              height: 234px;
            }
            p{
              margin-top: 20px;
              color: rgba($gray, 0.6);
            }
            .status{
              position: absolute;
              width: 166px;
              height: 124px;
              top: 0;
              right: 0;
            }
          }

          .common{
            height: 90px;
            line-height: 90px;
            /*border: 1px solid #ddd;*/
            border-radius: 10px;
            padding: 0 30px;
            text-align: left;
            margin-top: 50px;
            span:last-child{
              margin-left: 54px;
            }
            &.code{
              margin-bottom: 42px;
            }
          }

          .left_circle{
            left: -20px;
            top: -20px;
          }
          .right_circle{
            top: -20px;
            right: -20px;
          }
          .bottom_left{
            left: -20px;
            bottom: -20px;
          }
          .bottom_right{
            bottom: -20px;
            right: -20px;
          }
        }

        .money_box{
          position: relative;
          padding: 0 40px;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 20px;
          >.circle{
            top: -20px;
          }
          .customer_info{
            border-top: 2px dashed #eee;
            padding: 60px 0;
            box-sizing: border-box;
            text-align: left;
            .bold{
              margin-bottom: 40px;
              display: flex;
              justify-content: space-between;
              span:last-child{
                color: $orange;
              }
            }
            .info_detail{
              color: rgba($gray, 0.6);
              display: flex;
              align-items: center;
              &:not(:last-child){
                margin-bottom: 20px;
              }
              span{
                &:first-child{
                  width: 160px;
                }
                &:last-child{
                  flex: 1;
                }
              }

            }
          }
        }
      }

    }

    .pay_btn {
      height: 112px;
      line-height: 112px;
      background-color: #fff;
      display: flex;
      > div {
        flex: 1;

        &:first-child {
          color: #FF8500;
        }
        &:last-child {
          background-color: #FF8500;
          color: #fff;
        }
      }
    }

  }
</style>
