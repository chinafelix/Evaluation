<!--关于我们-->
<template>
  <div class="content">
    <Header title="关于我们" :back="true"></Header>

    <div class="content_box">
      <div class="about_box">
        <div class="avatar">
          <img src="../assets/images/mipmap-xxxhdpi.png" width="100%" alt="">
        </div>
        <p>明十三陵</p>
        <p class="small">v1.0.1</p>
      </div>

      <div class="opinion large" @click="navigatorToAboutUs">
        <div>意见反馈</div>
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
        this.$router.push('/opinion');
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
      >div{
        background-color: #fff;
        padding: 0 30px;
        box-sizing: border-box;
      }
      .about_box{
        width: 100%;
        height: 290px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        >div{
          width: 120px;
          height: 120px;
          background-color: #eee;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .small{
          color: rgba($gray, 0.6);
          margin-top: 10px;
        }
      }
      .opinion{
        margin-top: 10px;
        height: 116px;
        text-align: left;
        display: flex;
        align-items: center;
        >div{
          flex: 1;
          @include bg-image('../assets/images/xiayibu');
          background-repeat: no-repeat;
          background-position: right center;
          -webkit-background-size: auto 70%;
          background-size: auto 70%;
        }
      }
    }
  }
</style>
