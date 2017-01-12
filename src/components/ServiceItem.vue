<template>
  <div class="service-item">
    <h3 class="item-title"><i></i>服务项目<span>({{totalCount}})</span></h3>
    <div class="service-subitem" v-for="(index, item) in serviceitem">
      <div class="service-subitem-first" @click="showSecond(index)">
        <span class="service-name"><i></i>{{item.name}}</span>
        <span>&yen;{{projectPrice[index]}}起</span>
      </div>
      <div :class="['service-subitem-second', 'project'+product.projectId, 'product'+product.productId]" @click="selectProduct('project'+product.projectId, 'product'+product.productId)" v-for="product in item.productList">
        <span class="service-name">{{product.name}}</span>
        <span>&yen;{{product.price}}</span>
        <input type="checkbox" @click.stop="selectCheckbox('project'+product.projectId, 'product'+product.productId)" :data-hours="item.hours" :data-id="product.productId" :data-name="product.name" :data-price="product.price" :data-position="product.positionId" class="product-check">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedItem: [], // 选中的产品取耗时最长的
      costHours: [], // 所有勾选的产品的等待时间数组
      productIds: '',
      positionId: []
    }
  },
  props: {
    serviceitem: Array
  },
  computed: {
    maxHours: function () {
      if (this.costHours.length === 0) {
        return null
      }else {
        return Math.max.apply(null, this.costHours)
      }
    },
    totalCount: function () {
      return this.serviceitem.length
    },
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
  },
  methods: {
    selectProduct: function (projectClass, productClass) {
      if (document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked) {
        document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked = false
      }else {
        for (let i = 0; i < document.getElementsByClassName(projectClass).length; i++) {
          document.getElementsByClassName(projectClass)[i].getElementsByClassName('product-check')[0].checked = false
        }
        document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked = true
      }
      this.getSelectItemHours()
    },
    selectCheckbox: function (projectClass, productClass) {
      if (document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked) {
        for (let i = 0; i < document.getElementsByClassName(projectClass).length; i++) {
          if (document.getElementsByClassName(projectClass).hasOwnProperty(i)) {
            document.getElementsByClassName(projectClass)[i].getElementsByClassName('product-check')[0].checked = false
          }
        }
        document.getElementsByClassName(productClass)[0].getElementsByClassName('product-check')[0].checked = true
      }else {

      }
      this.getSelectItemHours()
    },
    // 获取选中产品需要的时间
    getSelectItemHours: function () {
      this.costHours = []
      this.selectedItem = []
      this.productIds = ''
      this.positionId = []
      let checkedProjects = []
      for (let index = 0; index < document.getElementsByClassName('product-check').length; index++) {
        if (document.getElementsByClassName('product-check').hasOwnProperty(index)) {
          if (document.getElementsByClassName('product-check')[index].checked === true) {
            this.costHours.push(document.getElementsByClassName('product-check')[index].getAttribute('data-hours'))
            this.selectedItem.push({
              'productId': document.getElementsByClassName('product-check')[index].getAttribute('data-id'),
              'productName': document.getElementsByClassName('product-check')[index].getAttribute('data-name'),
              'price': document.getElementsByClassName('product-check')[index].getAttribute('data-price')
            })
            this.positionId.push(document.getElementsByClassName('product-check')[index].getAttribute('data-position'))
            checkedProjects.push(document.getElementsByClassName('product-check')[index].getAttribute('data-id'))
          }
        }
      }
      this.productIds = checkedProjects.join(',')
      // 将选中的产品信息保存在本地
      localStorage.appointmentMaxHours = this.maxHours
      localStorage.appointmentProductItems = JSON.stringify(this.selectedItem)
      localStorage.appointmentProductIds = this.productIds
      localStorage.appointmentPositionId = this.positionId[0] ? this.positionId[0] : ''
    },
    showSecond: function (index) {
      var tempServiceitem = document.querySelectorAll('.service-subitem')[index]
      if (tempServiceitem.getAttribute('class').indexOf('active') !== -1) {
        tempServiceitem.setAttribute('class', 'service-subitem')
      }else {
        tempServiceitem.setAttribute('class', 'service-subitem active')
      }
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
  height: 0;
  border-width: 0;
  overflow: hidden;
  transition: all 0.2s;
}
.service-subitem.active .service-subitem-second {
  border-width: 1px;
  height: 30px;
}
.service-subitem-first .service-name,.service-subitem-second .service-name {
  float: left;
  text-align: left;
}
.service-subitem-first .service-name>i,.service-subitem-second .service-name>i {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  background-image: url(../assets/img/arrow-right.png);
  background-size: 6px;
  background-position: center center;
  background-repeat: no-repeat;
  transition: transform 0.2s;
}
.service-subitem.active .service-subitem-first .service-name>i {
  transform: rotate(90deg);
}
.product-check[type=checkbox] {
  appearance:none;
  width: 16px;
  height: 16px;
  background-image: url(../assets/img/not-check.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-left: 5px;
  margin-top: 7px;
  float: right;
  background-color: #ffffff;
}
.product-check[type=checkbox]:checked {
  background-image: url(../assets/img/checked.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
