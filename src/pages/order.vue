<!--测评配置-->

<template>
  <div class="content">
    <!-- <Header title="购票"></Header> -->
    <div class="content_box">
      <p class="evaluTitle">{{title}}</p>
      <div>
        <img :src="require(`../assets/images/幻灯片${index+1}.jpg`)" height="150" width="100%" alt="">
      </div>
      <div class="tickets">
        <div class="item">
          <p class="border-gray bold">测评内容配置
            <span>添加</span>
          </p>
          <div class="ticket_item">
            <table cellspacing="0" cellpadding="0">
              <thead>
                <th>公司名称</th>
                <th>测评内容</th>
                <th>时间</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData" :key='index'>
                  <td>{{item.name}}</td>
                  <td>20PS</td>
                  <td>10MIN</td>
                  <td>
                    <img src="../assets/images/deleted.png" width="30" alt="" style="vertical-align: middle;">
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #ccc;">共计：</td>
                  <td style="border-top: 1px solid #ccc;">160PS</td>
                  <td style="border-top: 1px solid #ccc;">80MIN</td>
                  <td style="border-top: 1px solid #ccc;"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="item">
          <p class="border-gray bold">测评参数设置</p>
          <div class="padding_class">
            <mt-radio
              class="flex_radio"
              title="测评应用："
              v-model="args.app"
              :options="options">
            </mt-radio>
            <mt-radio
              class="flex_radio"
              title="报告是否测评人可见："
              v-model="args.visibled"
              :options="option">
            </mt-radio>
            <mt-field label="测评截止时间：" v-model="args.time" @focus.native.capture="openPicker"></mt-field>
          </div>
        </div>
        <div class="item">
          <p class="border-gray bold">选择支付方式</p>
          <div>
            <mt-radio
              style="text-align: left;"
              v-model="args.type"
              :options="payTypes">
            </mt-radio>
          </div>
        </div>

      </div>

    </div>
    <div class="bottom">
      <div @click="navigatorToTopic">预览题目</div>
      <div :class="{disabled: disable}">发布测试</div>
    </div>
    <mt-datetime-picker
      ref="picker"
      v-model="dateValue"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="dateConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>

  import { MessageBox } from 'mint-ui';
  import Header from '../components/header'
  import NavBottom from '../components/nav'
    import common from '../assets/js/common'
  import https from '../assets/js/order_api'

  export default {
    name: "home",
    components:{Header,NavBottom},
    data(){
      return {
        title: '',
        index: 0,
        showStudent: true,     //学生票信息是否展开
        showAdult: true,       //成人票是否展开
        tableData: [      //测评岗位
          {name: '沟通能力', id: 1},
          {name: '人际关系', id: 2},
          {name: '洞察能力', id: 3},
          {name: '应变能力', id: 4},
          {name: '服务意识', id: 5},
          {name: '团队角色', id: 6},
          {name: '职业成就感', id: 7},
        ],
        options: [
          {label: '选项A',value: '值A'},
          {label: '选项B',value: '值B'},
          {label: '选项C',value: '值C'},
        ],
        option: [
          {label: '可见',value: '1'},
          {label: '不可见',value: '0'},
        ],
        payTypes:[      //前两种的价格会随着tableData的数量而变化， 即tableData.length *5
          {label: `测评个人支付（价格：0元/次）`, value: 1},
          {label: '企业支付（价格：0元/次）', value: 2},
          {label: '购买VIP（活动价：518元/年，无限次，可开发票）', value: 3},
          {label: '新用户使用（免费发布测评一次）', value: 4},
        ],
        args: {
          app: '',
          visibled: '',
          time: '',
          type: ''
        },
        dateValue: '',
        disabled: true,       //发布按钮不可用
      }
    },
    computed:{
      'disable'(){
        const {app, visibled, time, type}  =this.args;
        if(this.tableData.length>0 && app && visibled && time && type) {
          return false;
        }else {
          return true;
        }
      }
    },
    created(){
      this.title = this.$route.query.name;
      this.index = Number(this.$route.query.index);

      //正式环境应该放在获取tableData的方法里，每次都要重新计算
      for (let i=0; i< this.payTypes.length; i++) {
        this.payTypes[0].label = `测评个人支付（价格：${this.tableData.length * 5}元/次）`;
        this.payTypes[1].label = `企业支付（价格：${this.tableData.length * 5}元/次）`;
      }
      // this.getTicketsList();
    },
    methods:{
      navigatorToTopic(){
        this.$router.push({path:'/topic', query:{name: this.title}});
      },
      openPicker() {
        if(this.args.time){
          this.dateValue = this.args.time;
        }else {
          this.dateValue = new Date();
        }
        this.$refs.picker.open();
      },
      dateConfirm(){
        this.args.time = common.formatterDate(this.dateValue);
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
.content{
  @include content_flex;
  .evaluTitle{
    padding-top: 30px;
    padding-left: 30px;
    text-align: left;
    font-weight: 700;

  }
  .flex_radio{
    display: flex;
    // justify-content: space-around;
    flex-direction: row;
  }
  .padding_class{
    padding-left: 30px;
  }
  .bottom{
    display: flex;
    height: 80px;
    color: #fff;
    div{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color:#f00;
      &.disabled {
        background-color: rgba( 255, 0, 0, .5)
      }
    }
  }
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
      padding-bottom: 30px;
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
