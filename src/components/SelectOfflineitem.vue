<template>
<div class="select-item-container">
  <!-- <div v-if="maxHours" class="select-notice">
    <img src="../assets/img/notice.png">尊敬的用户 您选择的项目需要大约{{maxHours}}个小时
  </div> -->
  <div v-if="maxHours" class="notice-placeholder"></div>
  <!-- <div :class="['project-list', maxHours ? 'has-notice' : '']"> -->
  <div :class="['project-list']">
    <div class="project-item" v-for="(projectIndex, item) in items">
      <div class="project-item-title">
        {{item.name}}
      </div>
      <div class="project-sublist">
        <div :class="['project-subitem', 'project'+sub.projectId, 'product'+sub.productId]" @click="selectProduct('project'+sub.projectId, 'product'+sub.productId)" v-for="sub in item.productList">
          <div class="p-item-hd">
              {{sub.name}}
              <!-- <span v-if="sub.positionName">（{{sub.positionName}}）</span> -->
          </div>
          <div class="p-item-bd">
            <span>&yen;{{sub.price}}</span>
            <input type="checkbox" @click.stop="selectCheckbox('project'+sub.projectId, 'product'+sub.productId)" :data-hours="item.hours" :data-id="sub.productId" :data-name="sub.name" :data-price="sub.price" :data-position="sub.positionId" class="product-check">
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-reserve" @click="next()">已选好</button>
</div>
</template>
<script>
import toast from '../js/toast'
export default {
  data () {
    return {
      selectedItem: [], // 选中的产品取耗时最长的
      costHours: [], // 所有勾选的产品的等待时间数组
      productIds: '',
      positionId: []
    }
  },
  computed: {
    maxHours: function () {
      if (this.costHours.length === 0) {
        return null
      }else {
        return Math.max.apply(null, this.costHours)
      }
    }
  },
  ready: function () {
  },
  methods: {
    next: function () {
      if (document.querySelectorAll('.product-check:checked').length > 0) {
        if (this.positionId.length > 1) {
          toast('一次只能预约一个职位的服务')
          return false
        }
        this.$dispatch('next', {'fromStep': 'service', 'maxHours': this.maxHours, 'productItems': this.selectedItem, 'productIds': this.productIds, 'positionId': this.positionId[0]})
      }else {
        toast('请至少选择一个产品')
      }
    },
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
            let tempPositionId = document.getElementsByClassName('product-check')[index].getAttribute('data-position')
            if (this.positionId.indexOf(tempPositionId) < 0) {
              this.positionId.push(tempPositionId)
            }
            checkedProjects.push(document.getElementsByClassName('product-check')[index].getAttribute('data-id'))
          }
        }
      }
      this.productIds = checkedProjects.join(',')
      console.log(this.positionId)
    }
  },
  props: {
    items: Array
  }
}
</script>
<style scoped>
.select-item-container {
  height: 100%;
  position: relative;
}
.select-notice {
  font-size: 1.2rem;
  background-color: #fff;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0;
  border-bottom: 1px solid #eaeaea;
}
.notice-placeholder{
  height: 49px;
}
.select-notice>img {
  width: 12px;
  height: auto;
  margin-right: 8px;
}
.project-item {
  margin-bottom: 15px;
  background-color: #fff;
}
.project-item-title {
  line-height: 34px;
  display: flex;
  padding: 0 15px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.4rem;
  font-weight: bold;
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
  background-color: #ffffff;
}
.p-item-bd input[type=checkbox]:checked {
  background-image: url(../assets/img/checked.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.project-list{
  height: 100%;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
  position: absolute;
  top: 0;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.project-list.has-notice {
  padding-top: 49px;
}
</style>
