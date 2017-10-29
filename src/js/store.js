import Vue from 'vue'


// 先把 本地存储中的 商品数据，提取出来
var car = JSON.parse(localStorage.getItem('car') || '[]');


import Vuex from 'vuex'
// 7.2 注册 Vuex　到　Vue　上
Vue.use(Vuex)
// 7.3 创建 store 实例对象
var store = new Vuex.Store({
  state: { // 存放共享数据的
    car: car // 购物车，将来可能存放这样的数据   car: [ {id:88, count:1}, { id:89, count:2 } ]

    // var goodscount = {
    //   88: 1,
    //   89: 2
    // }
  },
  mutations: { // 存放修改 state 上数据的方法
    addToCar(state, goods) { // 注意：这个 goods 应该长这样：   {id:88, count:1}
      // state.car.push(goods);
      var flag = true;

      state.car.some(item => {
        if (item.id == goods.id) {
          // 如果能找到对应的商品Id，这只更新 car 上对应商品的数量；
          item.count += goods.count;
          flag = false;
          // 终止循环
          return true;
        }
      });
   // 这里的this可以省略掉了
      if (flag) {
        state.car.push(goods);
      }

      localStorage.setItem('car', JSON.stringify(state.car));
    },
    resetGoodsCount(state, goods) { // 将最新的商品数量覆盖 car中的旧数量
      state.car.some(item => {
        if (item.id == goods.id) {
          item.count = goods.count;
          return true;
        }
      });

      localStorage.setItem('car', JSON.stringify(state.car));
    },
    delGoodsFromCar(state, id) { // 根据指定的Id删除对应的商品
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      });

      localStorage.setItem('car', JSON.stringify(state.car));
    }
  }
});

export default store;