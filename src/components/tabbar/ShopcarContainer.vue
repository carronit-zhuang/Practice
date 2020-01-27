<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
   <div class="goods-list">
     <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change='selectedChange(item.id,$store.getters.getGoodsSelected[item.id])'></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :countInit="$store.getters.getGoodsCount[item.id]" :goodsid='item.id'></numbox>
                <!-- 问题：如何从购物车中获取商品的数量呢？ -->
                <!-- 我们可以先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的ID，作为对象的属性名，count作为对象的属性值，这样，当把所有的商品循环一遍，就会得到一个对象：{88:2, 89:1,90:4} -->
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
					</div>
				</div>
			</div>
    <!-- 商品结算区域 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="content">
              <p>总计（不含运费）</p>
              <p>已勾选商品<span class="red">{{$store.getters.getAllCountAndTotalPrice.count}}</span>件，总价<span class="red">￥{{$store.getters.getAllCountAndTotalPrice.totalPrice}}</span></p>
            </div>
            <mt-button type='danger'>去结算</mt-button>
					</div>
				</div>
			</div>
   </div>
   <!-- <p>{{$store.getters.getGoodsSelected}}</p> -->

   
  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
  data(){
    return{
      goodslist: [] //购物车中所有商品的数据
    }
  },
  created(){
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      //获取到store中所有商品的id,然后拼接成一个用逗号分割开的字符串
      var idArr = []
      this.$store.state.car.forEach(item => {
        idArr.push(item.id)
      });
      //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if(idArr.length<=0){
        return
      }
      //获取购物车商品列表
      this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
        if(result.body.status ===0 ){
          this.goodslist = result.body.message
        }
      })
    },
    remove(id,index){
      //点击删除，根据id删除vuex中的商品数据，根据index删除goodslist中的商品数据
      this.goodslist.splice(index,1)
      this.$store.commit('removeData',id)
    },
    selectedChange(id,val){
      //每当点击开关，把最新的开关状态同步到store中去
      // console.log(id,'-------------',val)
      this.$store.commit('updateGoodsSelected',{id,selected:val})
    }
  },
  components:{
    numbox
  }
}
</script>


<style lang="scss" scoped>
  .shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
      .mui-card-content-inner{
        display: flex;
        align-items: center;
        position: relative;
      }
      img{
        width: 60px;
        height: 60px;
      }
      h1{
        font-size: 13px;
        height: 20px;
      }
      .info{
        height: 60px;
        p{
          display: flex;
          margin: 0;
          position: absolute;
          right:20px;
          bottom:15px;
        }
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price{
          color: red;
          font-weight: bold;
        }
      }
      .mui-card-content-inner{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>