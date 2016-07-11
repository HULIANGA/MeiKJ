<template>
  <div class="store-list">
    <store-one @click="selectStore(item)" :class="selectId === item.id ? 'active' : ''" v-for="item in items" :item="item"></store-one>
    <button class="btn btn-reserve" @click="next()">已选好</button>
  </div>
</template>
<script>
import StoreOne from '../components/StoreOne'
import toast from '../libs/toast'

export default {
  data () {
    return {
      selectId: null,
      selectName: null
    }
  },
  ready: function () {
  },
  methods: {
    next: function () {
      if (this.selectId) {
        this.$dispatch('next', {'fromStep': 'store', 'shopId': this.selectId, 'shopName': this.selectName})
      }else {
        toast('请选择门店')
      }
    },
    selectStore: function (selectItem) {
      if (this.selectId === selectItem.id) {
        this.selectId = null
        this.selectName = null
      }else {
        this.selectId = selectItem.id
        this.selectName = selectItem.name
      }
    }
  },
  components: {
    StoreOne
  },
  props: {
    items: Array
  }
}
</script>
<style scoped>
.store-list{
  padding-bottom: 50px
}
</style>
