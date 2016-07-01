<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="comment">
  <div class="comment-hd">
    <div class="comment-hd-img">
      <div><img src="../assets/img/member.png"></div>
    </div>
    <div class="comment-hd-text">
      <p class="comment-hd-hair">李东田<span>总监</span></p>
      <p class="comment-hd-project">服务项目：剪发</p>
    </div>
  </div>
  <div class="comment-bd">
    <div class="comment-control">
      <div class="comment-control-star">评分：<span class="comment-star"></span></div>
      <div class="comment-control-upload"><button class="btn btn-upload">上传图片</button></div>
    </div>
    <div class="comment-text">
      <textarea rows="3" placeholder="请输入评价内容"></textarea>
    </div>
  </div>
  <div class="comment-btn">
    <div><button class="btn btn-default">取消</button></div>
    <div><button class="btn btn-info">提交评价</button></div>
  </div>
</div>
</template>
<script></script>
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
  overflow: hidden;
  width: 100px;
  height: 18px;
  background-image: url(../assets/img/star.png);
  background-repeat: repeat-x;
  background-position: center;
  background-size: 20px 18px;
}
.btn-upload {
  background-color: #fff;
  border: 2px solid #858585;
  color: #333;
  font-size: 1.4rem;
  background-image: url(../assets/img/upload.png);
  background-repeat: no-repeat;
  background-position: 6px center;
  background-size: 24px;
  padding-left: 35px;
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
