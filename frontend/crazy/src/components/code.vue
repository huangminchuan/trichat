<template>
  <div id="code">
    <div class="board" @click="clearBoard"></div>
    <div class="code-area">
      <div class="code-header">您需要关注公众号才能为好友加机油，长按进入公众号</div>
      <img class="code-icon" src="/bundles/app/crazy_img/code.png"/>
      <img class="cancel-hook" src="/bundles/app/crazy_img/close.png" @click="clearBoard"/>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {
    clearBoard: function () {
      this.$parent.codeShow = false;
    }
  }
}
</script>

<style lang="scss">
  #code {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 11;
    .code-area {
      box-sizing: border-box;
      border-radius: 6px;
      text-align: center;
      width: 74%;
      left: 13%;
      top: 19%;
      padding-top: 20px;
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 20px;
      background-color: #fff;
      position: relative;
      z-index: 12;
      .code-header {
        line-height: 20px;
        font-size: 16px;
        text-align: left;
        color: #343434;
        margin-bottom: 20px;
      }
      .code-icon {
        width: 100%;
        margin: 0 auto;
      }
      .cancel-hook {
        position: absolute;
        left: 50%;
        bottom: -50px;
        margin-left: -15px;
        width: 8%;
      }
    }
  }
</style>
