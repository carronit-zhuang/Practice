<template>
  <div class='goodsinfo-container'>
     <transition 
     @before-enter="beforeEnter"
     @enter="enter"
     @after-enter="afterEnter">
     <div class="ball" v-show="ballFlag" ref="ball"></div>
     </transition>
    <!-- 商品轮播图区域 -->

    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
     </div>

    <!-- 商品购买区域 -->

    <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
					<p class="price">
            市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p class="num">购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox> </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- numbox组件里面的数值要传给外面的goodsinfo组件，涉及到子组件向父组件传值（事件调用机制）
            具体方法：父组件自定义的方法绑在子组件身上，然后z在子组件内部通过emit触发-->
          </p>
					</div>
				</div>
        </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
					  <p>商品货号：{{goodsinfo.goods_no}}</p>
					  <p>库存情况：{{goodsinfo.stock_quantity}}</p>
					  <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
          <mt-button type="primary" size='large' plain @click="goDesc(id)">图文介绍</mt-button>
       <!-- 只有flex布局了，br才不生效 -->
          <mt-button type='danger' size='large' plain @click="goComment(id)">商品评论</mt-button>

        </div>
			</div>

  </div>

</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
  data(){
    return{
      id: this.$route.params.id,  //将路由参数对象中的id挂载到data上，方便获取
      lunbotu:[],    //轮播图的数据
      goodsinfo: {},  //获取到的商品的信息
      ballFlag: false,  //控制小球隐藏和显示的标识符
      selectedCount: 1 //保存用户选中的商品数量，默认用户进来就买一个
    }
  },
  created(){
    this.getLunbotu()
    this.getGoodsInfo()
  },
  methods:{
    getLunbotu(){
        this.$http.get('api/getthumimages/'+this.id).then(result=>{
          if(result.body.status === 0){
            // 先循环轮播图数组中的每一项，为item添加img属性，因为swiper组件中只认识item.img，不认识item.src
            result.body.message.forEach(item => {
              item.img = item.src
            });
              this.lunbotu = result.body.message

          }
        })
    },
    getGoodsInfo(){
      //获取商品的详情信息
      this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
        if(result.body.status ===0 ){
          this.goodsinfo = result.body.message[0]
        }
      })
    },
    goDesc(id){
      // 利用编程式导航 跳转到图文详情界面
      this.$router.push({name: 'goodsdesc', params:{id}})
    },
    goComment(id){
      //利用编程式导航，跳转到评论页面
      this.$router.push({path: '/home/goodscomment/'+id})
    },
    addToShopCar(){
      this.ballFlag = !this.ballFlag
      // {id:商品的id , count:要购买的数量,price: 商品的单价, selected: false}
      // 手动拼接出一个要保存到store中car数组里的商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      }
      //再调用store中的mutations来将商品加入购物车
      this.$store.commit("addToCar",goodsinfo)
    },
    beforeEnter(el){
      el.style.transform = "translate(0,0)"
    },
    enter(el,done){
      el.offsetWidth;  //写这个保证动画的展示

        //小球动画的优化思路：
        // 不能把位置的横纵坐标直接写死了，而是应该根据不同的情况，动态计算出这个坐标值，否则手机的分辨率或者往下滑动，就会使小球消失不见
        // 具体解决方法： 先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让y值求差，x值也求差，得到的结果，就是小球的横纵坐标要位移的距离

      //获取小球在页面中的位置  (需要操作元素)
      const ballPostion = this.$refs.ball.getBoundingClientRect()
      //获取徽标在页面中的位置 由于它不像小球是这个页面的子组件，所以不能用ref的方式获得元素，这里可以简单用一下DOM操作，比较快
      const badgePosition = document.getElementById('badge').getBoundingClientRect()
      const xDist = badgePosition.left - ballPostion.left
      const yDist = badgePosition.top - ballPostion.top
      // 这里要用ES6的模板字符串
      el.style.transform = `translate(${xDist}px,${yDist}px)`
      // el.style.transform = "translate(92px,212px)"
      el.style.transition = "all 0.5s cubic-bezier(0,.11,1,.04) "
      done()
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count){
        //当子组件把选中的数量传递给父组件的时候，把值保存到Data身上
        this.selectedCount = count
        console.log('父组件拿到的数量值为：'+this.selectedCount)
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>

<style lang="scss" scoped>
  .goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    position: relative;
    .num {
      display: flex;
      justify-content: flex-start;
      line-height: 35px;
    }
    .now_price{
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
    .mui-card-footer{
      display: block;
      button {
        margin: 15px 0;
      }
    }
    .ball{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 367px;
      left: 146px;
    }
  }
</style>