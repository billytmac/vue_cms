<template>
  <div>

    <div class="goodslist">

      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">

            <mt-switch v-model="switchList[i]"></mt-switch>
            <img :src="baseImgUrl + item.thumb_path">
            <div class="info-box">
              <h1 class="title">{{item.title}}</h1>
              <div class="info">
                <span class="price">￥{{item.sell_price}}</span>
                <numberbox :initcount="goodscount[item.id]" :goodsid="item.id"></numberbox>
                <a href="#" @click.prevent="del(item.id)">删除</a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div>
            <p>总计（不含运费）</p>
            <p>已勾选商品
              <span class="totalAmount">{{totalCount}}</span>件，总价：
              <span class="totalAmount">￥{{totalPrice}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    {{JSON.stringify(switchList)}} {{JSON.stringify(goodscount)}}

  </div>
</template>

<script>
import numberbox from '../subcom/shopcar_numberbox.vue'
import config from '../../js/globalConfig.js'

export default {
  data() {
    return {
      goodslist: [], // 存放商品数据的数组
      baseImgUrl: config.baseImgUrl, //  图片服务器的根路径
      switchList: [] // 存放开关值的数组
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 循环 商品数量（goodscount） 对象， 获取到所有商品的Id，拼接出一个 idStr
      var idStr = '';
      for (var key in this.goodscount) {
        idStr += key + ',';
      }
      if (idStr.length <= 0) { return; }
      idStr = idStr.substring(0, idStr.length - 1);
      // 注意：这里需要一个 idstr， 需要从 store 上把所有商品的Id，以英文逗号进行拼接
      var url = 'api/goods/getshopcarlist/' + idStr;
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          // console.log(res.body.message);
          this.goodslist = res.body.message;
          // 循环所有的商品，向开关数组中添加对应的 开关值，默认都是 false
          for (var i = 0; i < this.goodslist.length; i++) {
            this.switchList.push(false);
          }
        } else {
          console.log('获取商品数据失败！');
        }
      });
    },
    del(id) { // 根据Id删除商品数据
      this.$store.commit('delGoodsFromCar', id);
      this.goodslist.some((item, i) => {
        if (item.id == id) {
          this.goodslist.splice(i, 1);
          this.switchList.splice(i, 1);
          return true;
        }
      });
    }
  },
  computed: {
    goodscount() { // 这是一个对象，身上的属性名是 商品的Id, 属性值 是 商品的数量
      var o = {};
      this.$store.state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    totalCount() { // 勾选商品得数量
      var total = 0;
      // 循环 开关数组中得每个开关值
      this.switchList.forEach((item, i) => {
        // 代表这一项被打开 了，需要把对应商品得数量加起来
        if (item) {
          // 获取到这一个开关对应得商品
          // this.goodslist[i]
          var id = this.goodslist[i].id;
          var count = this.goodscount[id];
          total += count;
        }
      });
      return total;
    },
    totalPrice() { // 获取勾选商品的总价
      var total = 0;
      this.switchList.forEach((item, i) => {
        if (item) {
          var id = this.goodslist[i].id;
          var price = this.goodslist[i].sell_price;
          var count = this.goodscount[id];
          total += price * count;
        }
      });
      return total;
    }
  },
  components: { numberbox }
}
</script>

<style lang="scss" scoped>
.goodslist {
  background-color: #ddd;
  overflow: hidden;

  .mui-card-content-inner {
    display: flex;
    img {
      width: 60px;
      height: 60px;
    }
    .info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .title {
        font-size: 13px;
      }
      .info {
        display: flex;
        justify-content: space-between;

        .price {
          color: red;
        }
      }
    }
  }
}

.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.totalAmount {
  color: red;
  font-weight: bold;
  font-size: 18px;
}
</style>
