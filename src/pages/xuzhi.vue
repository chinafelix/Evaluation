<!--景区须知页-->
<template>
  <div class="content">
    <Header :title="title" :back="true"></Header>

    <div class="content_box">
      <div class="broadcast_item" v-for="(item,index) in broadcasts" :key="index">
        <div class="large">{{item.title}}</div>
        <div class="detail">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/header'
  import https from '../assets/js/api'

  export default {
    name: "gonggao",
    components:{Header},
    data(){
      return {
        title: '',
        id: 1,        //1：须知， 2：介绍
        broadcasts:[]
      }
    },
    created(){
      this.title = this.$route.query.title;
      this.id = this.$route.query.id;
      if(this.id == 1) {
        this.getTips();
      }else {
        this.getIntroductions();
      }
    },
    methods:{
      getTips(){
        https.getTips().then(res =>{
          this.broadcasts = res.data;
        })
      },
      getIntroductions(){
        https.getIntroductions().then(res =>{
          this.broadcasts = res.data;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
  .content{
    @include content_flex;
    .content_box{
      .broadcast_item {
        background-color: #fff;
        margin-top: 10px;
        box-sizing: border-box;
        padding: 30px;
        text-align: left;
        .large{
          @include border-1px(#eee);
          padding-bottom: 20px;
        }
        .detail{
          color: rgba($gray, 0.7);
          padding-top: 20px;
        }
      }
    }
  }
</style>
