<template>
  <div class="hair-list">
    <div class="hair-item" v-for="(index, item) in hairitems" @click.prevent="detail(item)">
      <a>
        <img src="../assets/img/one-px.jpg" class="lazy-img" :real-src="imageDomain + item.coverImg" @load="showImage(index)">
      </a>
      <div v-if="item.praiseNum" class="hair-like">
        {{item.praiseNum}}
      </div>
      <div v-else class="hair-like">
        0
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
    const lazyImgs = document.querySelectorAll('.lazy-img')
    for (let i = 0; i < lazyImgs.length; i++) {
      lazyImgs[i].setAttribute('src', lazyImgs[i].getAttribute('real-src'))
    }
  },
  methods: {
    detail (item) {
      let hairId
      if (item.hairstyleId) {
        hairId = item.hairstyleId
      } else {
        hairId = item.id
      }
      window.location.href = 'hairDetail.html?id=' + hairId
    },
    showImage (index) {
      let lazyImg = document.querySelectorAll('.lazy-img')[index]
      lazyImg.setAttribute('src', lazyImg.getAttribute('real-src'))
    }
  }
}
</script>
<style>
  .hair-list {
  }
  .hair-item {
    position: relative;
    display: inline-block;
    width: 50%;
    border-top: 1px solid #fff;
    box-sizing: border-box;
  }
  .hair-item:nth-child(even) {
    border-left: 1px solid #fff;

  }
  .hair-item:nth-child(odd) {
    border-right: 1px solid #fff;
  }
  .hair-item>a {
    display: block;
  }
  .hair-like {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #fff;
    height: 20px;
    line-height: 20px;
    background-image: url(../assets/img/good.png);
    background-repeat: no-repeat;
    background-size: 10px auto;
    background-position: 7px center;
    padding: 0 7px 0 20px;
    font-size: 1.2rem;
    border-radius: 2px
  }
</style>
