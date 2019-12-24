// 入口文件
import Vue from "vue";

// 引入app组件
import app from './App.vue';

// 按需要导入mint-ui中的组件
import {Header} from 'mint-ui';
// 注册组件
Vue.component(Header.name,Header);

// 导入MUI的样式
import './lib/mui/css/mui.min.css';

var vm = new Vue({
  el: '#app',
  render: c => c(app)
})