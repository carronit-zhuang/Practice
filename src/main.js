// 入口文件
import Vue from "vue";

// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由
Vue.use(VueRouter);
// 1.3 引入自己的router.js路由模块
import router from './router.js';
// 安装图片的预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// 导入格式化时间的moment插件
import moment from 'moment';
// 定义全局的一个过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:MM:SS'){
  return moment(dataStr).format(pattern);
})

// 2.1 导入vue-resource
import VueResource from 'vue-resource';
// 2.2 安装vue-resource
Vue.use(VueResource);
//全局配置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post时候的表单数据格式
Vue.http.options.emulateJSON = true;
// 引入app组件
import app from './App.vue';

// 按需要导入mint-ui中的组件   但是要注意的是，在按需导入懒加载的时候，会导致懒加载图标丢失，此时只能全部导入
// import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui';
import MintUi from 'mint-ui'
// 注册组件
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
Vue.use(MintUi)
import 'mint-ui/lib/style.css'
// 导入MUI的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css'


var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router //1.4 挂载路由对象到vm实例上
})