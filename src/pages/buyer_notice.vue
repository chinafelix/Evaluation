<!--支付记录-->
<template>
  <div class="content">
    <!-- <Header :back="true" title="测评记录" :right="title" @handleTarget="listenerHeader"></Header> -->
    <div class="content_box">
      <table cellspacing="0" cellpadding="0">
        <thead>
          <th>支付时间</th>
          <th>支付内容</th>
          <th>支付金额</th>
          <th>发票</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lists" :key="index">
            <td>{{item.time}}</td>
            <td>{{item.type}}</td>
            <td>{{item.name}}</td>
            <td>
              <mt-button type="danger" class="yellow padding" @click="navigatorToDetail">申请</mt-button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <p class="info">-共{{lists.length}}条记录-</p> -->
      <div class="invoice" v-if="visible">
        <p class="border-gray">发票申请信息</p>
        <ul>
          <li>
            <mt-field label="公司名称:" v-model="info.title"></mt-field>
          </li>
          <li>
            <mt-field label="纳税代码:" v-model="info.code"></mt-field>
          </li>
          <li>
            <mt-field label="邮寄地址:" v-model="info.addr"></mt-field>
          </li>
          <li>
            <mt-field label="收货人姓名:" v-model="info.name"></mt-field>
          </li>
          <li>
            <mt-field label="收货人电话:" v-model="info.phone"></mt-field>
          </li>
        </ul>

        <mt-button type="danger" class="yellow padding" @click="handleSave">提交</mt-button>
      </div>
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
        visible: false,
        lists:[
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'},
          {time: '2019-09-10', type: '入职测评', name: '李亚男', status: '优秀'}
        ],
        info:{
          title: '',
          code: '',
          addr: '',
          name: '',
          phone: ''
        }
      }
    },
    created() {
      // this.getMyTicketCollect();
    },
    methods:{
      handleSave(){
        this.visible = false;
      },
      getMyTicketCollect(){
        https.getMyTicketCollect().then(res =>{
          this.lists = res.data;
        })
      },
      navigatorToDetail(){
        this.visible = true;
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
  .content{
    @include content_flex;
    .yellow{
      background-color: #fa0;
    }
    .content_box{
      box-sizing: border-box;
      
      .info{
        padding-top: 30px;
      }
      .invoice{
        box-sizing: border-box;
        padding: 30px 0;
        >p{
          line-height: 80px;
          text-align: left;
          font-weight: 700;
          padding-left: 30px;
        }
        ul{
          padding: 30px;
          li{
            padding-bottom: 30px;
          }
        }
      }
    }
  }
</style>
