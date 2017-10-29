<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="count" readonly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {
  data() {
    return {}
  },
  mounted() {
    mui('.mui-numbox').numbox();
  },
  methods: {
    countChanged() {
      // 每当 文本框的 数量改变之后，立即获取到最新的数量值
      var count = parseInt(this.$refs.count.value);
      // console.log(count + ' --- ' + this.goodsid);
      // 只有数量一被修改，则可以立即把 当前商品的 数量，同步到 Store 中
      this.$store.commit('resetGoodsCount', { id: this.goodsid, count: count });
    }
  },
  props: ['initcount', 'goodsid']
}
</script>

<style lang="scss" scoped>

</style>
