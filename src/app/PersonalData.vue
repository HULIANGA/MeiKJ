<style lang="sass">
@import '../assets/css/style.scss'
</style>

<template>
<div class="personal-data">
  <div class="p-item">
    <div class="p-item-hd">
      <label>昵称</label>
    </div>
    <div class="p-item-bd">
      <input type="text" placeholder="昵称">
    </div>
  </div>
  <div class="p-item">
    <div class="p-item-hd">
      <label>手机号</label>
    </div>
    <div class="p-item-bd">
      <input type="tel" placeholder="手机号">
    </div>
  </div>
  <div class="p-item">
    <div class="p-item-hd">
      <label>性别</label>
    </div>
    <div class="p-item-bd">
      <input type="radio" name="sex">男
      <input type="radio" name="sex">女
    </div>
  </div>
  <div class="p-item">
    <div class="p-item-hd">
      <label>我的邮箱</label>
    </div>
    <div class="p-item-bd">
      <input type="text" placeholder="我的邮箱">
    </div>
  </div>
</div>
<button class="btn btn-reserve">编辑</button>
</template>
<style>
body {
  background-color: #eaeaea;
}
.personal-data {
  margin-top: 15px;
  background-color: #fff;
}
.personal-data .p-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
  align-items: center;
}
.p-item .p-item-hd {
  font-size: 1.6rem;
}
.p-item .p-item-bd {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  font-size: 1.4rem;
}
.p-item-hd>label {
  display: block;
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
}
.p-item-bd>input {
  height: 24px;
  line-height: 24px;
  width: 100%;
}
.p-item-bd>input[type=radio] {
  -webkit-appearance:none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #eaeaea;
  vertical-align: middle;
  margin-right: 5px;
  position: relative;
  top: -2px;
}
.p-item-bd>input[type=radio]:checked {
  background-color: #ff6251;
}
</style>
