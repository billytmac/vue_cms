<template>
  <div>

    <!-- 轮播图区域 -->
    <myswipe :list="list"></myswipe>

    <!-- 这是九宫格改造工程，改造的结果是六宫格， 基于 mui 的 grid-default.html 改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
import config from '../../js/globalConfig.js'
// 导入自定义轮播图组件
import myswipe from '../subcom/myswipe.vue'

export default {
  data() {
    return {
      list: [], // 用于存放轮播图的数组
      baseUrl: config.baseUrl
    }
  },
  created() {
    this.getLunbo();
  },
  methods: {
    getLunbo() {
      // 注意：如果全局设置了 请求的 baseURL ,那么， 组件中再发送请求的时候，URL地址前面不能带 /
      var url = 'api/getlunbo';
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          // 这个for循环，将 完整的图片URL给拼接了出来，这样就能直接交给轮播图组件去渲染
          res.body.message.forEach(item => {
            item.img = config.baseUrl + item.img;
          });
          this.list = res.body.message;
        } else {
          console.log('获取轮播图失败了！');
        }
      });
    }
  },
  components: { myswipe }
}
</script>

<style lang="scss" scoped>
.mui-table-view-cell {
  img {
    width: 60px;
  }
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 14px;
}

.mui-grid-view.mui-grid-9 {
  border: 0;
  background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
