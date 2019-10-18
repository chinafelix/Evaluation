<!--意见反馈-->
<template>
  <div class="content">
    <Header title="意见反馈" :back="true"></Header>

    <div class="content_box">
      <p class="title">请将您的意见或建议发给我们，我们将竭诚为您服务</p>
      <div class="text_box">
        <textarea class="text" maxlength="200" v-model="text" @input="input"></textarea>
        <span class="small">{{len}}/200</span>
      </div>

      <div class="btn large" @click="postOpinion">提交</div>

    </div>
  </div>
</template>

<script>
  import Header from '../components/header'
  import https from '../assets/js/personal'
  import {Toast} from 'mint-ui'

  export default {
    name: "gonggao",
    components:{Header},
    data(){
      return {
        text: '',
        len: 0
      }
    },
    created(){

    },
    methods:{
      postOpinion(){
        https.postOpinion({content: this.text}).then(res =>{
          if(res.success){
            Toast('提交成功！');
            this.$router.push('/personal');
          }else{
            Toast(res.msg);
          }
        })
      },
      input(){
        this.len = this.text.length;
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
      padding: 20px 30px;
      text-align: left;
      .title{
        color: rgba($gray, 0.6);
        margin-bottom: 10px;
      }
      .text_box{
        height: 400px;
        border-radius: 10px;
        padding: 10px 20px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .text{
          outline: none;
          resize: none;
          border: 0;
          flex: 1;
          &:focus,&:active{
            outline: none;
          }
        }
        span{
          text-align: right;
          color: rgba($gray, 0.6);
        }
      }
      .btn{
        height: 108px;
        line-height: 108px;
        background-color: #fff;
        border-radius: 10px;
        color: $light_blue;
        margin-top: 80px;
        text-align: center;
      }
    }
  }
</style>
