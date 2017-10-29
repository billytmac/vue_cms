<template>
  <div class="goodsdesc-container">
    <h4>{{info.title}}</h4>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {} // 商品介绍
    }
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      var url = 'api/goods/getdesc/' + this.$route.params.id;
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0];
        } else {
          console.log('又失败了！');
        }
      });
    }
  }
}
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 3px;
  h4 {
    font-size: 14px;
    text-align: center;
    color: #26A2FF;
    margin: 15px 0;
  }

  .content{
    img{
      width: 100%;
    }
    p{
      margin: 0;
      img{
        display: block;
      }
    }
  }
}
</style>
