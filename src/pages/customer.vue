<!--发布记录-->
<template>
  <div class="content">
    <!-- <Header :back="true" title="发布记录" :right="title" @handleTarget="listenerHeader"></Header> -->
    <div class="content_box">
      <table cellspacing="0" cellpadding="0">
        <thead>
          <th>发布时间</th>
          <th>发布类型</th>
          <th>发布人</th>
          <th>发布状态</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lists" :key="index">
            <td>{{item.time}}</td>
            <td>{{item.type}}</td>
            <td>{{item.name}}</td>
            <td>{{item.status}}</td>
          </tr>
        </tbody>
      </table>
      <p class="info">-共{{lists.length}}条记录-</p>
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
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'}
        ],
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
