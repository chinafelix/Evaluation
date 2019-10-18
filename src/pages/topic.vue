<!--答题页-->
<template>
  <div class="content">
    <div class="content_box">
      <div class="details">
        <span>{{title}}</span>
        <span>题目：{{detail.current}}/{{detail.total}}</span>
        <span>剩余时间：{{remainTime}}</span>
      </div>

      <div class="artical_box">
        <p class="border-gray">{{detail.content}}</p>
        <mt-radio
          class="border_radio"
          v-model="value"
          :options="detail.choosies">
        </mt-radio>
      </div>

      <div class="btn">
        <mt-button type="danger" :disabled="!value">下一题</mt-button>
        <mt-button type="danger" v-if="detail.current === detail.total">完成</mt-button>
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
        detail: {
            current: 1,
            total: 15,
            content: '1、如果可以选择的话，你是选择虚构的文章，还是写实性的文章？',
            choosies: [
              {label: '选项A',value: '值A'},
              {label: '选项B',value: '值B'},
              {label: '选项C',value: '值C'},
            ]
        },
        timer: null,
        remainTime: '00:00',
        value: '',      //选择的答案
      }
    },
    computed: {
      useful(){
        if(this.value) {
          return true;
        }else {
          return false;
        }
      }
    },
    created(){
      this.title = this.$route.query.name;

      this.timerRun();
    },
    mounted(){
      
    },
    methods:{
      timerRun(){
        let time = 600, min = 0, sec = 0;
        this.timer = setInterval(() =>{
          time --;
          // console.log(Math.floor(599/60));
          min = Math.floor(time/60);
          sec = time % 60;
          this.remainTime = `${min < 10 ? '0'+min : min}:${sec< 10 ? '0'+ sec : sec}`;
        }, 1000)
      },
    },
    beforeDestroy(){
      clearInterval(this.timer);
      this.timer = null;
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/config";
  @import "../assets/css/minx";
  .content{
    @include content_flex;
    .content_box{
      background-color: #F5F8F9;
      text-align: left;
      .details{
          height: 80px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          color: #aaa;
      }
      .artical_box{
          background-color: #fff;
          .border-gray {
            line-height: 60px;
            padding: 10px 30px;
          }
      }
      .btn{
        position: absolute;
        bottom: 200px;
        width: 100%;
        text-align: center;
        padding-top: 40px;
      }
    }
  }
</style>
