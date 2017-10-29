<template>
  <div class="goodsinfo-container">

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <myswipe :list="lunbotuList"></myswipe>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{info.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner box2">
          <div>
            市场价：
            <del>￥{{info.market_price}}</del> 销售价：
            <span class="price">￥{{info.sell_price}}</span>
          </div>
          <div>
            购买数量：
            <numberbox :maxcount="info.stock_quantity" @func="getNumber"></numberbox>
          </div>
          <div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{info.goods_no}}</p>
          <p>库存情况：{{info.stock_quantity}}件</p>
          <p>上架时间：{{info.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="toGoodsDesc">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="toGoodsComment">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
// 导入轮播图组件
import myswipe from '../subcom/myswipe.vue'
// 导入配置文件
import config from '../../js/globalConfig.js'
// 引入数字选择框
import numberbox from '../subcom/goodsinfo_numberbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [], // 存放轮播图
      info: {}, // 商品详情
      flag :false, // 默认隐藏小球
      selectedCount: 1 // 默认用户选中了1个商品
    }
  },
  created() {
    this.getLunBo();
    this.getGoodsInfo();
  },
  methods: {
    getLunBo() { // 获取商品轮播图
      var url = 'api/getthumimages/' + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          // 为 轮播图组件拼接完整的可用的 img 路径
          res.body.message.forEach(x => {
            x.img = config.baseImgUrl + x.src;
          });
          this.lunbotuList = res.body.message;
        } else {
          console.log('获取商品轮播图失败！');
        }
      });
    },
    getGoodsInfo() { // 获取商品详情数据
      var url = 'api/goods/getinfo/' + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0];
        } else {
          console.log('获取商品数据失败！');
        }
      });
    },
    toGoodsDesc() { // 跳转到图文详情页面  
      // 编程式导航 this.$router.push('')
      // this.$router.push('/home/goodsdesc/' + this.id);
      this.$router.push({ name: 'goodsdesc', params: { id: this.id } });
    },
    toGoodsComment() { // 跳转到商品评论页面
      this.$router.push('/home/goodscomment/' + this.id);
    },
    addToCar(){ // 点击加入购物车
      this.flag = !this.flag;
      // 将购买商品的Id和 数量，怼成一个对象，通过 this.$store.commit('') 调用 Store 上的方法，把数据保存到 car 中
      this.$store.commit('addToCar', {id: this.id, count: this.selectedCount});
    },
    beforeEnter(el){
      el.style.transform = 'translate(0, 0)';
    },
    enter(el, done){
      el.offsetWidth;
      el.style.transform = 'translate(88px, '+ (250 + window.pageYOffset) +'px)';
      done();
    },
    afterEnter(){
      this.flag = !this.flag;
    },
    getNumber(c){ // 获取 子组件中传递过来的 count值
      // console.log(c);
      this.selectedCount = c;
    }
  },
  components: { myswipe, numberbox }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .box2 {
    >div {
      margin: 8px 0;
      del {
        font-size: 13px;
        margin-right: 10px;
      }
      .price {
        color: red;
        font-size: 16px;
      }
    }
  }
}

.mui-card-footer {
  flex-direction: column;
  button {
    margin: 10px 0;
  }
}

.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%; // background: radial-gradient(circle at 6px 6px, red, black);
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 371px;
  left: 150px;
  transition: all 0.5s cubic-bezier(.4,-0.3,1,.68);
}
</style>
