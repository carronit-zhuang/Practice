// 入口文件
import Vue from "vue";

// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由

//注册vuex状态管理器
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本的存储中把购物车的数据读出来，放到Store中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {//this.$store.state.***
    car: car //将购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，咱们可以将这个商品的对象设计成如下这个样子：
    // {id:商品的id , count:要购买的数量,price: 商品的单价, selected: false}

  },
  mutations: {//this.$store.commit('方法的名称'，'按需传递唯一的参数')
    addToCar(state,goodsinfo){
      //点击加入购物车时，把商品的信息保存到store中的car上
      // 分析：
      // 1.如果购物车中，之前早就有这个对应的商品了，那么只需要更新数量
      // 2.如果没有，则直接把商品的数据push到car中即可

      // 假设在购物车中，没有找到对应的商品
      var flag = false
      state.car.some(item=>{
        if(item.id === goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      //如果最终循环检查完毕，没有发现相同的商品，那么得到的flag就还是false，则把商品的数据对象直接push到购物车中
      if(!flag){
        state.car.push(goodsinfo)
      }
      //每当更新了car之后，要记得把car数组存储到本地的loaclStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      // 修改Vuex里购物车中商品的数量
      state.car.find(item=>{
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，就把最新的的数量保存到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeData(state,id){
      //根据传过来的id删除store中那条数据
      state.car.find((item,index)=>{
        if(item.id == id){
          state.car.splice(index,1)
          return true
        }
      })
      //将删除完毕后的最新数据重新写到本地存储中
      console.log(JSON.stringify(state.car))
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.find(item=>{
        if(item.id == info.id){
          item.selected = info.selected
          return true
        }
      })
      //更改了selected属性之后，再把更新后的开关状态保存到本地存储中去
      localStorage.setItem('car',JSON.stringify(state.car))
    }

  },
  getters: { //this.$store.getters.***
      //相当于计算属性，也相当于filters，做了一层包装
      getAllCount(state){
        var c = 0
        state.car.forEach(item=>{
          c += item.count
        })
        return c
      },
      getGoodsCount(state){
        var o = {}
        state.car.forEach(item=>{
          o[item.id] = item.count
        })
        return o
      },
      getGoodsSelected(state){
        let o = {}
        state.car.forEach(item=>{
          o[item.id] = item.selected
        })
        return o
      },
      getAllCountAndTotalPrice(state){
        let o ={
          count:0,
          totalPrice: 0
        }
        state.car.forEach(item=>{
          if(item.selected){
            o.count += item.count
            o.totalPrice += item.count*item.price
          }
        })
        return o
      }
  }

})

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
import './lib/mui/css/global.css'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, //1.4 挂载路由对象到vm实例上
  store   //挂载store状态管理对象
})