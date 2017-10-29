<template>
  <div>

    <!-- 使用 mui 中的 medialist.html 改造出一个新闻列表 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
        <!-- 注意要 为 to 属性做表达式的变量拼接，则需要 为 to 设置为 属性绑定形式 :to="" -->
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{item.add_time | dateFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created(){
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      var url = 'api/getnewslist';
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message;
        } else {
          console.log('获取图文资讯列表失败！');
        }
      });
    }
  }
}
</script>


<style lang="scss" scoped>
.mui-media-body {
  h1 {
    font-size: 14px;
    font-weight: normal;
  }

  .mui-ellipsis {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #26A2FF;
  }
}
</style>