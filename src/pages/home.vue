<template>
  <div class="content">
    <!-- <Header :title="title"></Header> -->
    <div class="content_box">
      <div class="swiper">
        <mt-swipe :speed="500" :show-indicators="false">
          <mt-swipe-item v-for="(item,index) in banners" :key="index" @click="navigatorToDetail(item,'活动详情')">
            <img :src="item.coverUrl" alt="" width="100%" height="100%">
<!--            <a class="linkUrl" :href="item.linkUrl"></a>-->
          </mt-swipe-item>
        </mt-swipe>

<!--          最新公告-->
<!--        <div class="broadcast" @click="navigatorToGonggao">-->
<!--          <span class="cast_box"></span>-->
<!--          <span class="broadcast_title">{{broadcast}}</span>-->
<!--          <span class="next_box"></span>-->
<!--        </div>-->
      </div>

<!--      景区信息-->
      <div class="spot_info">
        <div class="top">
          <div class="left">
            <div class="info">
              <span class="weight">{{science.name}}</span>
              <span class="small">[{{science.type}}]</span>
              <span class="small">{{weathers.weather}}</span>
              <span class="small">{{weathers.temperature}}</span>
              <span class="small">{{weathers.wind}}</span>
            </div>
            <div class="address">
              {{address}}
            </div>
          </div>
          <div class="right" @click="handleDial"></div>
        </div>
        <div class="bottom">
          <div class="notice">
            <div @click="navigatorToNitice('景区须知',1)">
              <div>景区须知</div>
              <div class="small">开放时间，入园须知</div>
            </div>
            <div class="next_box"></div>
          </div>
          <div class="intro">
            <div @click="navigatorToNitice('景区介绍',2)">
              <div>景区介绍</div>
              <div class="small">景区介绍，开放景点介绍</div>
            </div>
            <div class="next_box"></div>
          </div>
        </div>
      </div>

<!--      景区咨询-->
      <div class="news">
        <div class="title_box border-gray">
          <span class="title">景区资讯</span>
          <span class="more" @click="navigatorToMore">更多</span>
        </div>
        <div class="news_content">
          <div class="news_item border-gray" v-for="(item,index) in news" :key="index"
            @click="navigatorToDetail(item,'资讯详情')">
            <img :src="item.coverUrl" alt="">
            <div class="detail">
              <span class="detail_title">{{item.title}}</span>
              <span class="detail_notes">{{item.subject}}</span>
              <span class="detail_time small">{{item.createTime}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Nav-bottom :is-active="1"></Nav-bottom>
  </div>
</template>

<script>

  import { MessageBox,Toast } from 'mint-ui';
  import Header from '../components/header'
  import NavBottom from '../components/nav'
  import https from '../assets/js/api'
  import api from '../assets/js/https'

  export default {
    name: "home",
    components:{Header,NavBottom},
    data(){
      return {
        title: '明十三陵门票',
        broadcast: '',
        science:{},       //景区信息
        banners: [],      //banners
        weathers: {
          // weather: '晴',
          // temperature: '25℃',
          // wind: '威风'
        },      //天气
        address: '',        //拼接好的地址
        origin_add: {},     //获取到的原始地址数据
        news: []
      }
    },
    created(){
      this.getScienceData();      //景区信息
      this.getBanner();           //banner图
      // this.getLastBroadcast();    //公告
      this.getLocation();         //当前位置
      this.getCLocation();        //天气
      this.getNews();             //景区资讯
    },
    methods:{
      getScienceData(){                       //获取景区信息
        https.getScienceData().then(res =>{
          this.science = res.data;
        })
      },
      getBanner(){                           //获取banner
        https.getBanner().then(res =>{
          this.banners = res.data;
        })
      },
      getLastBroadcast(){                   //景区公告
        https.getLastBroadcast().then(res =>{
          // console.log(res);
          this.broadcast = res.data.title;
        })
      },
      getLocation(){                          //获取当前位置
        // https.getLocation().then(res =>{
        //   let str = '';
        //   for(var item in res.data){
        //     str += res.data[item];
        //   }
        //   this.address = str;
        //   this.origin_add = res.data;
        // })
        api.getDataWithOutVercode('http://test.ming.32ui.cn/ming/api/settings/region.json',{},(res)=>{
          let str = '';
          for(var item in res.data){
            str += res.data[item];
          }
          this.address = str;
          this.origin_add = res.data;
        })
      },
      getTemplature(city){                      //获取天气
        // let location = this.getCLocation(),city;
        // // console.log(location);
        // Toast({
        //   message: `当前位置：${location}`
        // });
        // if(location){
        //   city = location;
        // }else {
        //   city = this.origin_add.city;
        // }
        https.getTemplature({city: city}).then(res =>{
          if(res.success){
            this.weathers = res.data;
          }
        })
      },
      getCLocation(){
        // var options={
        //   enableHighAccuracy:true,
        //   maximumAge:1000
        // };
        // if(navigator.geolocation){
        //   navigator.geolocation.getCurrentPosition((posi) => {
        //     this.getRegionWithGeo(posi.coords.latitude,posi.coords.longitude);
        //   });
        // }else{
          this.getTemplature({city:this.origin_add.city});
        // }
      },
      getRegionWithGeo(lat, lng){
        let data = {
          lng: lng,
          lat: lat
        };
        https.getRegionWithGeo(data).then(res =>{
          this.getTemplature(res.data.city);
        })
      },
      getNews(){
        let data = {
          pageIndex: 1,
          pageSize: 10
        };
        https.getNews(data).then(res =>{
          this.news = res.data.list;
        })
      },
      navigatorToGonggao(){
        this.$router.push('/gonggao');
      },
      navigatorToDetail(item,title){
        this.$router.push({path: '/detail', query:{url: item.linkUrl, title: title}});
      },
      navigatorToMore(){
        this.$router.push('/news_list');
      },
      navigatorToNitice(title,id){
        this.$router.push({path:'/notice', query:{title: title,id: id}});
      },
      handleDial(){
        const htmls = `<span class="large" style="color: #343434;">${this.science.telephone}</span>`;
        MessageBox({
          title: '',
          message: htmls,
          showCancelButton: true,
          confirmButtonText: '呼叫',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirm_button normal',
          cancelButtonClass: 'cancel_button normal'
        }).then(action => {
          if(action == 'confirm'){
            const el = document.createElement('a');
            const attr = `tel:${this.science.telephone}`;
            el.setAttribute('href', attr);
            el.click();
          }
        });
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
    .swiper{
      height: 300px;
      position: relative;
      /*.linkUrl{*/
      /*  position: absolute;*/
      /*  width: 100%;*/
      /*  height: 100%;*/
      /*  z-index: 99;*/
      /*  left: 0;*/
      /*  top: 0;*/
      /*}*/
      .broadcast{
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 9999;
        padding: 0 30px;
        box-sizing: border-box;
        background-color: $gray;
        opacity: 0.69;
        color: #fff;
        display: flex;
        height: 72px;
        align-items: center;
        justify-content: space-between;
        .cast_box{
          width: 40px;
          height: 40px;
          @include bg-image('../assets/images/gonggao-2');

          /*background-image: url('../assets/images/broadcast.png');*/
          background-position: right center;
          background-repeat: no-repeat;
          -webkit-background-size: contain;
          background-size: contain;
        }
        .broadcast_title{
          width: 500px;
          /*box-sizing: border-box;*/
          /*margin: 0 30px 0 15px;*/
          @include ellipsis;
          line-height: 72px;
          margin-right: 40px;
          text-align: left;
        }
        .next_box{
          width: 40px;
          height: 40px;
          /*<!--@include bg-image('../assets/images/xiayibu');-->*/
          background-image: url('../assets/images/next.png');
          background-position: right center;
          background-repeat: no-repeat;
          -webkit-background-size: contain;
          background-size: contain;
        }
      }
    }

    .spot_info{
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 20px;
      .top{
        display: flex;
        align-items: center;
        .left{
          flex: 1;
          .info{
            display: flex;
            align-items: center;
            span{
              padding-right: 5px;
            }
            .weight{
              font-weight: 700;
            }
          }
          .address{
            text-align: left;
            @include bg-image('../assets/images/dizhi');
            background-position: 0 center;
            background-repeat: no-repeat;
            -webkit-background-size: auto 80%;
            background-size: auto 80%;
            padding-left: 40px;
            box-sizing: border-box;
            margin-top: 24px;
            color: rgba($gray, 0.69);
          }
        }
        .right{
          width: 60px;
          height: 60px;
          @include bg-image('../assets/images/dianhua-2');
          background-position: 0 0;
          background-repeat: no-repeat;
          -webkit-background-size: contain;
          background-size: contain;
        }
      }

      .bottom{
        display: flex;
        margin-top: 40px;
        >div{
          flex: 1;
          /*height: 100px;*/
          background-color: $gray_blue;
          &:first-child{
            margin-right: 20px;
          }
          padding: 20px 20px;
          display: flex;
          /*align-items: center;*/
          >div{
            &:first-child{
              flex: 1;
              text-align: left;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-right: 10px;
              .small{
                color: rgba($gray, 0.7);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            &:last-child{
              width: 15px;
              /*height: 100%;*/
              @include bg-image('../assets/images/xiayibu');
              background-position: center center;
              background-repeat: no-repeat;
              -webkit-background-size: contain;
              background-size: contain;
            }
          }
        }
      }
    }

    .news{
      box-sizing: border-box;
      background-color: #fff;
      .title_box{
        height: 80px;
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
          font-weight: 700;
        }
        .more{
          color: rgba($gray,0.7);
          padding-right: 30px;
          @include bg-image('../assets/images/xiayibu');
          background-position: right center;
          background-repeat: no-repeat;
          -webkit-background-size: auto 70% ;
          background-size: auto 70%;
        }
        //@include border-1px(#eee);
      }
      .news_content{
        .news_item{
          padding: 20px 30px;
          box-sizing: border-box;
          //@include border-1px(#eee);
          display: flex;
          img{
            width: 236px;
            height: 176px;
            border-radius: 10px;
            margin-right: 20px;
          }
          .detail{
            flex: 1;
            width: 425px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            span{
              text-align: left;
            }
            .detail_title{
              font-weight: 700;
              @include ellipsis;
            }
            .detail_notes{
              @include multi_ellipsis(2);
              color: rgba($gray, 0.7);
            }
            .detail_time{
              @include bg-image('../assets/images/shijian');
              -webkit-background-size: auto 70%;
              background-size: auto 70%;
              background-repeat: no-repeat;
              background-position: 0 center;
              text-align: left;
              padding-left: 30px;
              color: rgba($gray, 0.7);
            }
          }
        }
      }
    }
  }
}
</style>
