<template>
  <div class="service-item">
    <h3 class="item-title"><i></i>服务项目<span>({{serviceitem.totalCount}})</span></h3>
    <div class="service-subitem" v-for="(index, item) in serviceitem">
      <div class="service-subitem-first">
        <span class="service-name"><i></i>{{item.name}}</span>
        <span>&yen;{{projectPrice[index]}}起</span>
      </div>
      <div class="service-subitem-second" v-for="product in item.productList">
        <span class="service-name">{{product.name}}</span>
        <span>&yen;{{product.price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    serviceitem: Array
  },
  computed: {
    projectPrice: function () {
      var projectPrices = []
      for (let i = 0; i < this.serviceitem.length; i++) {
        let projectItem = this.serviceitem[i]
        let projectPrice = 0
        for (let j = 0; j < projectItem.productList.length; j++) {
          if (j === 0) {
            projectPrice = projectItem.productList[j].price
          }else if (projectItem.productList[j].price < projectPrice) {
            projectPrice = projectItem.productList[j].price
          }
        }
        projectPrices.push(projectPrice)
      }
      console.log(projectPrices)
      return projectPrices
    }
  }
}
</script>
<style scoped>
.service-item {
  margin-top: 12px;
  background-color: #fff;
  font-size: 1.4rem;
  padding-top: 5px;
}
.service-item .item-title {
  font-size: 1.4rem;
  line-height: 26px;
}
.service-item .item-title i {
  float: left;
  width: 15px;
  height: 26px;
  background-color: #ff6251;
  margin-right: 15px;
}
.service-item .item-title span {
  margin-left: 10px;
}
.service-item .service-subitem-first,.service-item .service-subitem-second {
  line-height: 30px;
  border-bottom: 1px solid #eaeaea;
  padding: 0 15px 0 25px;
  text-align: right;
  font-size: 1.3rem;
}
.service-item .service-subitem-second {
  padding-left: 60px;
  color: #555555;
}
.service-subitem-first .service-name,.service-subitem-second .service-name {
  float: left;
}
.service-subitem-first .service-name>i,.service-subitem-second .service-name>i {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #333333;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
