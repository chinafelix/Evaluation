<!--使用积分-->
<template>
  <div class="content">
    <!-- <Header :back="true" title="使用积分" :right="title" @handleTarget="listenerHeader"></Header> -->
    <div class="score_box">
      <img src="../assets/images/score.png" alt="" width="40">
      <div>
        <p class="score big">{{score}}</p>
        <p>累积积分</p>
      </div>
      <mt-button type="default" class="padding">签到</mt-button>
    </div>
    <div class="content_box">
      <table cellspacing="0" cellpadding="0">
        <thead>
          <th>使用时间</th>
          <th>积分事件</th>
          <th>积分数量</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lists" :key="index">
            <td>{{item.time}}</td>
            <td>{{item.type}}</td>
            <td>{{item.name}}</td>
          </tr>
        </tbody>
      </table>
      <!-- <p class="info">-共{{lists.length}}条记录-</p> -->
    </div>
  </div>
</template>

<script>
  import Header from '../components/header'
  import {Toast} from 'mint-ui'
  import https from '../assets/js/personal'

  export default {
    name: "customer",
    components: {Header},
    data(){
      return{
        lists:[
          {time: '2019-09-10', type: '入职测评', name: '李亚男'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男'}
        ],
        score: '0.00'
      }
    },
    created() {
      // this.getMyTicketCollect();
    },
    methods:{
      getMyTicketCollect(){
        https.getMyTicketCollect().then(res =>{
          this.lists = res.data;
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
  .content{
    background-color: #F5F8F9;
    @include content_flex;
    .score_box{
      width: 100%;
      height: 240px;
      background-color: rgb(238, 66, 66);
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div{
        color: #ccc;
        .score{
          color: yellow;
          font-weight: 700;
          padding-bottom: 10px;
        }
      }
    }
    .content_box{
      box-sizing: border-box;
      table {
        td {
          border-top: 1px solid #ccc;
          background-color: #fff;
        }
      }
      .info{
        padding-top: 30px;
      }
    }
  }
</style>
