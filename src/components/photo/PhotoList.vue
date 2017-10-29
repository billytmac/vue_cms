<template>
  <div>

    <!-- 图片分类滑动 效果 通过  mui 的 tab-top-webview-main.html -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id==0?'mui-active':'']" v-for="item in cateList" :key="item.id" @click="changeCategory(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>

    </div>

    <!-- 图片列表区域 -->
    <ul class="img_list">
      <router-link tag="li" v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/' + item.id">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="title">{{item.title}}</h1>
          <div class="content">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
// 为了使用 MUI 的滑动插件，咱们引入了JS
// 注意： mui 用到了 'caller', 'callee', and 'arguments' 这些JS属性，但是，这些属性，只能在非严格模式下使用，但是 webpack 打包好的 bundle.js 使用就是严格模式，所以会报错！！！
// 因此，需要使用 某种方式，把webpack打包好的 bundle.js 去掉严格模式
import mui from '../../lib/mui/js/mui.js'
// 导入全局配置
import config from '../../js/globalConfig.js'

export default {
  data() {
    return {
      cateList: [], // 存放图片分类的数组
      cateId: 0, // 默认选中的是全部分类，此时，展示的图片列表，也应该为全部的图片
      photoList: [] // 存放的是图片列表
    }
  },
  created() {
    this.getPhotoCategory();
    this.getPhotoList();
  },
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotoCategory() { // 获取图片分类列表
      var url = 'api/getimgcategory';
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          res.body.message.unshift({ title: '全部', id: 0 });
          this.cateList = res.body.message;
        } else {
          console.log('获取图片分类列表失败！');
        }
      })
    },
    getPhotoList() { // 获取图片列表
      var url = 'api/getimages/' + this.cateId;
      this.$http.get(url).then(res => {
        if (res.body.status == 0) {
          res.body.message.forEach(item => {
            item.img_url = config.baseImgUrl + item.img_url;
          });
          this.photoList = res.body.message;
        } else {
          console.log('获取图片列表失败！');
        }
      })
    },
    changeCategory(id) { // 修改选中的分类，并重新加载图片列表
      this.cateId = id;
      this.getPhotoList();
    }
  }
}

</script>

<style lang="scss" scoped>
// 使用这一行样式，取消 滑动时候的 警告问题
* {
  touch-action: pan-y;
}

.img_list {
  padding: 0;
  list-style-type: none;
  padding: 10px;
  padding-bottom: 0;
  margin: 0;

  li {
    background-color: #ccc;
    margin-bottom: 10px;
    box-shadow: 0 0 8px gray;
    position: relative;

    img {
      width: 100%;
      display: block;
    }
    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
      display: block;
    }

    .info {
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 0;
      color: white;
      padding: 0 3px;
      max-height: 86px;

      .title {
        font-size: 13px;
      }
      .content {
        font-size: 12px;
      }
    }
  }
}
</style>