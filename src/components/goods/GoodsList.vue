<template>
  <div class="goods-list">
  <div class="goods-item">
    <img src="//gw.alicdn.com/bao/uploaded/i1/725677994/O1CN01seEFvC28vIjLzVQRv_!!0-item_pic.jpg">
    <h1 class="title">RIO锐澳3.8度经典6口味275ml*24果酒洋酒预调鸡尾酒量贩装整箱</h1>
    <div class="info">
      <p class="price">
        <span class="now">￥899</span>
        <span class="old">￥3999</span>
      </p>
      <p class="sell">
        <span>热卖中</span>
        <span>剩60件</span>
      </p>
    </div>
  </div>
  <div class="goods-item">
    <img src="//gw.alicdn.com/bao/uploaded/i1/725677994/O1CN01seEFvC28vIjLzVQRv_!!0-item_pic.jpg">
    <h1 class="title">RIO锐澳3.8度经典6口味275ml*24果酒洋酒预调鸡尾酒量贩装整箱</h1>
    <div class="info">
      <p class="price">
        <span class="now">￥899</span>
        <span class="old">￥3999</span>
      </p>
      <p class="sell">
        <span>热卖中</span>
        <span>剩60件</span>
      </p>
    </div>
  </div>
    <div class="goods-item">
      <img src="//gw.alicdn.com/bao/uploaded/i1/725677994/O1CN01seEFvC28vIjLzVQRv_!!0-item_pic.jpg">
      <h1 class="title">RIO锐澳3.8度经典6口味275ml*24果酒洋酒预调鸡尾酒量贩装整箱</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥899</span>
          <span class="old">￥3999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
    </div>
  </div>
   
  </div>
</template>

<script>
export default {
  
}
</script>


<style lang="scss" scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;
      img {
        width: 100%;
      }
      .title{
        font-size: 14px;
      }
      .info{
        .price{
          .now{
            color:red;
            font-weight: bold;
            font-size: 16px;
          }
          .old{
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .sell{
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
      }
    }
  }
</style>