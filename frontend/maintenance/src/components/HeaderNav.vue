<style lang="scss" scoped>
  .xc-header-nav-box {
    width: 100%;
    height: 42px;
    line-height: 42px;
    display: flex;
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background: #dcdcdc;
      width: 100%;
      height: 1px;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
    }

    .xc-header-nav-item {
      position: relative;
      flex: 1;
      text-align: center;

      .xc-header-nav-title {
          display: inline-block;
          box-sizing: border-box;
          line-height: 38px;
      }
    } 
  }
  .xc-current-nav {
    left: 15px;
    top: 2px;
    color: #44A7EF;
    border-bottom: 1px solid #44A7EF;
  }
</style>

<template>
  <header class="xc-header-nav-box">
      <div class="xc-header-nav-item" @click="change(1)">
          <p class="xc-header-nav-title" :class="{'xc-current-nav':current == 1}">
              维修预约列表
          </p>
      </div>
      <div class="xc-header-nav-item" @click="change(2)">
          <p class="xc-header-nav-title" :class="{'xc-current-nav':current == 2}">
              <!--保险上传列表-->
          </p>
      </div>
  </header>
</template>

<script>
  export default {
      data: function() {
          return {
              current:1
          }
      },
      methods: {
          change(val) {
            this.$dispatch('changeNav', val)
            this.current = val
          }
      },
  }
</script>
