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
      <div class="comment-control-star">评分：<span class="comment-star" v-bind:class="{'active' : $index <= (star -1)}" v-for="item in 5" @click="selectStar($index)"></span>
      </div>
      <div class="comment-control-upload">
          <button class="btn btn-upload">上传图片</button>
          <input type="file" v-model="upPic" @change="fileChange" name="file">
      </div>
    </div>
    <div class="comment-pic clearfix">
      <div class="pic-item" v-bind:style="{backgroundImage: 'url('+imageDomain+image.photoPath+')'}" v-for="image in photoList"></div>
    </div>
    <div class="comment-text">
      <textarea rows="3" placeholder="请输入评价内容" v-model="commentConent"></textarea>
    </div>
  </div>
  <div class="comment-btn">
    <div><button class="btn btn-default" @click.prevent="goBack">取消</button></div>
    <div><button class="btn btn-info" @click.prevent="saveComment()">提交评价</button></div>
  </div>
</div>
<loading :show="loading.show"></loading>
</template>
<script>
import toast from '../js/toast'
import Loading from '../components/Loading'
import utils from '../js/utils'
export default {
  data () {
    return {
      loading: {
        show: true
      },
      imageDomain: 'http://meimeidou.qiniudn.com/',
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
      ],
      photoList: [],
      orderId: '',
      rate: ''
    }
  },
  ready () {
    let self = this
    self.token = localStorage.getItem('token')
    self.loading.show = false
  },
  methods: {
    selectStar (index) {
      let self = this
      self.star = index + 1
    },
    fileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      // this.createImage(files[0])
      this._upload(files[0])
    },
    createImage (file) {
      let reader = new FileReader()
      let self = this
      reader.onload = (e) => {
        self.images.push({image: e.target.result})
      }
      reader.readAsDataURL(file)
    },
    _upload (file) {
      let self = this
      let data = new FormData()
      data.append('file', file)
      if (self.photoList.length < 6) {
        self.loading.show = true
        self.$http.post(window.ctx + '/api/common/uploadW', data).then((response) => {
          let res = response.data
          self.loading.show = false
          if (res.code === 0) {
            self.photoList.push({photoPath: res.result.key})
            toast('上传成功')
          } else {
            toast('上传失败')
          }
        }, (response) => {
          toast('上传失败')
        })
      } else {
        toast('最多评论6张')
      }
    },
    saveComment () {
      let self = this
      self.orderId = utils.getUrlParam('orderId')
      let comment = {
        orderId: self.orderId,
        star: self.star,
        content: self.commentConent,
        photoList: self.photoList
      }
      if (self.token) {
        self.loading.show = true
        self.$http.post(window.ctx + '/api/comment/t/save', comment, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          self.loading.show = false
          if (res.code === 0) {
            toast('评价成功')
            window.goPage('myOrder.html')
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }
        })
      }else {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    },
    goBack () {
      window.history.go(-1)
    }
  },
  components: {
    Loading
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
}
.comment-text textarea {
  display: block;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  resize: none;
  font-size: 1.4rem;
  width: 100%;
  line-height: 24px;
  padding: 2px 5px;
}
.comment-pic {
  margin-top: 10px;
}
.comment-pic .pic-item {
  float: left;
  width: 79px;
  height: 79px;
  margin-right: 9px;
  margin-bottom: 9px;
  background:no-repeat center center;
  background-size: cover;
}
</style>
