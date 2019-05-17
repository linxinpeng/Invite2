<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
!function(b, a){
    var c = b.documentElement;
    a = function() {
        var a = c.clientWidth;
        a && (c.style.fontSize = a/375 * 100 + "px")
    };
    window.addEventListener("orientationchange" in window ? "orientationchange" : "resize", a, !1);
    b.addEventListener("DOMContentLoaded", a, !1)
}(document, window);
export default {
  name: 'App',
  created(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var t = isAndroid?'Android':isIOS?'IOS':'web';
    this.$store.dispatch('setPhoneType',t);
    this.getUrl();
  },
  methods:{
    getUrl(){
      let url = location.href;
      if(url){
        let a = url.split('?')[1].split('&');
        let arr = a.find( v=> v.indexOf('appid')>-1);
        let us = a.find( v => v.indexOf('user_id')>-1);
        if(us&&arr){
          this.$store.dispatch('setAppID',arr.split('=')[1]);
          this.$store.dispatch('setUserID',us.split('=')[1]);
          sessionStorage.setItem('AppID',arr.split('=')[1]);
          sessionStorage.setItem('UserID',us.split('=')[1])
        }
      }
    }
  }
}
</script>

<style>
*{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
  }
body,h1,h2,h3,h4,h5,p{
  margin: 0;
  font-family: 'PingFang SC';
}
ul{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
}
button{
  outline: none;
  border: none;
}
/* @media only screen and (min-device-width: 320px) and (-webkit-min-device-pixel-ratio: 2) {
  html{
    font-size:10px
  }
}

@media only screen and (min-device-width: 375px) and (-webkit-min-device-pixel-ratio: 2) {
  html{
    font-size: 12px;
  }

}

   

@media only screen and (min-device-width: 375px) and (-webkit-min-device-pixel-ratio: 3) {
　html{
  font-size:16px;
  } 
}

@media only screen and (min-device-width:412px) and (-webkit-min-device-pixel-ratio: 3) {
　html{
    font-size:20px;
  }
} */
</style>
