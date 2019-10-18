<template>
  <div class="content">
    <Header title="登录" :deleted="true" right="注册" @handleTarget="navigatorToRegister"></Header>

    <div class="content_box">
      <div>
        <input ref="phone" type="phone" maxlength="13" placeholder="请输入手机号码" v-model="phone">
        <span v-if="phone" class="empty" @click="phone=''"></span>
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
        <div class="large" @click="login">登录</div>
      </div>
      <div>
        <div class="losed_password" @click="navigatorToLosed">忘记密码？</div>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from '../components/header'
  import https from '../assets/js/api'
  import store from '../store/index'
  import {Toast} from 'mint-ui'
  import common from '../assets/js/common'
  export default {
    name: "login",
    components: {Header},
    data(){
      return {
        phone: '',
        password: '',
        isShow: false,      //是否显示密码
      }
    },
    watch: {
      phone(newValue, oldValue){
        this.phone = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.phone.trim();
        var th=this.$refs.phone;
        common.cursorPosition(th);
      }
    },
    methods:{
      navigatorToLosed(){
        this.$router.push('/losed_password');
      },
      navigatorToRegister(){
        this.$router.push('/register');
      },
      login(){
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
          password: this.password
        };
        https.login(data).then(res =>{
          if(res.success){
            store.dispatch('getUserData',res.data);
            Toast({
              message: '登陆成功！',
              duration: 3000
            });
            this.$router.push('/personal');
          }
        })
      }
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
          right: 10px;
          top: 50%;
          width: 60px;
          height: 60px;
          transform: translateY(-50%);
          background-repeat: no-repeat;
          background-position: center center;
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
      }
    }
  }

</style>
