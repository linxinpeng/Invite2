// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
import 'mint-ui/lib/style.css'; 
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'

axios.defaults.baseURL = location.href.includes('test')?'http://test.shebao.dai58.cn/':'http://shebao.dai58.cn/'
Vue.prototype.axios = axios
require('es6-promise').polyfill()
Es6Promise.polyfill()
 
Vue.use(VueAxios, axios)
Vue.use(Mint);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
      document.title = route.meta.title;
      // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          const hackIframe = document.createElement('iframe');
          hackIframe.style.display = 'none';
          hackIframe.src = './static/html/fixIosTitle.html?r=' + Math.random();
          document.body.appendChild(hackIframe);
          setTimeout(_ => {
              document.body.removeChild(hackIframe)
          }, 300)
      }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
