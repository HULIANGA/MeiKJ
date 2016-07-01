<template>
  <div class="hair-list">
    <div class="hair-item" v-for="item in hairitems">
      <a>
        <img :src="item.hairUrl">
      </a>
      <div class="hair-like">
        {{ item.likeNum }}
      </div>
    </div>
  </div>
</template>
<style>
  .hair-list {
    position: relative;
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    -webkit-flex-wrap:wrap;
  }
  .hair-item {
    position: relative;
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
    background-size: 12px auto;
    background-position: 3px center;
    padding: 0 5px 0 20px;
    font-size: 1.2rem;
  }
</style>
<script>
export default {
  props: {
    hairitems: Array
  }
}
</script>
