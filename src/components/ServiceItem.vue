<template>
  <div class="service-item">
    <h3 class="item-title"><i></i>服务项目<span>({{serviceitem.totalCount}})</span></h3>
    <div class="service-subitem" v-for="item in serviceitem.projects">
      <span><i></i>{{ item.proName}}</span>&yen;{{ item.proPrice}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    serviceitem: Object
  }
}
</script>
<style>
.service-item {
  margin-top: 15px;
  background-color: #fff;
  font-size: 1.4rem;
  padding-top: 5px;
}
.service-item .service-subitem {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eaeaea;
  padding: 0 15px 0 25px;
  text-align: right;
}
.service-subitem>span {
  float: left;
}
.service-subitem>span>i {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid #333;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
