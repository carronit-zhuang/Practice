import VueRouter from "vue-router";

// 导入对应的路由组件
import Homecontainer from './components/Homecontainer.vue'
import Membercontainer from './components/Membercontainer.vue'
import Shopcarcontainer from './components/Shopcarcontainer.vue'
import Searchcontainer from './components/Searchcontainer.vue'


// 创建路由对象
var router = new VueRouter({
  routes: [   //配置路由的匹配规则
      {path: '/home', component: Homecontainer },
      {path: '/member', component: Membercontainer},
      {path: '/shopcar', component: Shopcarcontainer},
      {path: '/search', component: Searchcontainer},
      {path: '/', redirect: '/home'},
  ],
  linkActiveClass: 'mui-active',//替换默认的路由高亮的类，原类名叫做 router-link-active
});
// 把自己创建好的路由对象暴露出去，使其得以挂载到VM实例上面
export default router;