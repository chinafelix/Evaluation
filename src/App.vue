<template>
  <div id="app">
<!--    <transition name="slide">-->
<!--    <transition name="fade" mode="out-in">-->
      <router-view/>
<!--    </transition>-->

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import nav from "./components/nav";
export default {
  name: 'App',
  mounted() {
    var self = this;
    let time = '';
    document.addEventListener("deviceready", onDeviceReady, false);
    // PhoneGap加载完毕
    function onDeviceReady() {
      //按钮事件
      document.addEventListener("backbutton", eventBackButton, false); //返回键
    }

    //返回键
    function eventBackButton() {
      if(self.$route.fullPath == "/" || self.$route.fullPath == "/personal"|| self.$route.fullPath == "/buyer"){
        if(time) {
          navigator.app.exitApp();
        }else {
          time = new Date().getTime();
          Toast('再次点击退出');
        }
        //1秒后重新注册
        var intervalID = window.setInterval(
          function() {
            time = '';
            window.clearInterval(intervalID);
            document.addEventListener("backbutton", eventBackButton, false); //返回键
          },
          1000
        );
      }else{
        history.go(-1);
      }
    }
  }
}
</script>

<style>
  @import "assets/css/common.css";
#app {
  max-width: 750px;
  font-family: 'weiruanyahei, Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #343434;
  height: 100%;
  /* background-color: #F5F8F9; */
}
.mint-radiolist *, .mint-field *, .mint-popup * {
  font-size: inherit;
  color: inherit;
}
.mint-field .mint-cell-title {
  width: auto;
}
.mint-field input {
  border: 1px solid #ccc;
  width: 60%;
  margin-left: 30px;
  line-height: 2;
  /* border-radius: 4px; */
}
.picker-toolbar{
  height: 60px;
}
.mint-datetime-action{
  line-height: 60px;
}
.picker-item.picker-selected{
  color: #01A3FE;
}
.border_radio .mint-cell-wrapper{
  line-height: 3;
}
.mint-cell-wrapper{
  line-height: 2;
}
.btn .mint-button {
  width: 96%;
  height: 80px;
}
.padding.mint-button{
  height: 60px;
  padding: 0 20px;
}
  /*.mint-msgbox{*/
  /*  width: 550px;*/
  /*  border-radius: 28px;*/
  /*}*/
  /*.mint-msgbox-message{*/
  /*  padding: 44px 22px;*/
  /*  font-size: 18px;*/
  /*  color: #343434;*/
  /*  !*font-weight: 700;*!*/
  /*}*/
  /*.mint-msgbox-btns{*/
  /*  height: 100px;*/
  /*  line-height: 100px;*/
  /*  font-size: 14px;*/
  /*}*/
  /*.mint-msgbox-btn{*/
  /*  height: 100px;*/
  /*  line-height: 100px;*/
  /*}*/
</style>
