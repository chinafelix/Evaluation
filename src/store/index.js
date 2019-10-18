import Vue from 'vue'

import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);


export default new Vuex.Store ({

  state: {
    userInfo:{},            //用户登录信息
    ticketCollect:{},      //取票人信息
    orderInfo:{},      //取票人信息
  },

  mutations:{
    getUserData:function(state,payload){
      state.userInfo = payload;
    },
    getTicketInfo(state, payload){
      state.ticketCollect = payload;
    },
    getOrderInfo(state, payload){
      state.orderInfo = payload;
    },
  },

  actions: {
    getUserData:function({commit},payload){
      commit('getUserData',payload);
    },
    getTicketInfo: function ({commit}, payload) {
      commit('getTicketInfo', payload);
    },
    getOrderInfo({commit}, payload){
      commit('getOrderInfo',payload);
    },

  },
  plugins:[createPersistedState()]
})
