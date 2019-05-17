<template>
  <div class="invite" v-show="isload">
      <div class="i-header">
        <!-- swiper有安卓低版本兼容问题 -->
       <!-- <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper swiper-slide" v-for="(item,index) in msg" :key="index">
                <img src="../assets/image/tongzhi.png" />
                <p>{{item}}</p>
              </div>
          </div>
      </div> -->
      <img class="swiperImg" src="../assets/image/tongzhi.png" />
      <swiper :options="swiperOption" style="height: 100%;width: 100%">
        <swiper-slide class="swiper" style="height: 100%" v-for="(item, index) in info&&info.radio_info" :key="index">
          
          <p>{{item}}</p>
        </swiper-slide>
      </swiper>
    <!-- Add Pagination -->
      <!-- <mt-swipe :auto="5000" :continuous="true" :speed="0">
        <mt-swipe-item class="swiper" v-for="(item,index) in info&&info.radio_info || []" :key="index">
           <img src="../assets/image/tongzhi.png" />
            <p>{{item}}</p>
        </mt-swipe-item>
      </mt-swipe> -->
      </div>
      <div class="i-get">
        <span class="g-active" @click="onClickRule">
          <img src="../assets/image/hdgz.png" height="100%"/>
        </span>
        <img src="http://cdn.shebao.info/upload/portal/20190403/52a206d99ce2f7db9fd443c55dbb2902.jpg" />
        <p class="g-title">- 已获得红包奖励 -</p>
        <h3><strong>{{info&&info.d_count || 0}}</strong>元</h3>
        <div class="btn" @click="onCash"></div>
      </div>
      <div class="i-bottom">
        <div class="b-tab">
          <span :class="isActive == 1 ?'tabActive':''" @click="isActive = 1">奖励任务</span>
          <span :class="isActive == 2 ?'tabActive':''" @click="isActive = 2">好友列表</span>
        </div>
        <div class="b-content">
          <!-- 奖励任务 -->
          <div v-if="isActive == 1" class="c-c">
            <div class="c-invite" v-for="(i,index) in info&&info.list || []" :key="index">
              <div class="i-title">
                <p>{{i.task_name}}</p>
                <img src="../assets/image/bt.png" />
              </div>
              <div class="i-content">
                <img src="../assets/image/rw.png" />
                <div class="c-content">
                  <p class="c-title">{{i.des}}</p>
                  <p class="c-momey">奖励：<span>{{i.award_des}}</span></p>
                  <p class="c-times">完成次数：<span>{{i.invite_num}}</span>/{{i.finish_num}}</p>
                  <div class="c-btn" @click="onShare(i.button_msg)">
                    <img v-if="i.button_msg == '去邀请'" src="../assets/image/qyq.png" />
                    <img v-else-if="i.button_msg == '赚红包'" src="../assets/image/zhb.png" />
                  </div>
                </div>
              </div>
            </div>
            <div class="c-invite" style="padding-bottom: .2rem;">
              <div class="i-title">
                <p>邀请好友小技巧</p>
                <img src="../assets/image/bt.png" />
              </div>
              <div class="i-content">
                <img src="../assets/image/rw.png" />
                <div class="c-content c-skill">
                  <p class="big-title">
                    <img src="../assets/image/cg1.png" />
                    成功率可提升300%
                    <img src="../assets/image/cg2.png" />
                  </p>
                  <p class="com">1. 邀请您身边的家人，朋友，同事，同学，成功率最高；</p>
                  <p class="com">2. 分享到4个以上微信群/QQ群，邀请成功的几率可<span>提升300%；</span></p>
                  <p class="com">3. 邀请时别忘了告诉您的朋友：注册可领取<span>21元</span>新用户红包，可立即提现哦；</p>
                  <p class="com">4. 邀请双方均需在<span class="appVerson">{{app_verson}}</span>以上版本才支持获得邀请奖励，如非最新版请更新版本。</p>
                </div>
              </div>
            </div>
            <div class="c-share">
              <div @click="toShare(true,'wx')">
                <img src="../assets/image/fx1.png" />
                <p>微信邀请</p>
              </div>
              <div @click="toShare(true,'pyq')">
                <img src="../assets/image/fx2.png" />
                <p>朋友圈邀请</p>
              </div>
              <div @click="ftf">
                <img src="../assets/image/fx3.png" />
                <p>面对面邀请</p>
              </div>
              <div @click="toShare(true,'qq')">
                <img src="../assets/image/fx4.png" />
                <p>QQ邀请</p>
              </div>
              <div @click="toShare(true,'qqkj')">
                <img src="../assets/image/fx5.png" />
                <p>QQ空间邀请</p>
              </div>
            </div>
            <div style="height:.8rem"></div>
          </div>
          <!-- 好友列表 -->
          <div v-else class="c-list">
            <div class="c-invite" v-if="list.length > 0" style="padding-bottom: .2rem;">
              <div class="i-title">
                <p>已邀请好友列表</p>
                <img src="../assets/image/bt.png" />
              </div>
              <div class="i-content">
                <img src="../assets/image/rw.png" />
                <div class="c-content c-skill">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr class="c-top">
                      <th>好友昵称</th>
                      <th>当前奖励</th>
                      <th>预计奖励</th>
                    </tr>
                    <tr class="c-cell" v-for="(item,index) in list || []" :key="index">
                      <td>{{item.nick_name}}</td>
                      <td>{{item.money}}元</td>
                      <td>{{item.available_count}}元</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="c-invite" v-if="list.length == 0" style="padding-bottom: .2rem;">
              <div class="i-title">
                <p>已邀请好友列表</p>
                <img src="../assets/image/bt.png" />
              </div>
              <div class="i-content">
                <img src="../assets/image/rw.png" />
                <div class="c-content c-skill">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr class="c-top">
                      <th>好友昵称</th>
                      <th>当前奖励</th>
                      <th>预计奖励</th>
                    </tr>
                  </table>
                  <div class="c-nofriend">
                    <img src="../assets/image/zwhy.png" />
                    暂无好友
                  </div>
                  <div class="c-invite-friend" @click="onShare('none')"></div>
                </div>
              </div>
            </div>
            <div class="c-share" v-if="list.length > 0" >
              <div class="s-invite" @click="onShare('have')">
                <img src="../assets/image/yq1.png" />
                邀请好友
              </div>
            </div>
            <div style="height: .5rem"></div>
          </div>
        </div>
      </div>
      <!-- 邀请弹窗 -->
      <mt-popup v-model="showShare" position="bottom" class="showModal">
          <div class="m-top">
            <div @click="ftf">
                <img src="../assets/image/fx3.png" />
                <p>面对面邀请</p>
              </div>
             <div @click="toShare(false,'wx')">
                <img src="../assets/image/fx1.png" />
                <p>微信邀请</p>
              </div>
          </div>
          <div class="m-bottom">
            <div @click="toShare(false,'pyq')">
                <img src="../assets/image/fx2.png" />
                <p>朋友圈邀请</p>
              </div>
               <div @click="toShare(false,'qq')">
                <img src="../assets/image/fx4.png" />
                <p>QQ邀请</p>
              </div>
              <div @click="toShare(false,'qqkj')">
                <img src="../assets/image/fx5.png" />
                <p>QQ空间邀请</p>
              </div>
          </div>
          <div class="m-cancle" @click="showShare = false">
            取消
          </div>
      </mt-popup>
      <!-- 活动规则 -->
      <transition name="fade">
        <div v-if="isShowRule" class="ruleMask" @click="isShowRule = false">
          <div class="r-inner">
            <div class="r-content">
              <h3>邀请奖励规则</h3>
              <p>1. 活动期间，用户成功邀请一个好友注册，即双方各获得1元现金红包；</p>
              <p>2. 被邀请方在平台上完成自助缴纳社保/公积金，即邀请方获得10元返现红包；</p>
              <p>3. 邀请的好友越多，可获得最高奖励66元；每个用户限制邀请6个好友；</p>
              <p>4. 邀请双方均需在{{app_verson}}以上版本才支持获得邀请奖励，如非最新版请更新版本。</p>
              <div class="d-1">
                <div>本活动一切解释权归{{this.$store.state.appID == 3 || this.$store.state.appID == 9?'记加班记账':'人人社保'}}所有，</div>
                <div>如有违规，将取消一切活动参与资格与奖励。</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
  </div>
</template>
<script>
// code: 10000 获取邀请页面数据失败
// code: 10001 获取邀请好友列表数据失败
// code: 10002 获取分享图片失败
import { Swipe, SwipeItem } from 'mint-ui';
import qs from 'qs';
import { MessageBox } from 'mint-ui';
export default {
  name: 'invite',
  data () {
    return {
      app_id:this.$store.state.appID,
      info:null,
      bgImg:require('../assets/image/tab.png'),
      isActive: 1,
      isShowRule: false,
      showShare: false, 
      isQRcode: true,
      url:'',
      isload: false,
      list:[],
      swiperOption: {
          autoplay:true,
          loop: true,
          direction : 'vertical',
        },
    }
  },
  computed:{
    app_name:function(){
      if(this.$store.state.appID == 3 || this.$store.state.appID == 9){
        return '记加班'
      }else{
        return '人人社保'
      }
    },
    app_verson:function(){
      if(this.$store.state.appID == 3){
        return '1.4.0'
      }else{
        return '1.3.1'
      }
    }
  },
  created(){
    this.getInfo();
    this.getInvite();
  },
  methods:{
    onClickRule(){
      _czc.push(['_trackEvent', '邀请好友', '活动规则', this.app_name, '', '']);
      this.isShowRule = true
    },
    //获取页面信息
    async getInfo(){
      let params = qs.stringify({
        user_id:this.$store.state.userID,
        appid:this.$store.state.appID
      })
      let resp = null;
      if(this.app_id == 3 || this.app_id == 9){
        resp = await this.axios.post('api/jijiaban/invite/getInviteConfig',params);
      }else{
        resp = await this.axios.post('api/shebao/invite/getInviteConfig ',params);
      }
      if(resp.data.code == 1){
        this.info = resp.data.data;
        this.getImageUrl();
        this.isload = true;
      }else{
        MessageBox.alert('code:10000','error')
      }
    },
    //获取邀请列表
    async getInvite(){
      let params = qs.stringify({
        user_id:this.$store.state.userID,
        appid:this.$store.state.appID
      })
      let resp = null;
      if(this.app_id == 3 || this.app_id == 9){
        resp = await this.axios.post('api/jijiaban/invite/getInviteList',params);
      }else{
        resp = await this.axios.post('api/shebao/invite/getInviteList',params);
      }
      if(resp.data.code == 1){
        this.list = resp.data.data;
      }else{
        MessageBox.alert('code:10001','error')
      }
    },
    onCash(){
      _czc.push(['_trackEvent', '邀请好友', '提现红包', this.app_name, '', '']);
      var t = this.$store.state.phoneType;
      t == 'Android'? mylistner.toMyRed():t=='IOS'?toMyRed():'';
    },
    ftf(){
      _czc.push(['_trackEvent', '邀请好友', '面对面邀请', this.app_name, '', '']);
      const that = this;
      this.$router.push({
          name: 'face',
          params: {
            url: that.info&&that.info.url
          }
      })
    },
    onShare(item){
      this.showShare = true;
      if(item == '去邀请'){
        _czc.push(['_trackEvent', '邀请好友', '去邀请', this.app_name, '', '']);
      }else if(item == '赚红包'){
        _czc.push(['_trackEvent', '邀请好友', '赚红包', this.app_name, '', '']);
      }else if(item == 'none'){
        _czc.push(['_trackEvent', '邀请好友', '无好友邀请', this.app_name, '', '']);
      }else if(item == 'have'){
        _czc.push(['_trackEvent', '邀请好友', '有好友邀请', this.app_name, '', '']);
      }
    },
    toShare(flag,type){
      if(!this.url){
        return
      }
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let ms = flag?'底部':'弹窗';
      let app_name = (this.app_id == 3 || this.app_id == 9)?'记加班':'人人社保' 
      if(isAndroid){
         if(type == 'wx'){
           _czc.push(['_trackEvent', '邀请好友', ms+'微信分享', this.app_name, '', '']);
            mylistner.shareImgWX(this.url)
          }else if(type == 'pyq'){
            _czc.push(['_trackEvent', '邀请好友', ms+'朋友圈分享', this.app_name, '', '']);
            mylistner.shareImgWXCIRCLE(this.url)
          }else if(type == 'qq'){
            _czc.push(['_trackEvent', '邀请好友', ms+'qq邀请', this.app_name, '', '']);
            mylistner.shareImgQQ(this.url)
          }else{
            _czc.push(['_trackEvent', '邀请好友', ms+'qq空间分享', this.app_name, '', '']);
            mylistner.shareImgQZONE(this.url)
          }
      }
      if(isiOS){
        if(type == 'wx'){
           _czc.push(['_trackEvent', '邀请好友', ms+'微信分享', this.app_name, '', '']);
            shareImgWX(this.url)
          }else if(type == 'pyq'){
             _czc.push(['_trackEvent', '邀请好友', ms+'朋友圈分享', this.app_name, '', '']);
            shareImgWXCIRCLE(this.url)
          }else if(type == 'qq'){
            _czc.push(['_trackEvent', '邀请好友', ms+'qq邀请', this.app_name, '', '']);
            shareImgQQ(this.url)
          }else{
            _czc.push(['_trackEvent', '邀请好友', ms+'qq空间分享', this.app_name, '', '']);
            shareImgQZONE(this.url)
          }
      }
    },
    //获取分享图片url
    async getImageUrl(){
      let params = qs.stringify({
        user_id:this.$store.state.userID,
        size: '335-335',
        cover: location.href.includes('test')?'http://test.shebao.dai58.cn/html/share_img/share_img1.jpg':'http://shebao.dai58.cn/html/share_img/share_img1.jpg',
        url: this.info.url,
        coord: '216-688'
      })
      const resp = await this.axios.post('api/shebao/invite/makeImg',params);
      if(resp.data.code == 1){
        this.url = resp.data.data.share_img
      }else{
        MessageBox.alert('code:10002','error')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.png{
  .png-inner{
    position: relative;
    width: 375px;
    height: 667px;
    img{
      width: 375px;
      height: 667px;
    }
    #qrcode{
      position: absolute;
      top: 355px;
      left: 50%;
      margin-left: -68px;
    
    }
  }
}
  .invite{
    background: #853dfd;
     .mint-swipe {
        height: 0.33rem;
        .mint-swipe-item {
        line-height: .33rem;
      }
      }
    .i-header{
      height: 0.33rem;
      background-color: rgba(0,0,0,.3);
      padding-left: .2rem;
      display: flex;
        img.swiperImg{
          width: .16rem;
          height: .16rem;
          align-self: center;
        }
      .swiper{
        font-size: 0.14rem;
        display: flex;
        align-items: center;
        color: #ffffff;
        p{
          padding-left: .15rem;
        }
      }
    }
    .i-get{
      width: 100%;
      position: relative;
      .g-active{
        position: absolute;
        top: .27rem;
        right: 0;
        display: inline-block;
        height: .9rem;
        width: .37rem;
        z-index: 1;
      }
      .g-title{
        font-size: .16rem;
        color: #d73e3c;
        font-weight: bold;
        position: absolute;
        top: .47rem;
        width: 100%;
        text-align: center;
      }
      h3{
        position: absolute;
        top: 0.77rem;
        width: 100%;
        text-align: center;
        font-size: .25rem;
        color: #d73e3c;
        strong{
          font-size: .6rem;
        }
      }
      img{
        width: 100%;
        display: block;
      }
      .btn{
        position: absolute;
        top: 72%;
        left: 50%;
        margin-left: -1.135rem;
        width: 2.27rem;
        height: 0.67rem;
        background-image: url('../assets/image/tixian.png');
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .i-bottom{
      .b-tab{
        display: flex;
        span{
          flex-grow: 1;
          height: .5rem;
          text-align: center;
          line-height: .5rem;
          font-size: .18rem;
          color: #4e2a89;
          background:url(../assets/image/tab.png);
          background-size: 100%;
        }
        span.tabActive{
          background:url(../assets/image/tabactive.png);
          color: #ffffff;
        }
      }
      .b-content{
        .c-invite{
        padding-top: .4rem;
        position: relative;
        .i-title{
          width: 100%;
          margin-bottom: .15rem;
          p{
            position: absolute;
            top: .34rem;
            width: 100%;
            text-align: center;
            font-size: .2rem;
            color: #ffffff;
            font-weight: bold;
          }
          img{
            width: 2.2rem;
            height: .26rem;
            display: block;
            margin: 0 auto;
          }
        }
        .i-content{
          width: 100%;
          img{
            width: 100%;
            // width: 3.6rem;
            // height: .31rem;
            display: block;
            margin: auto;
          }
          .c-skill{
            height: auto !important;
            table{
              width: 98%;
              margin: 0 auto;
              font-size: .14rem;
              padding-bottom: .3rem;
              .c-top{
                height: .4rem;
                color: #666666;
                background: #e5e5e5;
              }
              .c-cell{
                text-align: center;
                height: .4rem;
                color: #333333;
              }
              .c-cell:nth-child(2n-1){
                background: #f8f8f8;
              }
            }
          }
          .c-content{
            // width: 3.55rem;
            width: 94.5%;
            height: 2.2rem;
            background: #ffffff;
            margin: 0 auto;
            margin-top: -1px;
            .c-title{
              font-size: .16rem;
              color: #333333;
              padding-top: .2rem;
              text-align: center;
            }
            .big-title{
              padding: .2rem 0;
              font-size: .18rem;
              font-weight: bold;
              color: #ee2e36;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                width: .26rem;
                height: .26rem;
                display: inline-block;
                margin: .08rem;
              }
            }
            p.com{
              font-size: .14rem;
              color: #333333;
              padding: 0 .1rem;
              padding-bottom: .2rem;
              span{
                color:#ee2e36;
              }
            }
            .c-momey{
              font-size: .16rem;
              text-align: center;
              padding: .2rem 0px;
              span{
                color: #ee2e36;
              }
            }
            .c-times{
              font-size: .16rem;
              text-align: center;
              padding-bottom: .2rem;
              span{
                color: #ee2e36;
              }
            }
            .c-btn{
              width: 1.77rem;
              height: .67rem;
              // display: inline-block;
              margin: 0 auto;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .c-nofriend{
              width: 100%;
              text-align: center;
              font-size: .14rem;
              color: #999999;
              img{
                width: .865rem;
                height: .65rem;
                margin-bottom: .2rem;
              }
            }
            .c-invite-friend{
              width: 1.77rem;
              height: .67rem;
              background-image: url('../assets/image/kqyqhy.png');
              background-size: 100%;
              margin: .5rem auto .3rem auto;
            }
          }
        }
      }
    }
    .c-share{
     display: flex;
     position: fixed;
     background: #853dfd;
     bottom: 0;
     left: 0;
     width: 100%;
     justify-content: center;
     box-shadow: 0 -1px 10px rgba(0,0,0,.4);
     div{
       text-align: center;
       flex-grow: 1;
       height: .8rem;
       img{
         width: .36rem;
         height: .36rem;
         display: block;
         margin: .08rem auto;
       }
       p{

         font-size: .11rem;
         color: #ffffff;
       }
     }
     .s-invite{
       height: .5rem;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: .18rem;
       color: #ffffff;
       img{
         width: .18rem;
         height: .18rem;
         display: inline-block;
         margin: 0;
         margin-right: .1rem;
       }
     }
    }
  }
  .showModal{
    font-size: .11rem;
    width: 100%;
    p{
      text-align: center;
    }
    .m-top{
      height: 1rem;
      display: flex;
      div{
        flex-grow: 1;
        img{
         width: .48rem;
         height: .48rem;
         display: block;
         margin: .08rem auto;
       }
      }
    }
    .m-bottom{
      height: 1rem;
      display: flex;
       div{
        flex-grow: 1;
        img{
         width: .48rem;
         height: .48rem;
         display: block;
         margin: .08rem auto;
       }
      }
    }
    .m-cancle{
      height: .5rem;
      font-size: .16rem;
      color: #333333;
      text-align: center;
      line-height: .5rem;
      border-top: 0.01rem solid #eee;
    }
  }
  .ruleMask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    .r-inner{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .r-content{
        width: 90%;
        background: #ffffff;
        border-radius: .1rem;
        font-size: .14rem;
        overflow: hidden;
        h3{
          height: .5rem;
          font-size: .22rem;
          color: #333333;
          line-height: .5rem;
          text-align: center;
          background: #eeeeee;
        }
        p{
          margin-top: .2rem;
          color: #333333;
          padding: 0 .2rem;
        }
        .d-1{
          text-align: center;
          color: #999999;
         line-height: 1.5;
         margin: .3rem 0;
        }
      }
    }
  }
}
</style>

