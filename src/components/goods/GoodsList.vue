<template>
  <div class="goodslist-box">

    <div class="goodslist">

      <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
        <img :src="item.img_url" alt="">
        <h1>{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="nowPrice">￥{{item.sell_price}}</span>
            <span class="oldPrice">￥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div>

      <mt-button type="danger" size="large" @click="loadmore">加载更多</mt-button>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      goodsList: [] // 保存商品列表的数组
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var url = 'api/getgoods?pageindex=' + this.pageIndex;
      // 1. 先调用 vue-resource 获取数据
      // 2. 拿到的数据结果，一般都需要进行校验；
      // 3. 根据判断的结果，进行不同的处理  -> 成功了做什么事情    ->失败了做什么事情
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          // 成功了之后，立即把数据绑定到 data 上
          // 如果要绑定了，那么data上必须有个 属性来存这个值
          // this.goodsList = res.body.message;
          this.goodsList = this.goodsList.concat(res.body.message);
        } else {
          console.log('获取商品列表失败！');
        }
      });
    },
    loadmore() { // 点击加载更多
      this.pageIndex++;
      this.getGoodsList();
    },
    goDetail(id) { // 点击 每一个商品信息，使用路由的 编程式导航，跳转到商品详细页面
      // this.$route.params   使用这个来获取路由中的参数
      // this.$router.push 实现编程式导航
      this.$router.push('/home/goodsinfo/' + id);
      // console.log(this);
    }
  }
}
</script>

<style lang="scss" scoped>
.goodslist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 7px;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    margin-bottom: 7px;
    padding: 2px;
    box-shadow: 0 0 7px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 270px;

    img {
      width: 100%;
    }
    h1 {
      font-size: 13px;
    }

    .info {
      background-color: #eee;
      overflow: hidden;

      p {
        margin: 5px;
      }

      .price {
        .nowPrice {
          color: red;
          font-size: 16px;
          margin-right: 10px;
        }
        .oldPrice {
          text-decoration: line-through;
          font-size: 12px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
