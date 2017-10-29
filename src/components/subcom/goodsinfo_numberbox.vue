<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="count" />
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
  props: ['maxcount'],
  watch: {
    "maxcount": function(newVal) {
      // 当监听到 maxcount 值改变之后，立即重新设置 number box的最大值
      mui('.mui-numbox').numbox().setOption('max', newVal);
    }
  },
  methods: {
    countChanged() {
      // 每当 文本框的 数量改变之后，立即获取到最新的数量值
      var count = parseInt(this.$refs.count.value);
      // 将数量值，通过  事件调用的形式， 传递给 父组件
      this.$emit('func', count);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
