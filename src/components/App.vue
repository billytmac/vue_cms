<template>
  <div class="app-container">
    <!-- Header 区域 ，使用的是 Mint-UI 中的 Header组件 -->
    <mt-header fixed title="黑马程序员·gz10期">
      <span slot="left" @click="goback" v-if="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 用来占位的容器 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部的Tabbar 使用的是 mui 中的 tabbar -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item1" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{totalCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>


<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  created() {
    /* 在组件刚 创建的时候，判断当前的 路由是否等于 /home  如果不等于，则让 flag 为true */
    this.flag = !(this.$route.path === '/home');
  },
  computed: {
    totalCount() {
      // 定义一个 数量 c
      var c = 0;
      // 循环 遍历 store 上的 car ，把每个商品的数量，都加给 c;
      this.$store.state.car.forEach(item => {
        c += item.count;
      });
      // 总数量
      return c;
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {
    '$route.path': function(newVal, oldVal) {
      // if(newVal === '/home'){
      //   this.flag = false;
      // }else{
      //   this.flag = true;
      // }
      this.flag = !(newVal === '/home');
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px; // 注意：添加这一行，可以防止 路由切换动画的时候出现 Header和 tabbar 闪烁的问题
  overflow: hidden;
}

h4 {
  color: red;
}

.v-enter {
  opacity: 0; // 注意：mui 咱们的 动画位移有冲突
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0; // 让即将被销毁的组件，从当前页面往左离开
  transform: translateX(-100%); // 给即将离开的组件，设置定位，防止即将进入的组件闪烁问题
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.mui-bar-tab .mui-tab-item1.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item1 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item1 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
