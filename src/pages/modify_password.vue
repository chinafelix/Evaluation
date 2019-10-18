<template>
  <div class="content">
    <Header title="修改密码" :back="true"></Header>

    <div class="content_box">
      <span class="tip">手机号：{{hidePhone}}</span>
      <div class="">
        <input type="number" placeholder="请输入短信验证码" v-model="verificationCode">
        <span v-if="isClick" @click="handleClick">{{effective_time}}</span>
        <span v-if="!isClick">{{effective_time}}</span>
      </div>

      <div class="login_box">
        <div class="large" @click="nextStep">下一步</div>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from '../components/header'
  import {Toast} from 'mint-ui'
  import https from '../assets/js/api'
  import common from "../assets/js/common";

  export default {
    name: "login",
    components: {Header},
    data(){
      return {
        phone: '',
        hidePhone: '',
        effective_time: '获取验证码',
        time: 59,
        verificationCode: '',
        timer: null,
        isClick: true
      }
    },
    created(){
      this.phone = sessionStorage.mobile;
      this.hidePhone = common.desensitization(this.phone,3,7);
    },
    methods:{
      handleClick(e){
        https.getResetVerCode({mobile: this.phone}).then(res =>{
          if(res.success){
            Toast({
              message: '验证码已发送',
              // position: 'bottom',
              duration: 3000
            });

            this.isClick = false;
            this.effective_time = `${this.time}s`;
            this.timer = setInterval(()=>{
              if(this.time>0){
                this.time --;
                this.effective_time = `${this.time}s`;
              }else {
                clearInterval(this.timer);
                this.effective_time = '获取验证码';
                this.time = 59;
                this.isClick = true;
              }
            },1000);
          }
        })

      },
      nextStep(){
        if(!this.isClick && this.verificationCode) {
          let data = {
            mobile: this.phone,
            smsCode: this.verificationCode
          };
          https.validVerCode(data).then(res =>{
            if(res.success){
              this.$router.push({path: '/reset', query: {id: res.data}});
            }
          });
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
  .content {
    @include content_flex;
    >.content_box{
      padding: 0 30px 0 30px;
      .tip{
        display: block;
        height: 90px;
        line-height: 90px;
        text-align: left;
        color: rgba($gray, 0.69);
      }
      >div{
        width: 100%;
        position: relative;
        &:first-child{
          margin-bottom: 30px;
        }
        &.login_box {
          margin-top: 80px;
          .large{
            width: 100%;
            height: 1.44rem;
            line-height: 1.44rem;
            background-color: #01A3FE;
            color: #fff;
            border-radius: 0.133333rem;
          }
        }
        input{
          width: 100%;
          height: 108px;
          line-height: 108px;
          background-color: #fff;
          box-sizing: border-box;
        }
        .mint-button {
          line-height: 108px;
          height: 108px;
        }
        span{
          position: absolute;
          right: 30px;
          top: 50%;
          min-width: 60px;
          height: 60px;
          line-height: 60px;
          transform: translateY(-50%);
          background-repeat: no-repeat;
          background-position: right center;
          -webkit-background-size: 50%;
          background-size: 50%;
          color: $orange;
          &.open {
            @include bg-image('../assets/images/xianshi');
          }
          &.close {
            @include bg-image('../assets/images/icon-test-2');
          }
        }
        .losed_password{
          color: $orange;
          text-align: right;
          padding-top: 40px;
        }
      }
    }
  }

</style>
