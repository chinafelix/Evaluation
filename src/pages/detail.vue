<!--景区公告详情、景区咨询详情页-->
<template>
  <div class="content">
    <div class="customer_info">
      <div class="avatar">
        <img :src="customerInfo.avatar" alt="" width="40">
      </div>
      <div class="info_box">      
        <div>
          <div>
            <span>测评人：</span>
            <span>{{customerInfo.name}}</span>
          </div>
          <div>
            <span>时间：</span>
            <span>{{customerInfo.time}}</span>
          </div>
        </div>
        <div>
          <div>
            <span>类型：</span>
            <span>{{customerInfo.type}}</span>
          </div>
          <div>
            <span>岗位：</span>
            <span>{{customerInfo.job}}</span>
          </div>
        </div>
      </div>
    </div>
    <p>本次测评数据由优聘测评输出，仅供参考；</p>
    <div class="content_box" ref="box">

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
        customerInfo: {
          avatar: require('../assets/images/yiliaobaojian.png'),
          name: '李亚男',
          time: '2019-09-10',
          type: '入职测评',
          job: '总裁助理'
        },
        references: [

        ]
      }
    },
    created() {
      
    },
    methods:{
      
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
  .content{
    background: #F5F8F9;
    @include content_flex;
    .customer_info{
      color: #666;
      background-color: #fff;
      padding: 30px;
      display: flex;
      .avatar{
        padding: 0 30px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .info_box{
        flex: 1;
        >div{
          display: flex;
          line-height: 60px;
          >div{
            flex: 1;
            text-align: left;
          }
        }
      }
    }
    >p{
      color: #bbb;
      line-height: 80px;
    }
    .content_box{
      background-color: #fff;
      padding: 50px 30px;
      box-sizing: border-box;
    }
  }
</style>
