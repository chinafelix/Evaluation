<template>
  <div class="content">
    <Header title="重置密码" :back="true"></Header>

    <div class="content_box">
      <span class="tip">请设置您的新密码</span>
      <div v-if="!isShow">
        <input type="password" placeholder="请输入6-15位数字和字母组成的密码" v-model="password">
        <span class="close" @click="isShow = !isShow"></span>
      </div>
      <div v-if="isShow">
        <input type="text" placeholder="请输入6-15位数字和字母组成的密码" v-model="password">
        <span class="open" @click="isShow = !isShow"></span>
      </div>

      <div v-if="!isreShow">
        <input type="password" placeholder="请重复密码" v-model="repassword">
        <span class="close" @click="isreShow = !isreShow"></span>
      </div>
      <div v-if="isreShow">
        <input type="text" placeholder="请重复密码" v-model="repassword">
        <span class="open" @click="isreShow = !isreShow"></span>
      </div>

      <div class="login_box">
        <mt-button type="primary" size="large" @click="handleClick">确定</mt-button>
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
        password: '',
        repassword: '',
        isShow: false,        //是否显示密码
        isreShow: false,      //是否显示密码
        id: ''
      }
    },
    created(){
      this.id = this.$route.query.id;
    },
    methods:{
      handleClick(e){
        if(!common.validatePassword(this.password)){
          Toast('请输入6-15位数字和字母组成的密码！');
          return false;
        }
        if(this.password == this.repassword){
          let data = {
            token: this.id,
            password: this.password
          }
          https.resetPassword(data).then(res =>{
            if(res.success){
              this.$router.push('/login');
              Toast({
                message: '重置成功！',
                duration: 3000
              });
            }
          })
        }else {
          Toast({
            message: '两次密码不一致'
          })
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
        margin-bottom: 30px;
        &:first-child{
          margin-bottom: 30px;
        }
        &.login_box {
          margin-top: 80px;
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
          width: 60px;
          height: 60px;
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
