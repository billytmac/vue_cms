<template>
  <div class="photoinfo-container">
    <!-- 头部 -->
    <h4 class="title">{{info.title}}</h4>
    <p class="info">
      <span>发表时间：{{info.add_time | dateFormat}}</span>
      <span>点击：{{info.click}}次</span>
    </p>
    <hr>

    <!-- 图片缩略图预览 -->
    <div class="prevew-box">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="index">
    </div>

    <!-- 图片描述 -->
    <div class="content" v-html="info.content"></div>

    <!-- 评论区域 -->
    <comment :artId="id"></comment>
  </div>
</template>

<script>
// 导入评论子组件
import comment from '../subcom/comment.vue'
// 导入配置文件
import config from '../../js/globalConfig.js'

export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}, // 存放图片详情的对象
      list: [{
        src: 'http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230434303.jpg',
        w: 600,
        h: 400
      }, {
        src: 'http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230444755.jpg',
        w: 1200,
        h: 900
      }]
    }
  },
  created() {
    this.getPhotoInfo();
    this.getPhotoPreviewImg();
  },
  methods: {
    getPhotoInfo() { // 获取图片详情
      var url = 'api/getimageInfo/' + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0];
        } else {
          console.log('获取图片详情失败！');
        }
      });
    },
    getPhotoPreviewImg() { // 获取预览图片
      var url = 'api/getthumimages/' + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.src = config.baseImgUrl + item.src;
          });
          this.list = res.body.message;
        } else {
          console.log('获取缩略图失败！');
        }
      });
    }
  },
  components: { comment }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;

  .title {
    color: #26A2FF;
    font-size: 15px;
    text-align: center;
    line-height: 40px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .prevew-box{
    img{
      margin: 8px;
      box-shadow: 0 0 8px #aaa;
    }
  }
}
</style>
