<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
<div class="select-item">
  <div class="select-notice">
    <img src="../assets/img/notice.png">尊敬的用户 您选择的项目需要大约3个小时
  </div>
  <div class="project-list">
    <div class="project-item" v-for="item in items">
      <div class="project-item-title">
        {{item.name}}
      </div>
      <div class="project-sublist">
        <div :class="['project-subitem', 'project'+sub.projectId, 'product'+sub.productId]" @click="selectProduct('project'+sub.projectId, 'product'+sub.productId)" v-for="sub in item.productList">
          <div class="p-item-hd">
              {{sub.name}}
          </div>
          <div class="p-item-bd">
            <span>&yen;{{sub.price}}</span>
            <input type="checkbox" @click.stop="selectCheckbox('project'+sub.projectId, 'product'+sub.productId)" class="product-check">
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-reserve">已选好</button>
</div>
</template>
<script>
export default {
  data () {
    return {
      selectedItem: []
    }
  },
  ready: function () {
  },
  methods: {
    selectProduct: function (projectClass, productClass) {
      if (document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked) {
        document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked = false
      }else {
        for (var index in document.getElementsByClassName(projectClass)) {
          if (document.getElementsByClassName(projectClass).hasOwnProperty(index)) {
            document.getElementsByClassName(projectClass)[index].getElementsByClassName('product-check')[0].checked = false
          }
        }
        document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked = true
      }
    },
    selectCheckbox: function (projectClass, productClass) {
      if (document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked) {
        for (var index in document.getElementsByClassName(projectClass)) {
          if (document.getElementsByClassName(projectClass).hasOwnProperty(index)) {
            document.getElementsByClassName(projectClass)[index].getElementsByClassName('product-check')[0].checked = false
          }
        }
        document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked = true
      }
    }
  },
  props: {
    items: Array
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.select-notice {
  font-size: 1.2rem;
  background-color: #fff;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.select-notice>img {
  width: 12px;
  height: auto;
  margin-right: 8px;
}
.project-item {
  margin-top: 15px;
  background-color: #fff;
}
.project-item-title {
  line-height: 30px;
  display: flex;
  padding: 0 15px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.4rem;
}
.project-sublist {
  padding: 0 15px;
}
.project-subitem {
  background-color: #fff;
  line-height: 45px;
  font-size: 1.3rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
}
.project-sublist>div:last-child {
  border-bottom: 0;
}
.project-subitem .p-item-bd {
}
.p-item-bd input[type=checkbox] {
  appearance:none;
  width: 17px;
  height: 17px;
  background-image: url(../assets/img/not-check.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-left: 5px;
  margin-top: 14px;
  float: right;
}
.p-item-bd input[type=checkbox]:checked {
  background-image: url(../assets/img/checked.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.project-list{
  padding-bottom: 50px;
}
</style>
