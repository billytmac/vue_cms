import Vue from 'vue'


// 4.0 引入 组件
import HomeContainer from '../components/tabbar/HomeContainer.vue'
import MemberContaner from '../components/tabbar/MemberContainer.vue'
import ShopcarContainer from '../components/tabbar/ShopcarContainer.vue'
import SearchContainer from '../components/tabbar/SearchContainer.vue'
import NewsList from '../components/news/NewsList.vue'
import NewsInfo from '../components/news/NewsInfo.vue'
import PhotoList from '../components/photo/PhotoList.vue'
import PhotoInfo from '../components/photo/PhotoInfo.vue'
import GoodsList from '../components/goods/GoodsList.vue'
import GoodsInfo from '../components/goods/GoodsInfo.vue'
import GoodsDesc from '../components/goods/GodsDesc.vue'
import GoodsComment from '../components/goods/GoodsComment.vue'

// 4.1 导入路由模块
import VueRouter from 'vue-router'
// 4.2 注册 路由
Vue.use(VueRouter);
// 4.3 创建路由规则对象
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer }, // 首页 组件的路由规则
    { path: '/member', component: MemberContaner }, // 会员 组件的路由规则
    { path: '/shopcar', component: ShopcarContainer }, //购物车 组件的路由规则
    { path: '/search', component: SearchContainer }, // 搜索组件的路由规则
    { path: '/home/newslist', component: NewsList }, // 新闻列表组件路由规则
    { path: '/home/newsinfo/:id', component: NewsInfo }, // 新闻详情的路由规则
    { path: '/home/photolist', component: PhotoList }, // 图片列表的 路由规则
    { path: '/home/PhotoInfo/:id', component: PhotoInfo }, // 图片详情组件路由规则
    { path: '/home/goodslist', component: GoodsList, name: 'goodslist' }, // 商品列表组件路由规则
    { path: '/home/goodsinfo/:id', component: GoodsInfo }, // 商品详情页面路由规则
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' }, // 图文介绍路由规则
    { path: '/home/goodscomment/:id', component: GoodsComment }, // 商品评论路由规则
  ],
  linkActiveClass: 'mui-active'
});

export default router;