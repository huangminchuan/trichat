<template>
  <div id="success">
    <div class="board"></div>
    <div class="success-area" v-if="exchangeSuccess">
      <img src="../assets/success_exchange.png"/>
      <div class="success-content">该礼品已经兑换完毕，关注「携车网」微信服务号体验上门汽车保养199元起~</div>
      <div class="button-area">
        <div class="done-button" @click="goOrder">立即下单</div>
        <div class="do-button" @click="continueGame">继续游戏</div>
      </div>
    </div>
    <div class="success-area" v-if="passSuccess">
      <img src="../assets/success_exchange.png"/>
      <div class="success-content">恭喜您，已加满{{ fullOil }}毫升</div>
      <div class="button-area">
        <div class="done-button" @click="exchangePrize">兑换奖品</div>
        <div class="do-button" @click="clearBoard">继续游戏</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      xcMobile : window.xc_mobil_config
    }
  },
  props: ['passSuccess','exchangeSuccess','fullOil'],
  methods: {
    continueGame () {
      var random = parseInt( Math.random() * 10 );
      window.location.href = 'http://www.xieche.com.cn/wx/mobil_promotion/id/0?v=' + random + '#!/index';
    },
    clearBoard () {
      this.$parent.passInit = 1;
      this.$parent.confirmEx = false;
      // 调用只显示一次的接口
      this.$http.post('/v2/mobil_promotion/remove_exchange_show',{ 'user_promotion_id': this.xcMobile.id,'step_level': this.xcMobile.step_level }).then(
        function (response) {
      },function (response) {
      });
    },
    goOrder () {
      zhuge.track('美孚机油活动-点击立即下单按钮事件');
      window.location.href = 'http://www.xieche.com/wx/index#newCoupons/from/h5';
    },
    exchangePrize () {
      // 调用只显示一次的接口
      this.$http.post('/v2/mobil_promotion/remove_exchange_show',{ 'user_promotion_id': this.xcMobile.id,'step_level': this.xcMobile.step_level }).then(
        function (response) {
      },function (response) {
      });
      this.$parent.confirmEx = false;
      this.$parent.exShow = true;
    }
  }
}
</script>

<style lang="scss">
  #success {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 11;
    .success-area {
      text-align: center;
      z-index: 11;
      width: 85%;
      padding-top: 45px;
      background-color: #349FEC;
      border-radius: 6px;
      padding-left: 22px;
      padding-right: 27px;
      padding-bottom: 20px;
      box-sizing: border-box;
      position: relative;
      img {
        width: 56%;
        position: absolute;
        top: -30px;
        left: 22%;
      }
      .success-content {
        font-size: 16px;
        line-height: 25px;
        text-align: left;
        color: #fff;
        font-size: 16px;
        margin-bottom: 15px;
      }
      .button-area {
        display: flex;
        justify-content: space-between;
        height: 52px;
        line-height: 52px;
        text-align: center;
        color: #44A7EF;
        .do-button {
          width: 48%;
          background-color: #FFFFFF;
          font-size: 16px;
          border-radius: 6px;
        }
        .done-button {
          width: 48%;
          background-color: #FFE55B;
          font-size: 16px;
          border-radius: 6px;
        }
      }
    }
  }
</style>
