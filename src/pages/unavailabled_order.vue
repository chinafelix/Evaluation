<!--已取票列表页、已取消列表页-->
<template>
  <keep-alive>
    <div class="content">
      <Header :title="title" :back="true"></Header>

      <div class="content_box">

        <div class="box" v-if="lists.length>0">
          <div class="item border-gray" v-for="(item,index) in lists" :key="index">
            <div class="top border-gray">
              <p>订单号：{{item.id}}</p>
              <span class="large">{{status}}</span>
            </div>

            <div class="bottom">

              <div class="info" @click="navigatorToDetail(item)">
                <div class="left">
                  <p class="name large">{{item.ticketName}}</p>
                  <p class="time common small">入园时间：{{item.playTime.slice(0,10)}}</p>
                  <p class="valid common small">仅限当日有效</p>
                </div>

                <div class="right">
                  <p class="larger price">￥{{item.totalSum}}</p>
                  <p class="small number">{{item.amount}}张</p>
                </div>
              </div>

              <div class="btn">
                <div class="border-orange" @click="deleteOrder(item)">删除</div>
              </div>

            </div>

          </div>

        </div>

        <div class="nodata" v-if="lists.length==0">
          <div>
            <img src="../assets/images/dindanzanwu@3x.png" alt="">
          </div>
          <p>您还没有相关订单！</p>
        </div>

      </div>
    </div>

  </keep-alive>
</template>

<script>
  import Header from '../components/header'
  import {MessageBox} from 'mint-ui'
  import https from '../assets/js/personal'

  export default {
    name: "gonggao",
    components:{Header},
    data(){
      return {
        type: true,     //true待支付， false已支付
        id: 2,          //判断订单详情页状态, 0:待支付，1：已支付，2：已使用，-1已取消
        title: '已使用订单',
        status: '已使用',
        lists: []
      }
    },
    created(){
      this.type = this.$route.query.type;
      sessionStorage.order_type = this.type;
      if(sessionStorage.order_type) {
        this.type = JSON.parse(sessionStorage.order_type);
      }
      if(this.type){

      }else{
        this.title = '已取消订单';
        this.status = '已取消';
        this.id = -1;

      }
      this.getMyOrder();      //获取订单列表
    },
    methods:{
      deleteOrder(item){      //删除订单
        const me = this;
        const htmls = `<span class="large">删除订单记录将无法还原，确认删除吗？</span>`;
        MessageBox({
          title: '',
          message: htmls,
          showCancelButton: true
        }).then(res =>{
          // console.log(res)
          if(res == 'confirm'){
            https.delete_order(item.id).then(res =>{
              me.getMyOrder();
            })
          }
        })
      },
      navigatorToDetail(item){      //订单详情
        this.$router.push({path:'/order_detail',query:{id: item.id, type: this.id}});
      },
      getMyOrder(){
        let data = {
          pageIndex: 1,
          pageSize: 100,
          status: this.id
        };
        https.getMyOrder(data).then(res =>{
          this.lists = res.data.list;
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
      position: relative;
      .box{
        .item{
          margin-top: 10px;
          background-color: #fff;
          @include border-1px(#eee);
          .top{
            height: 82px;
            line-height: 82px;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            @include border-1px(#eee);
            p{
              color: rgba($gray, 0.6);
            }
            span{
              color: $light_blue;
            }
          }
          .bottom{
            padding: 30px;
            .info{
              text-align: left;
              display: flex;
              justify-content: space-between;
              .left{
                p{
                  background-repeat: no-repeat;
                  background-position: 0 center;
                  -webkit-background-size: auto 60%;
                  background-size: auto 60%;
                }
                .common{
                  color: rgba($gray, 0.6);
                }
                .time{
                  margin: 10px 0;
                  padding-left: 30px;
                  @include bg-image('../assets/images/shijian');
                }
                .valid{
                  padding-left: 30px;
                  @include bg-image('../assets/images/tixing');
                }
              }
              .right{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
                .price{
                  color: $orange;
                  font-weight: 700;
                }
                .number{
                  color: rgba($gray, 0.6);
                }
              }
            }

            .btn{
              padding-top: 30px;
              display: flex;
              justify-content: flex-end;
              >div{
                width: 140px;
                height: 60px;
                line-height: 60px;
                margin-left: 20px;
                border-radius: 6px;
                /*&.common{*/
                /*  border: 1px solid #DDE1E4;*/
                /*}*/
                &.delete{
                  color: #fff;
                  background-color: $orange;
                }
              }
            }
          }
        }
      }

      .nodata{
        width: 100%;
        position: absolute;
        top: 30%;
        div{
          width: 100%;
          height: 300px;
          /*<!--@include bg-image('../assets/images/dindanzanwu');-->*/
          /*background-repeat: no-repeat;*/
          /*background-position: center center;*/
          /*-webkit-background-size: 50% auto;*/
          /*background-size: 50% auto;*/
          img{
            width: auto;
            height: 100%;
          }
        }
        p{
          color: rgba($gray, 0.6);
          margin-top: 30px;
        }
      }
    }
  }
</style>
