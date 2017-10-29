<template>
  <div>
    <h4>发表评论</h4>

    <hr>

    <textarea rows="3" placeholder="请输入要BB的内容(最多BB120个字)" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div id="comment-list">
      <div class="comment-box" v-for="(item, i) in commentList" :key="i">
        <div class="comment-title">第{{i+1}}楼&nbsp;用户：{{item.user_name}}&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
        <div class="comment-body">
          {{item.content}}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="loadmore">加载更多</mt-button>
  </div>
</template>


<script> 
// 导入 Toast 组件
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      pageindex: 1, // 默认展示第一页的数据
      commentList: [], // 评论数组
      msg: '' // 用户填写的评论内容
    }
  },
  created() {
    this.getCommentList();
  },
  methods: {
    getCommentList() { // 获取评论列表
      // 注意： artid 需要父组件通过 属性传递的形式，传递给子组件
      var url = 'api/getcomments/' + this.artId + '?pageindex=' + this.pageindex;
      this.$http.get(url).then(res => {
        var result = res.body;
        if (result.status === 0) {
          // 数组  有个 concat
          this.commentList = this.commentList.concat(result.message);
        } else {
          console.log('获取评论列表失败！');
        }
      });
    },
    loadmore() { // 点击加载下一页的评论
      this.pageindex++;
      this.getCommentList();
    },
    postComment() { // 点击提交评论数据到后台
      if (this.msg.trim().length === 0) {
        return Toast('评论内容不能为空！');
      }
      var url = 'api/postcomment/' + this.artId;
      this.$http.post(url, { content: this.msg }, { emulateJSON: true }).then(res => {
        if (res.body.status === 0) {
          Toast('发表评论OK！');
          // 为了防止重新获取数据后，之前的多页数据被清空的问题，我们直接将当前评论，手动 unshift 到评论列表的起始位置
          this.commentList.unshift({ user_name: '匿名用户', add_time: new Date(), content: this.msg });
          this.msg = '';
        } else {
          Toast('评论失败！');
        }
      });
    }
  },
  props: ["artId"]
}
</script>

<style lang="scss" scoped>
textarea {
  margin: 0;
  font-size: 14px;
}

#comment-list {
  margin: 5px 0;

  .comment-box {
    font-size: 13px;
    .comment-title {
      background-color: #ccc;
      line-height: 30px;
    }
    .comment-body {
      font-size: 14px;
      line-height: 35px;
      text-indent: 2em;
    }
  }
}
</style>
