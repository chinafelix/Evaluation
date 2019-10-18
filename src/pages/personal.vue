<!--个人中心-->
<template>
  <div class="content">
    <div class="content_box">
      <div class="info_box">
        <div class="left">
          <img :src="personInfo.avatar" alt="">
          <span>{{personInfo.name}}</span>
        </div>
        <div class="right">
          <p>公司名称：{{companyName}}</p>
          <p>所在城市：{{personInfo.city}}</p>
          <p>VIP会员：{{personInfo.time}}</p>
        </div>
        <p class="change" @click="handleShow">
          <img src="../assets/images/change.png" width="20" alt="">
        </p>
      </div>

      <div class="manager">
        <div @click="navigatorToCustomer" class="border-gray">
          <p class="fabu">发布测评</p>
          <span></span>
        </div>
        <div @click="navigatorToEva" class="border-gray">
          <p class="ceping">测评报告</p>
          <span></span>
        </div>
        <div @click="navigatorToScore" class="border-gray">
          <p class="shiyong">使用积分（每日签到奖励5积分）</p>
          <span></span>
        </div>
        <div @click="navigatorToPayRecoding" class="border-gray">
          <p class="zhifu">支付记录（申请发票）</p>
          <span></span>
        </div>
        <div @click="navigatorToCustomer" class="border-gray">
          <p class="caozuo">操作说明</p>
          <span></span>
        </div>
        <div @click="navigatorToCustomer" class="border-gray">
          <p class="baogao">报告样例（示范）</p>
          <span></span>
        </div>
        <div @click="navigatorToCustomer" class="border-gray">
          <p class="wode">我的二维码（推荐使用）</p>
          <span></span>
        </div>
      </div>

    </div>

    <Nav :is-active="3"></Nav>

    <div v-show="visible" class="mask"></div>
    <div class="my_modal" v-show="visible">
      <p class="border-gray">信息</p>
      <div>
        <span>公司名称：</span>
        <input type="text" v-model="name">
      </div>
      <div class="footer">
        <p @click="visible = false;">取 消</p>
        <p>确 定</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from '../components/nav'
  import https from '../assets/js/api'
  import {mapState} from 'vuex'
  import common from '../assets/js/common'
  export default {
    name: "customer",
    components: {Nav},
    data(){
      return{
        visible: false,
        isLogin: false,
        personInfo: {
          name: '小信鸽',
          avatar: require('../assets/images/touxiang@3x.png'),
          city: '邵阳',
          time: '2019-12-20'
        },
        companyName: 'aaa公司',
        name: '',
      }
    },
    computed: mapState(['userInfo']),
    created(){
      if(!this.companyName) {
        this.visible = true;
      }
      if(this.userInfo.token) {
        this.getUserInfo();
      }
    },
    methods:{
      handleShow(){
        this.name = this.companyName;
        this.visible = true;
      },
      navigatorToCustomer(){    //发布测评
        this.$router.push({path: '/customer',query: {source: true}})
      },
      navigatorToEva(){     //测评报告
        this.$router.push({path: '/customer_add',query: {source: true}})
      },
      navigatorToScore(){
        this.$router.push({path: '/news_list',query: {source: true}})
      },
      navigatorToPayRecoding(){
        this.$router.push({path: '/buyer_notice',query: {source: true}})
      },
      getUserInfo(){
        https.getUserInfo({}).then(res =>{
          if(res.success){
            this.isLogin = true;
            this.personInfo = res.data;
            sessionStorage.mobile = res.data.mobile;
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
  .content{
    background-color: #F5F8F9;
    @include content_flex;
    .content_box{
      .info_box{
        position: relative;
        margin-bottom: 15px;
        height: 400px;
        display: flex;
        flex-direction: row;
        color: #fff;
        background: #f00;
        background: -moz-linear-gradient(left,  #f00 0%, #f60 100%);
        background: -webkit-gradient(linear, top left, top right, color-stop(0%,#f00), color-stop(100%,#f60));
        background: -webkit-linear-gradient(left,  #f00 0%,#f60 100%);
        background: -o-linear-gradient(left,  #f00 0%,#f60 100%);
        background: -ms-linear-gradient(left,  #f00 0%,#f60 100%);
        background: linear-gradient(to right,  #f00 0%,#f60 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f00', endColorstr='#f60',GradientType=0 );
        >div{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .left{
          width: 40%;
          img{
            width: 100px;
          }
          span {
            margin-top: 20px;
          }
        }
        .right{
          align-items: flex-start;
          width: 60%;
          p{
            line-height: 60px;
          }
        }
        .change{
          position: absolute;
          right: 50px;
          top: 50px;
          background-color: rgba(0, 0, 0, .2);
          width: 70px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }
      }
      .manager{
        background-color: #fff;
        margin-bottom: 10px;
        >div{
          height: 116px;
          line-height: 116px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          
          p {
            flex: 1;
            display: flex;
            align-items: center;
            text-align: left;
            background-repeat: no-repeat;
            background-position: 0 center;
            -webkit-background-size: auto 40%;
            background-size: auto 40%;
            padding-left: 66px;
            &.fabu{
              @include bg-image('../assets/images/liuliang');
            }
            &.ceping{
              @include bg-image('../assets/images/ceping');
            }
            &.shiyong{
              @include bg-image('../assets/images/shiyong');
            }
            &.zhifu {
              @include bg-image('../assets/images/zhifujilu');
            }
            &.caozuo{
              @include bg-image('../assets/images/caozuo');
            }
            &.baogao{
              @include bg-image('../assets/images/baogao');
            }
            &.wode {
              @include bg-image('../assets/images/wode');
            }
          };
          span {
            @include arr_up(rgba(#343434, 0.5), 45deg);
          }
        }
      }

    }
    .mask{
      position: fixed;
      z-index: 10;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .4);
    }
    .my_modal{
      width: 70%;
      // height: 350px;
      z-index: 11;
      border-radius: 20px;
      border: 1px solid #aaa;
      background-color: #fff;
      // box-shadow: 0 0 20px 5px #C5C8C9;
      border: 1px solid #000;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      transition: all 1s;
      p{
        line-height: 100px;
        text-align: left;
        padding: 0 30px;
        font-weight: 700;
      }
      div{
        padding: 50px 30px;
        display: flex;
        input {
          width: 60%;
          border-bottom: 1px solid #ccc;
        }
        span {
          width: 40%;
        }
        &.footer {
          padding: 0;
          height: 100px;
          border-top: 1px solid #ccc;
          p {
            line-height: 100px;
            text-align: center;
            flex: 1;
            &:first-child {
              border-right: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
</style>
