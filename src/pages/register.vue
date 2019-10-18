<template>
  <div class="content">
    <Header title="注册" :back="true"></Header>

    <div class="content_box">
      <div>
        <input ref="phone" type="phone" maxlength="13" placeholder="请输入手机号码" v-model="phone"">
        <span v-if="phone" class="empty" @click="phone=''"></span>
      </div>
      <div class="verification_box">
        <input type="number" placeholder="请输入短信验证码" v-model="verificationCode">
        <span v-if="isClick" @click="handleClick">{{effective_time}}</span>
        <span v-if="!isClick">{{effective_time}}</span>
      </div>
      <div v-if="!isShow">
        <input type="password" placeholder="请输入6-15位数字和字母组成的密码" v-model="password">
        <span class="close" @click="isShow = !isShow"></span>
      </div>
      <div v-if="isShow">
        <input type="text" placeholder="请输入6-15位数字和字母组成的密码" v-model="password">
        <span class="open" @click="isShow = !isShow"></span>
      </div>
      <div class="login_box">
        <div class="large" @click="register">注册</div>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from '../components/header'
  import https from '../assets/js/api'
  import {Toast} from 'mint-ui'
  import common from '../assets/js/common'
  export default {
    name: "login",
    components: {Header},
    data(){
      return {
        phone: '',
        verificationCode: '',
        password: '',
        isShow: false,      //是否显示密码
        effective_time: '获取验证码',
        time: 59,
        timer: null,
        isClick: true
      }
    },
    watch: {
      phone(newValue, oldValue){
        this.phone = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.phone.trim()
        var th=this.$refs.phone;
        common.cursorPosition(th);
      }
    },
    methods:{
      handleClick(e){     //获取验证码
        if(!common.validatePhone(common.trimAll(this.phone))){
          Toast('手机号码格式错误！');
          return false;
        }
        if(this.isClick && this.phone){
          https.getVertificationCode({mobile: common.trimAll(this.phone)}).then(res =>{
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
        }
      },
      register(){         //点击注册
        if(!common.validatePhone(common.trimAll(this.phone))){
          Toast('手机号码格式错误！');
          return false;
        }
        if(!common.validatePassword(this.password)){
          Toast('请输入6-15位数字和字母组成的密码！');
          return false;
        }
        let data = {
          mobile: common.trimAll(this.phone),
          smsCode: this.verificationCode,
          password: this.password
        };
        https.register(data).then(res =>{
          if(res.success){
            this.$router.go(-1);
            Toast({
              message: '注册成功！',
              duration: 3000
            })
          }
        })
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
      padding: 60px 30px 0 30px;
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
          &.open {
            @include bg-image('../assets/images/xianshi');
          }
          &.close {
            @include bg-image('../assets/images/icon-test-2');
          }
          &.empty{
            @include bg-image('../assets/images/icon-test');
            -webkit-background-size: 40%;
            background-size: 40%;
          }
        }
        .losed_password{
          color: $orange;
          text-align: right;
          padding-top: 40px;
        }
        &.verification_box{
          margin-bottom: 30px;
          span {
            color: $orange;
          }
        }
      }
    }
  }

</style>
