<template>
  <div>
  <div class="evaluation-info">
    <div class="eva-header">
      <p class="eva-user-info">
        <span class="eva-img">
          <img :src="imageDomain + evaluation.customerLogo" v-if="evaluation.customerLogo">
          <img src="../assets/img/avatar.png" v-else>
        </span>
        {{evaluation.customerName}}
        <span class="eva-time">{{evaluation.createTime | datetime}}</span>
      </p>
      <p class="eva-star">
        评分：<img src="../assets/img/five-star.png" v-if="evaluation.star == 5">
        <img src="../assets/img/four-star.png" v-if="evaluation.star == 4">
        <img src="../assets/img/three-star.png" v-if="evaluation.star == 3">
        <img src="../assets/img/two-star.png" v-if="evaluation.star == 2">
        <img src="../assets/img/one-star.png" v-if="evaluation.star == 1">
        <img src="../assets/img/zero-star.png" v-if="evaluation.star == 0">
        <button class="btn" v-if="evaluation.customerId == loginId" @click.prevent="delEvaluation(evaluation.id)">删除</button>
      </p>
    </div>
    <div class="eva-pic clearfix">
        <div class="pic-item" @click="showImg(image.photoPath)" v-bind:style="{backgroundImage: 'url('+imageDomain+image.photoPath+')'}" v-for="image in evaluation.photoList"></div>
    </div>
    <div class="eva-body">
      {{evaluation.content}}
    </div>
  </div>
  <dialog :show.sync="delDialog" ok-text="取消" cancel-text="删除" v-on:confirm-msg="confirmDel">
    <div slot="dialog-header" class="dialog-header">
      <h4 class="dialog-title" id="myModalLabel">
        <span id="prompt_title">
          确认删除此评论？
        </span>
     </h4>
    </div>
  </dialog>
  <!-- comment pic-->
  <comment-pic :show.sync="showPic" :image-path="commentPic"></comment-pic>
</div>
</template>
<script>
import Dialog from '../components/Dialog'
import toast from '../js/toast'
import CommentPic from './CommentPic'
export default {
  props: {
    evaluation: Object
  },
  data () {
    return {
      loginId: '',
      token: '',
      delCommentId: '',
      delDialog: false,
      imageDomain: 'http://meimeidou.qiniudn.com/',
      commentPic: null,
      showPic: false
    }
  },
  created () {
    this.loginId = localStorage.getItem('loginid')
    this.token = localStorage.getItem('token')
  },
  methods: {
    delEvaluation (id) {
      this.delDialog = true
      this.delCommentId = id
    },
    confirmDel () {
      let self = this
      if (self.token) {
        self.$http.post(window.ctx + '/api/comment/t/delete', {commentId: self.delCommentId}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            self.$parent.evaluations.$remove(self.evaluation)
            this.delDialog = false
            toast('删除成功')
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          } else {
            this.delDialog = false
            toast('删除失败')
          }
        })
      }else {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    },
    showImg (path) {
      this.commentPic = path
      this.showPic = true
    }
  },
  components: {
    Dialog,
    CommentPic
  }
}
</script>
<style scoped>
.evaluation-info {
  padding:10px 15px 10px 25px;
  font-size: 1.2rem;
}
.eva-header .eva-img {
  float: left;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  margin-right: 8px;
}
.eva-header>p {
  margin-bottom: 5px;
  height: 24px;
  line-height: 24px;
}
.eva-star {
  padding-left: 32px;
}
.eva-star button {
  float: right;
  background-color: #fff;
  border: 1px solid #ff6251;
  color: #ff6251;
  font-size: 1.3rem;
  padding: 2px 6px;
  box-sizing: border-box;
  height: 24px;
  line-height: 20px;
}
.eva-user-info .eva-time {
  float: right;
  color: #767676;
}
.eva-star>img {
  height: 16px;
  width: auto;
  margin-top: -5px;
  vertical-align: middle;
}
.eva-body {
  padding-left: 32px;
  line-height: 20px;
}
.eva-pic {
  margin-top: 10px;
  padding-left: 32px;
}
.eva-pic .pic-item {
  float: left;
  width: 60px;
  height: 60px;
  margin-right: 9px;
  margin-bottom: 9px;
  background:no-repeat center center;
  background-size: cover;
}
</style>
