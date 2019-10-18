<template>
  <div class="head_content">
    <div class="left">
      <img v-if="deleted" src="../assets/images/delete.png" width="16" alt=""
           @click="handleclick(1)">
      <img v-if="back" src="../assets/images/back.png" width="18" alt=""
           @click="handleclick(2)">
      <img v-if="iframeback" src="../assets/images/back.png" width="18" alt=""
           @click="handleBack()" ref="iframe">
    </div>
    <div class="large content">
      {{title}}
    </div>
    <div class="right large">
      <div v-if="right" @click="navigatorTo(true)">{{right}}</div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';

  export default {
    name: "headers",
    props:
      {
        title: {
          default: '',
          type: String
        },
        deleted: {
          default: false,
          type: Boolean
        },
        back: {
          default: false,
          type: Boolean
        },
        right: {
          default: '',
          type: String
        },
        confirm: {
          default: '',
          type: String
        },
        iframeback: {
          default: false,
          type: Boolean
        }
      }
    ,
    data(){
      return{

      }
    },
    mounted(){

    },
    methods:{
      handleclick(index){
        // if(index==2){
          if(this.confirm){
            const htmls = `<span class="large">${this.confirm}</span>`;
            MessageBox({
              title: '',
              message: htmls,
              showCancelButton: true
            }).then(res =>{
              // console.log(res)
              if(res == 'confirm'){
                this.$router.go(-1);
              }
            })
          }else {
            this.$router.go(-1);
          }
        // }
      },
      navigatorTo(type=false){
        if(type) {          //监听了事件，"取票人管理的完成"，"编辑取票人页面的删除"
          this.$emit('handleTarget');
        }else {
          this.$router.go(-1);
        }
      },
      handleBack(){
        // this.$refs.iframe.contentWindow.location.replace('/');
        this.$emit('handleTarget');
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";

  .head_content {
    width: 100%;
    height: 88px;
    line-height: 88px;
    /*padding-top: 40px;*/
    background-color: $light_blue;
    display: flex;
    justify-content: space-between;
    /*font-size: 16px !*no*!;*/
    color: #fff;
    >div{
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      &:first-child{
        padding-left: 30px;
        box-sizing: border-box;
      }
      &:last-child {
        justify-content: right;
        div{
          padding-right: 30px;
          height: 100%;
        }
      }
      &.content{
        box-sizing: border-box;
        padding: 0 20px;
      }
    }
  }
</style>
