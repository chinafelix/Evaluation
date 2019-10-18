import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {       //首页
      path: '/',
      name: 'home',
      component: resolve => require(['@/pages/home'], resolve)
    },
    {       //景区公告
      path: '/gonggao',
      name: 'gonggao',
      component: resolve => require(['@/pages/gonggao'], resolve)
    },
    {       //报告详情
      path: '/detail',
      name: 'detail',
      meta: {
        title: '报告详情'
      },
      component: resolve => require(['@/pages/detail'], resolve)
    },
    {       //使用积分
      path: '/news_list',
      name: 'news_list',
      meta: {
        title: '使用积分'
      },
      component: resolve => require(['@/pages/news_lists'], resolve)
    },
    {       //景区须知、景区介绍
      path: '/topic',
      name: 'topic',
      meta: {
        title: '答题中心'
      },
      component: resolve => require(['@/pages/topic'], resolve)
    },
    {       //购票页
      path: '/buyer',
      name: 'buyer',
      meta: {
        title: '测评中心'
      },
      component: resolve => require(['@/pages/buyer'], resolve)
    },
    {       //支付记录
      path: '/buyer_notice',
      name: 'buyer_notice',
      meta: {
        title: '支付记录'
      },
      component: resolve => require(['@/pages/buyer_notice'], resolve)
    },
    {       //订单填写
      path: '/order',
      name: 'order',
      meta: {
        title: '测评配置'
      },
      component: resolve => require(['@/pages/order'], resolve)
    },
    {       //订单支付页
      path: '/payment',
      name: 'payment',
      component: resolve => require(['@/pages/payment'], resolve)
    },
    {       //发布记录
      path: '/customer',
      name: 'customer',
      meta: {
        title: '发布记录'
      },
      component: resolve => require(['@/pages/customer'], resolve)
    },
    {       //测评记录
      path: '/customer_add',
      name: 'customer_add',
      meta: {
        title: '测评记录'
      },
      component: resolve => require(['@/pages/customer_add'], resolve)
    },
    {       //个人中心
      path: '/personal',
      name: 'personal',
      meta: {
        title: '个人中心'
      },
      component: resolve => require(['@/pages/personal'], resolve)
    },
    {         //登录页
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login'], resolve)
    },
    {       //注册页
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/register'], resolve)
    },
    {       //关于我们
      path: '/about_us',
      name: 'about_us',
      component: resolve => require(['@/pages/aboutUs'], resolve)
    },
    {       //意见反馈
      path: '/opinion',
      name: 'opinion',
      component: resolve => require(['@/pages/opinion'], resolve)
    },
    {       //意见反馈
      path: '/account',
      name: 'account',
      component: resolve => require(['@/pages/account_setting'], resolve)
    },
    {       //重置密码
      path: '/reset',
      name: 'reset',
      component: resolve => require(['@/pages/reset_password'], resolve)
    },
    {       //修改密码
      path: '/modify',
      name: 'modify',
      component: resolve => require(['@/pages/modify_password'], resolve)
    },
    {         //忘记密码
      path: '/losed_password',
      name: 'losed_password',
      component: resolve => require(['@/pages/losed_password'], resolve)
    },
    {         //待支付订单和已支付订单的订单列表
      path: '/availabled',
      name: 'availabled',
      component: resolve => require(['@/pages/availabled_order'], resolve)
    },
    {         //已使用订单和已取消订单的订单列表
      path: '/unavailabled',
      name: 'unavailabled',
      component: resolve => require(['@/pages/unavailabled_order'], resolve)
    },
    {         //报告详情
      path: '/order_detail',
      name: 'order_detail',
      component: resolve => require(['@/pages/order_detail'], resolve)
    },
  ]
})
