import VueRouter from "vue-router";

// 导入对应的路由组件
import Homecontainer from './components/tabbar/HomeContainer.vue'
import Membercontainer from './components/tabbar/Membercontainer.vue'
import Shopcarcontainer from './components/tabbar/Shopcarcontainer.vue'
import Searchcontainer from './components/tabbar/Searchcontainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
// 创建路由对象
var router = new VueRouter({
  routes: [   //配置路由的匹配规则
      {path: '/home', component: Homecontainer },
      {path: '/member', component: Membercontainer},
      {path: '/shopcar', component: Shopcarcontainer},
      {path: '/search', component: Searchcontainer},
      {path: '/', redirect: '/home'},
      {path: '/home/newslist', component: NewsList},
      {path: '/home/newsinfo/:id', component: NewsInfo},
      {path: '/home/photolist', component: PhotoList},
      {path: '/home/photoinfo/:id', component: PhotoInfo},
      {path: '/home/goodslist', component: GoodsList},
      {path: '/home/goodsinfo/:id', component: GoodsInfo,name: 'goodsinfo'},
      {path: '/home/goodsdesc/:id',component: GoodsDesc, name: 'goodsdesc'},
      {path: '/home/goodscomment/:id', component: GoodsComment}
  ],
  linkActiveClass: 'mui-active',//替换默认的路由高亮的类，原类名叫做 router-link-active
});
// 把自己创建好的路由对象暴露出去，使其得以挂载到VM实例上面
export default router;