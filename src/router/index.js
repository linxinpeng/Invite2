import Vue from 'vue'
import Router from 'vue-router'
import Invite from '@/components/Invite'
import Face from '@/components/Face'
import GetRed from '@/components/GetRed'
import GetCash from '@/components/GetCash'
import Paypal from '@/components/Paypal'
import PayOver from '@/components/PayOver'
import test from '@/components/test'
import CashRule from '@/components/CashRule'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/invite',
      name: 'invite',
      meta:{
        title:'邀请好友'
      },
      component: Invite
    },{
      path: '/face',
      name: 'face',
      meta:{
        title:'面对面邀请好友'
      },
      component: Face
    },{
      path: '/getred',
      name: 'getred',
      meta:{
        title:'获得红包'
      },
      component: GetRed
    },{
      path: '/getcash',
      name: 'getcash',
      meta:{
        title:'提现'
      },
      component: GetCash
    },{
      path: '/paypal',
      name: 'paypal',
      meta:{
        title:'支付宝提现'
      },
      component: Paypal
    },{
      path: '/payover',
      name: 'payover',
      meta:{
        title:'支付宝收银台'
      },
      component: PayOver
    },
    {
      path: '/test',
      name: 'test',
      meta:{
        title:'支付宝收银台'
      },
      component: test
    },
    {
      path: '/cashrule',
      name: 'cashrule',
      meta:{
        title:'红包奖励规则'
      },
      component: CashRule
    },
  ]
})
Vue.use(require('vue-wechat-title'));
