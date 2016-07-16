<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="comment">
  <!-- <div class="comment-hd">
    <div class="comment-hd-img">
      <div><img src="../assets/img/member.png"></div>
    </div>
    <div class="comment-hd-text">
      <p class="comment-hd-hair">李东田<span>总监</span></p>
      <p class="comment-hd-project">服务项目：剪发</p>
    </div>
  </div> -->
  <div class="comment-bd">
    <div class="comment-control">
      <div class="comment-control-star">评分：<span class="comment-star" v-bind:class="{'active' : $index <= (star -1)}" v-for="item in items" @click="selectStar($index)"></span>
      </div>
      <div class="comment-control-upload">
        <button class="btn btn-upload">上传图片</button>
        <input type="file" v-model="upPic" @change="fileChange">
      </div>
    </div>
    <div class="comment-text">
      <textarea rows="3" placeholder="请输入评价内容" v-model="commentConent"></textarea>
    </div>
  </div>
  <div class="comment-btn">
    <div><button class="btn btn-default">取消</button></div>
    <div><button class="btn btn-info">提交评价</button></div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      star: 0,
      commentConent: null,
      upPic: null,
      token: '',
      items: [
        {star: 1},
        {star: 2},
        {star: 3},
        {star: 4},
        {star: 5}
      ]
    }
  },
  ready () {
    let self = this
    self.token = localStorage.getItem('token')
  },
  methods: {
    selectStar (index) {
      let self = this
      self.star = index + 1
    },
    fileChange (e) {
      console.log(e)
    }
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.comment {
  margin-top: 10px;
}
.comment-hd {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  background-color: #fff;
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
}
.comment-hd-img>div {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 10px;
}
.comment-hd-text {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  font-size: 1.5rem;
}
.comment-hd-hair>span {
  color: #a7a7a7;
  margin-left: 10px;
  font-size: 1.3rem;
}
.comment-hd-project {
  color: #a7a7a7;
  padding-left: 25px;
  background-image: url(../assets/img/order-project.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 16px;
  margin-top: 10px;
}
.comment-bd {
  background-color: #fff;
  padding:10px;
  font-size: 1.4rem;
}
.comment-bd .comment-star {
  display: inline-block;
  width: 20px;
  height: 18px;
  background-image: url(../assets/img/star.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 5px;
}
.comment-star.active {
  background-image: url(../assets/img/real-star.png);
}
.btn-upload {
  background-color: #fff;
  border: 2px solid #858585;
  color: #333;
  font-size: 1.3rem;
  background-image: url(../assets/img/upload.png);
  background-repeat: no-repeat;
  background-position: 6px center;
  background-size: 24px;
  padding-left: 35px;
  padding-right: 5px;
}
.comment-control,.comment-control-star {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.comment-control-star {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
}
.comment-control-upload {
  position: relative;
}
.comment-control-upload input[type=file] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.comment-btn {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  margin-top: 40px;
}
.comment-btn>div {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  text-align: center;
}
.comment-btn button {
  width: 50%;
}
.comment-text {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 15px;
  margin-top: 15px;
}
.comment-text textarea {
  display: block;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  resize: none;
  font-size: 1.4rem;
  width: 100%;
  line-height: 24px;
}
</style>
