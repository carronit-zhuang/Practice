<template>
  <div class="goodsdesc-container">
    <h3>{{info.title}}</h3>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      info:{}  //获得的图文详情对象
    }
  },
  created(){
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc(){
      this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
        if(result.body.status === 0){
          this.info = result.body.message[0]
        }
      })
    }
  }
}
</script>

// 这里处理img太大，设置width:100%也没反应的情况下，把scoped去掉就搞定了
<style lang="scss">
  .goodsdesc-container {
    h3 {
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px;
    } 
    .content{
      img {
        width: 100%;
        // height: 100%;
      }
    }
  }
</style>