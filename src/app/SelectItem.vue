<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
<div class="select-item">
  <div class="select-notice">
    <img src="../assets/img/notice.png">尊敬的用户 您选择的项目需要大约3个小时
  </div>
  <div class="project-list">
    <div class="project-item" v-for="item in items.projects">
      <div class="project-item-title" v-if="item.proSub">
        {{item.proName}}
      </div>
      <div class="project-sublist" v-if="item.proSub">
        <div class="project-subitem" v-for="sub in item.proSub">
          <div class="p-item-hd">
              {{sub.subName}}
          </div>
          <div class="p-item-bd">
            &yen;{{sub.subPrice}} <input type="checkbox">
          </div>
        </div>
      </div>
      <template  v-if="item.proSub == null">
        <div class="project-subitem">
          <div class="p-item-hd">
              {{item.proName}}
          </div>
          <div class="p-item-bd">
            &yen;{{item.proPrice}} <input type="checkbox">
          </div>
        </div>
      </template>
    </div>
  </div>
  <button class="btn btn-reserve">已选好</button>
</div>
</template>
<script>
export default {
  data () {
    return {
      items: window.serviceItem
    }
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.select-notice {
  font-size: 1.4rem;
  background-color: #fff;
  height: 40px;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.select-notice>img {
  width: 16px;
  height: auto;
  margin-right: 8px;
}
.project-item {
  margin-top: 15px;
  background-color: #fff;
}
.project-item-title {
  height: 40px;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.6rem;
}
.project-sublist {
  padding: 0 15px;
}
.project-subitem {
  background-color: #fff;
  margin-top: 15px;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  height: 50px;
  align-items: center;
  font-size: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  padding: 0 10px;
}
.project-sublist>div:last-child {
  border-bottom: 0;
}
.project-subitem .p-item-bd {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  align-items: center;
}
.p-item-bd input[type=checkbox] {
  -webkit-appearance:none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-image: url(../assets/img/not-check.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-left: 8px;
}
.p-item-bd input[type=checkbox]:checked {
  background-image: url(../assets/img/checked.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
