<!--账户设置-->
<template>
  <div class="content">
    <Header title="账户设置" :back="true"></Header>

    <div class="content_box">
      <div class="about_box large">
        <span>当前版本</span>
        <span class="gray">V1.0.1</span>
      </div>

      <div class="large about_box" @click="navigatorToAboutUs">
        <div>修改密码</div>
      </div>

      <div class="exit large" @click="exit">
        <div @click="exitAccount">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/header'

  export default {
    name: "gonggao",
    components:{Header},
    data(){
      return {

      }
    },
    created(){

    },
    methods:{
      navigatorToAboutUs(){
        this.$router.push('/modify');
      },
      exit(){
        this.$router.replace('/personal');
      },
      exitAccount(){
        sessionStorage.mobile = '';
        this.$store.dispatch('getUserData',{});
        this.$router.go(-1);
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
      >.about_box{
        background-color: #fff;
        padding: 0 30px;
        box-sizing: border-box;
        margin-top: 10px;
        height: 108px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >div{
          flex: 1;
          @include bg-image('../assets/images/xiayibu');
          background-repeat: no-repeat;
          background-position: right center;
          -webkit-background-size: auto 70%;
          background-size: auto 70%;
        }
        .gray{
          color: rgba($gray, 0.6);
        }
      }
      .exit{
        width: 100%;
        margin-top: 80px;
        padding: 0 30px;
        box-sizing: border-box;
        div{
          width: 100%;
          height: 108px;
          line-height: 108px;
          background-color: $light_blue;
          color: #fff;
          border-radius: 10px;
        }
      }
    }
  }
</style>
