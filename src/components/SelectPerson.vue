<template>
  <div class="all-dressers-container">
    <div class="all-dressers">
      <person-one v-for="item in items" @click="selectPerson(item)" :item="item" :class="item.id === personId ? 'active' : ''"></person-one>
      <no-result v-show="items && items.length === 0" :text=""></no-result>
    </div>
    <button class="btn btn-reserve" @click="next()">已选好</button>
  </div>
</template>
<script>
import PersonOne from '../components/PersonOne'
import NoResult from '../components/NoResult'
import toast from '../js/toast'

export default {
  data () {
    return {
      personId: null,
      personName: null
    }
  },
  methods: {
    next: function () {
      if (this.personId) {
        this.$dispatch('next', {'fromStep': 'person', 'personId': this.personId, 'personName': this.personName})
      }else {
        toast('请选择发型师')
      }
    },
    selectPerson: function (personItem) {
      if (personItem.id === this.personId) {
        this.personId = null
        this.personName = null
      }else {
        this.personId = personItem.id
        this.personName = personItem.stageName
      }
    }
  },
  components: {
    PersonOne,
    NoResult
  },
  props: {
    items: Array
  }
}
</script>
<style scoped>
.all-dressers-container {
  height: 100%;
  position: relative;
}
.all-dressers {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
  position: absolute;
  top: 0;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
