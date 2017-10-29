import Vue from 'vue'

// 6.1 定义全局的时间格式化的过滤器
// {{ item.date | dateFormat('yyyy-mm-dd') }}
// moment.js
import moment from 'moment'
Vue.filter('dateFormat', function (val, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // 根据给定的值，得到 moment 类型的日期对象
  return moment(val).format(pattern);
});