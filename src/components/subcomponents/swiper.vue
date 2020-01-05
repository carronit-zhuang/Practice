<template>
  <div>
        <mt-swipe :auto="4000">
      <!-- 在组件中使用v-for循环渲染的时候，必须用:key 绑定字符串或者数字 -->
      <!-- 将来，谁使用此轮播图组件，谁为我们传递 lunbotuList,此时的lunbotuList应该是涉及到父组件向子组件传值 -->
      <mt-swipe-item v-for='item in lunbotuList' :key='item.id'>
        <img :src="item.img" :class="{full:isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
<!-- 分析：为什么 商品中的轮播图这么丑
1.首页中的图片宽高都是100%，才好看
2.在商品详情页面中的图片，要高度100%，宽度自适应才好看
3.分歧点就是： 用到的图片宽度到底是100% 还是自适应？
5.既然两个轮播图其他方面没有冲突，只是宽度存在分歧，那么我们可以自定义一个属性，手动指定图片是否为100%的宽度 -->
</template> 

<script>
export default {
  props: ['lunbotuList','isfull']
}
</script>


<style lang="scss" scoped>
  .mint-swipe {
  height: 200px;
  text-align: center;
  .mint-swipe-item {
    img {
      // width: 100%;
      height: 100%;
    }
  }
}
.full {
  width: 100%;
}
</style>