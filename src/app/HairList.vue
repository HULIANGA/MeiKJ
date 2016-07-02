<style lang="sass">
@import '../assets/css/style.scss'
</style>

<template>
  <div class="hair-filter">
    <a class="active">人气</a>
    <a>男发</a>
    <a>女发</a>
    <a>明星</a>
  </div>
  <div class="all-hair">
    <fashion-hair :hairitems="hairItems"></fashion-hair>
  </div>
</template>
<script>
import FashionHair from '../components/FashionHair'
export default {
  data () {
    return {
      hairItems: window.hairItems
    }
  },
  components: {
    FashionHair
  }
}
</script>
<style>
.hair-filter {
  height: 50px;
  line-height: 50px;
  padding: 0 10%;
  border-bottom: 1px solid #dbdbdb;
}
.hair-filter>a {
  position: relative;
  float: left;
  width: 25%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 1.4rem;
}
.hair-filter>a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  display: none;
  height: 3px;
  background-color: #ff7162;
}
.hair-filter>a.active::after {
  display: block;
}
.hair-filter>a.active {
  color:#ff7162;
}
.all-hair {
  padding: 5px;
}
.all-hair .hair-item {
  padding:5px;
}
.all-hair .hair-like {
  position: absolute;
  right: 5px;
  bottom: 5px;
  background-color: rgba(0,0,0,.4);
  color: #fff;
  background-image: url(../assets/img/good-white.png);
}
</style>
