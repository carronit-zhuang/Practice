<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;" >
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="countInit" @change="countChanged" ref="numbox" readonly/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
  </div>

</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data(){
    return{}
  },
  mounted() {
    mui('.mui-numbox').numbox()
    
  },
  methods: {
    countChanged(){
      //数量改变了
      // console.log(this.$refs.numbox.value)
      this.$store.commit('updateGoodsInfo',{
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ['countInit','goodsid'],
  watch: {
  }
}
</script>


<style lang="scss" scoped>
  
</style>