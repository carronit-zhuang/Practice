// 入口文件
import Vue from "vue";

// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由
Vue.use(VueRouter);
// 1.3 引入自己的router.js路由模块
import router from './router.js';

// 2.1 导入vue-resource
import VueResource from 'vue-resource';
// 2.2 安装vue-resource
Vue.use(VueResource);

// 引入app组件
import app from './App.vue';

// 按需要导入mint-ui中的组件
import {Header,Swipe, SwipeItem} from 'mint-ui';
// 注册组件
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入MUI的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router //1.4 挂载路由对象到vm实例上
})