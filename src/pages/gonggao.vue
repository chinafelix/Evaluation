<!--景区公告页-->
<template>
  <div class="content">
    <Header title="景区公告" :back="true"></Header>

    <div class="content_box">
      <div class="broadcast_item" v-for="(item,index) in broadcasts" :key="index"
      @click="navigatorToDetail(item.title,item.id)">
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
        broadcasts:[]
      }
    },
    created(){
      this.getBroadcastList();
    },
    methods:{
      navigatorToDetail(title, id){
        // this.$router.push({path: '/detail', query:{title: title,id: id}});
      },
      getBroadcastList(){
        https.getBroadcastList().then(res =>{
          this.broadcasts = res.data;
        })
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
      .broadcast_item {
        background-color: #fff;
        margin-top: 10px;
        box-sizing: border-box;
        padding: 30px;
        text-align: left;
        .detail{
          color: rgba($gray, 0.7);
          padding-top: 20px;
        }
      }
    }
  }
</style>
