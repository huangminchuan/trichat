<template lang="html">
  <div id="product">
    <div class="board" @click="clearBoard"></div>
    <img src="/bundles/app/crazy_img/product.png"/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    clearBoard: function () {
      this.$parent.productShow = false;
    }
  },
  components: {}
}
</script>

<style lang="scss">
  #product {
    img {
      position: fixed;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 11;
    }
  }
</style>
