import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/reset.css'
import './assets/iconfont/iconfont.css'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 轮播图
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(Swipe);
Vue.use(SwipeItem);

// 倒计时
import { CountDown } from 'vant';
Vue.use(CountDown);

// 分享
import { ShareSheet } from 'vant';
Vue.use(ShareSheet);

// 下拉刷新
import { PullRefresh } from 'vant';
Vue.use(PullRefresh);
// 提示框
import { Toast } from 'vant';
Vue.use(Toast);

// 导入过滤器
import './utils/filter'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
