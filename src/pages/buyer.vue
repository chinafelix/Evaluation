<!--测评中心-->
<template>
  <div class="content">
    <!-- <Header title="购票"></Header> -->
    <div>
      <img src="../assets/images/avatar.jpg" height="150" width="100%" alt="">
    </div>
    <div class="content_box">
      <div class="tickets">
        <div class="item">
          <p class="border-gray">最新测评记录</p>
          <table>
            <thead>
              <th>公司名称</th>
              <th>测评内容</th>
              <th>时间</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key='index'>
                <td>{{item.name}}</td>
                <td>{{item.detail}}</td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="item">
          <p class="border-gray">选择测评岗位
            <span :class="{arrow_up: showAdult, arrow_down: !showAdult}"></span>
          </p>
          <div class="ticket_item">
            <div v-for="(item, index) in evaluations" :key='index' class="sub_item" @click="navigatorToOrder(item, index)">
              <img :src="item.image" alt="" width="30">
              <span>{{item.name.substr(0, 5)}}</span>
              <span>{{item.name.substr(5)}}</span>
            </div>
          </div>
        </div>

        <div class="item">
          <p class="border-gray">经典测评工具</p>
          <div v-for="(item, index) in tools" :key='index' class="sub_tool border-gray">
            <span>{{item.name}}</span>
            <span>(浏览数：{{item.number}})</span>
            <mt-button type="danger">获取</mt-button>
          </div>
        </div>

      </div>

    </div>
    <Nav-bottom :is-active="2"></Nav-bottom>
  </div>
</template>

<script>

  import { MessageBox } from 'mint-ui';
  import Header from '../components/header'
  import NavBottom from '../components/nav'
  import https from '../assets/js/order_api'

  export default {
    name: "home",
    components:{Header,NavBottom},
    data(){
      return {
        showStudent: true,     //学生票信息是否展开
        showAdult: true,       //成人票是否展开
        tableData:[
          {name: '恒大集团', detail: '房产物业测评', time: '2019-09-10'},
          {name: '恒大集团', detail: '房产物业测评', time: '2019-09-10'},
          {name: '恒大集团', detail: '房产物业测评', time: '2019-09-10'}
        ],      //热销门票
        evaluations: [      //测评岗位
          {name: '市场营销岗测评', image: require('../assets/images/shichangyingxiao.png')},
          {name: '媒体广告岗测评', image: require('../assets/images/meitiguanggao.png')},
          {name: '商务采购岗测评', image: require('../assets/images/shouye.png')},
          {name: '人事行政岗测评', image: require('../assets/images/renshixingzheng.png')},
          {name: '财务审计岗测评', image: require('../assets/images/caiwushenji.png')},
          {name: '金融投资岗测评', image: require('../assets/images/jinrongtouzi.png')},
          {name: '生产质检岗测评', image: require('../assets/images/shengchanzhijian.png')},
          {name: '机械工程岗测评', image: require('../assets/images/jixiegongcheng.png')},
          {name: '软件网络岗测评', image: require('../assets/images/ruanjiangongcheng.png')},
          {name: '房产物业岗测评', image: require('../assets/images/fangchanwuye.png')},
          {name: '交通物流岗测评', image: require('../assets/images/jiaotongwuliu.png')},
          {name: '劳动家政岗测评', image: require('../assets/images/laodongjiazheng.png')},
          {name: '店员导购岗测评', image: require('../assets/images/dianyuandaogou.png')},
          {name: '教育教练岗测评', image: require('../assets/images/jiaoyuliaolian.png')},
          {name: '学术科研岗测评', image: require('../assets/images/xueshikeyan.png')},
          {name: '法律产权岗测评', image: require('../assets/images/falvchanquan.png')},
          {name: '艺术设计岗测评', image: require('../assets/images/yishusheji.png')},
          {name: '餐饮娱乐岗测评', image: require('../assets/images/canyinyule.png')},
          {name: '医疗保健岗测评', image: require('../assets/images/yiliaobaojian.png')},
          {name: '自定义测评内容', image: require('../assets/images/zidingyi.png')},
        ],
        tools: [
          {name: 'MBTI 性格测评工具', number: '28937'},
          {name: 'MBTI 性格测评工具', number: '28938'},
          {name: 'MBTI 性格测评工具', number: '28939'},
        ],
        adults: [],    //成人票
        childrens: [],  //儿童票\
      }
    },
    created(){
      // this.getTicketsList();
    },
    methods:{
      navigatorToOrder(item, index){
        this.$router.push({path:'/order', query:{name: item.name, index}});
      },
      getTicketsList(){     //三中门票
        for (let i=1; i<4;i++){
          https.getTicketsList(i).then(res =>{
            if(i==1){
              this.hots = res.data;
            }else if(i==2){
              this.adults = res.data;
            }else{
              this.childrens = res.data;
            }
          })
        }
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
    p.border-gray{
      margin-top: 20px;
    }
    .intro{
      height: 100px;
      line-height: 100px;
      background-color: #fff;
      margin-top: 10px;
      padding: 0 30px;
      text-align: left;
      div{
        @include bg-image('../assets/images/xiayibu');
        background-repeat: no-repeat;
        -webkit-background-size: auto 30%;
        background-size: auto 30%;
        background-position: right center;
      }
    }

    .tickets{
      .item{
        background-color: #fff;
        margin-top: 10px;
        >p{
          text-align: left;
          line-height: 80px;
          height: 80px;
          padding: 0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          //@include border-1px(#efefef);
          >.arrow_up{
            display: inline-block;
            width: 30px;
            height: 30px;
            background-image: url(../assets/images/cepinggangwei.png);
            background-size: contain;
          }
        }
        .sub_tool{
          line-height: 100px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .ticket_item{
          &:not(:last-child){
            @include border-1px(#efefef);
          }
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          flex-wrap: wrap;
          .sub_item {
            width: 24%;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid #ccc;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &:last-child {
              align-self: flex-start;
            }
          }
        }
      }
    }

  }
}
</style>
