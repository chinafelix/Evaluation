// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import 'lib-flexible'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import store from './store/index'
// import Toast from "mint-ui/packages/toast/src/toast";

Vue.use(Mint);
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */

// document.addEventListener('deviceready',function () {
  new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
  });
// },false);


// 用到的MintUI集合
// button、swiper、MessageBox,Toast
