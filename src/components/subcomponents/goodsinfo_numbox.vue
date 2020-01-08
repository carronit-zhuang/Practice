<template>
 <!-- 问题出现：我们不知什么时候可以拿到goodsinfo中的最大值，但是总归有一刻，我们会得到真正的一个max值 -->
 <!-- 我们可以利用watch属性来监听路由或者数据的改变，来监听父组件传过来的max值，不管watch会被触发几次，但是，最后一次传的，肯定是一个合法的max值 -->
  <div>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
  </div>

  <!-- 注意 子组件应该何时把数据传递给父组件 ：应该在子组件里面数字发生变化的的时候就要传递一次-->
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data(){
    return{}
  },
  mounted(){
    //初始化数字选择框组件
    mui('.mui-numbox').numbox()
  },
  methods: {
    countChanged(){
      //每当子组件中文本框的数据被修改的时候，就要立即把最新的数据通过事件调用，传递给父组件
      // console.log(this.$refs.numbox.value)
      this.$emit('getcount',parseInt(this.$refs.numbox.value))
    }
  },
  props: ['max'],
  watch: {
    //属性的监听
    max: function(newVal,oldVal){
      //记得要导入mui.js ,然后使用JS API来设置numbox的最大值
      mui('.mui-numbox').numbox().setOption('max',this.max)
    }
  }
}
</script>


<style lang="scss" scoped>
  
</style>