<template>
  <!-- 这是轮播图区域，使用的是 Mint-UI中的 Swipe 组件 -->
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item, i) in list" :key="i">
      <a :href="item.url" target="_blank">
        <!-- 注意：这里 img 的 src ,不要在手动拼接了，而是应该由 父组件 拼接好，传递进来，这样能保证 轮播图的 适用性 -->
        <img :src="item.img" alt="">
      </a>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 180px;

  .mint-swipe-item {
    text-align: center;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
}
</style>
