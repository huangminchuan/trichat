<template lang="html">
    <div>
      <div class="board" @click="clearBoard" style="background-color: #349FEC;"></div>
      <div class="two-board" v-if="shareTip" @click="clearShare">
      </div>
      <div class="black-bar" v-if="shareTip"></div>
      <div class="blue-tip" v-if="shareTip">
        <p>点击右上角，分享给朋友</p>
        <p>喊你的小伙伴来参加活动</p>
        <p class="triangle-up"></p>
      </div>
      <div id="invite">
        <div class="header">赶快邀请好友来参与活动</div>
        <div class="header-detail">长按关注携车网微信服务号，享受更多汽车上门保养优惠</div>
        <img src="/bundles/app/crazy_img/code.png"/>
        <div class="footer-detail">发给小伙伴，喊他们来一起参加活动</div>
        <!-- <div class="share-button" @click="shareShow">分享给好友帮我加机油</div> -->
      </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      shareTip: false,
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    clearBoard: function () {
      this.$parent.invitShow = false;
    },
    clearShare: function () {
      this.shareTip = false;
    },
    shareShow: function () {
      this.shareTip = true;
    }
  },
  components: {}
}
</script>

<style lang="scss">
  #invite {
    position: fixed;
    z-index: 12;
    width: 80%;
    border-radius: 6px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 15px 30px 20px;
    background-color: #fff;
    text-align: center;
    .header {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #343434;
      font-size: 16px;
      margin-bottom: 2px;
      justify-content: center;
    }
    .header-detail {
      display: flex;
      align-items: center;
      height: 50px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #343434;
      margin-bottom: 10px;
    }
    img {
      width: 90%;
      margin-bottom: 10px;
    }
    .footer-detail {
      line-height: 20px;
      text-align: center;
      color: #44A7EF;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .share-button {
      background-color: #349FEC;
      height: 52px;
      line-height: 52px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      border-radius: 4px;
    }
  }
  .black-bar {
    height: 12px;
    z-index: 15;
    background-color: #010101;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
  .two-board {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 13;
  }
  .blue-tip {
    z-index: 15;
    position: fixed;
    width: 100%;
    padding-right: 15px;
    box-sizing: border-box;
    height: 76px;
    top: 12px;
    background-color: #44A7EF;
    text-align: right;
    p {
      &:first-child {
        margin-top: 14px;
        font-size: 16px;
        color: #fff;
      }
      &:nth-child(2) {
        margin-top: 10px;
        font-size: 14px;
        color: #fff;
      }
    }
    .triangle-up {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 12px solid #44A7EF;
        position: absolute;
        top: -12px;
        right: 17px;
    }
  }
</style>
