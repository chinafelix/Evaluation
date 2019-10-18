<template>
  <div class="nav_content">
    <ul>
      <li :class="{active: isActive == 1}" @click="navigatorTO(1)">
        <span class="home" :class="{active: isActive == 1}"></span>
        优聘在线
      </li>
      <li :class="{active: isActive == 2}" @click="navigatorTO(2)">
        <span class="buy" :class="{active: isActive == 2}"></span>
        测评中心
      </li>
      <li :class="{active: isActive == 3}" @click="navigatorTO(3)">
        <span class="person" :class="{active: isActive == 3}"></span>
        个人中心
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "navs",
    props: {
      isActive: { //1首页，2购票，3个人中心
        default: 1,
        type: Number
      }
    },
    data(){
      return {

      }
    },
    methods:{
      navigatorTO(index){
        // this.isActive = index;
        if(index==1){         //跳转到首页
          this.$router.push('/');
        }else if(index==2){     //跳转到购票页
          this.$router.push('/buyer');
        }else {       //跳转到个人中心
          this.$router.push('/personal');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../assets/css/config";
@import "../assets/css/minx";
.nav_content{
  height: 100px;
  ul{
    height: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    box-shadow: 0 5px 10px 5px #ccc;
    li{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &.active{
        color: red;
      }
      span{
        width: 100%;
        height: 42px;
        &:first-child{
          background-repeat: no-repeat;
          background-position: center center;
          -webkit-background-size: contain;
          background-size: contain;
          &.home{
            @include bg-image('../assets/images/shouye-1');
            &.active{
              @include bg-image('../assets/images/shouye');
            }
          }
          &.buy{
            @include bg-image('../assets/images/goupiao-1');
            &.active{
              @include bg-image('../assets/images/goupiao');
            }
          }
          &.person{
            @include bg-image('../assets/images/gerenzhongxin-1');
            &.active{
              @include bg-image('../assets/images/gerenzhongxin');
            }
          }
        }
      }
    }
  }
}
</style>
