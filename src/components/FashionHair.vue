<template>
  <div class="hair-list">
    <div class="hair-item" v-for="(index, item) in hairitems" @click.prevent="detail(item)">
      <a>
        <img src="../assets/img/one-px.jpg">
        <div class="lazy-img" :style="{backgroundImage: 'url(' + imageDomain + item.coverImg + ')'}"></div>
      </a>
      <div class="hair-name">
        <span>{{item.albumName}}</span>
        <div v-if="item.praiseNum" class="hair-like">
          {{item.praiseNum}}
        </div>
        <div v-else class="hair-like">
          0
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageDomain: window.imageDomain
    }
  },
  props: {
    hairitems: Array
  },
  ready () {
  },
  methods: {
    detail (item) {
      let hairId
      sessionStorage.setItem('hairScrollTop', window.scrollY)
      sessionStorage.setItem('hairPageNum', this.$parent.searchPageParam.pageNo)
      if (item.hairstyleId) {
        hairId = item.hairstyleId
      } else {
        hairId = item.id
      }
      window.location.href = 'hairDetail.html?id=' + hairId
    }
  }
}
</script>
<style>
  .hair-list::after {
    content: '';
    display: block;
    clear: both;
  }
  .hair-item {
    position: relative;
    display: inline-block;
    width: 50%;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
    float: left;
  }
  .hair-item:nth-child(even) {
    border-left: 1px solid #fff;

  }
  .hair-item:nth-child(odd) {
    border-right: 1px solid #fff;
  }
  .hair-item>a {
    display: block;
    position: relative;
    overflow: hidden;
  }
  .hair-item>a .lazy-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .hair-name {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 24px;
    line-height: 24px;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    font-size: 1.3rem;
    padding-left: 4px;
  }
  .hair-like {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: transparent;
    height: 24px;
    line-height: 24px;
    background-image: url(../assets/img/good-white.png);
    background-repeat: no-repeat;
    background-size: 10px auto;
    background-position: 7px center;
    padding: 0 7px 0 20px;
    font-size: 1.2rem;
    border-radius: 2px
  }
</style>
