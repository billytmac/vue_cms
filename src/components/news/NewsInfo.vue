<template>
  <div class="newsinfo-box">
    <h4>{{info.title}}</h4>

    <p class="info">
      <span>发表时间：{{info.add_time | dateFormat}}</span>
      <span>点击{{info.click}}次</span>
    </p>
    <hr>

    <div class="content" v-html="info.content"></div>


    <comment :artId="id"></comment>
  </div>
</template>

<script>
// 1. 在父组件中，如果要使用子组件了，第一步：导入子组件
import comment from '../subcom/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, // 新闻的Id
      info: {}
    }
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      var url = 'api/getnew/' + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0]
        } else {
          console.log('获取新闻详情失败！');
        }
      })
    }
  },
  components: { comment } // 2. 将导入的子组件，通过 components 属性，注册为父组件的子组件，将来，可以在需要的地方，通过 标签形式，引入 注册的子组件
}
</script>

<style lang="scss">
.newsinfo-box {
  padding: 0 3px;

  >h4 {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color:red;
  }

  >.info {
    display: flex;
    justify-content: space-between;
    color: #26A2FF;
  }

  >.content {
    img {
      width: 100%;
    }
  }
}
</style>
