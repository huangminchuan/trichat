<template>
  <div id="success">
    <div class="board" @click="clearBoard"></div>
    <div class="success-area">
      <img src="/bundles/app/crazy_img/success_exchange.png"/>
      <div class="success-content">恭喜你，组队成功！奖品已经发放至您的卡券列表</div>
      <div class="button-area">
        <div class="done-button" @click="goOrder">立即查看</div>
        <div class="do-button" @click="continueGame">继续开团</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      mobil_config: window.xc_mobil_config
    }
  },
  methods: {
    continueGame () {
        var currentHost = 'http://' + window.location.host;
        var random = parseInt( Math.random() * 10 );
        window.location.href = currentHost + '/wx/mobil_promotion_2/id/0/source?v=' + random + '#!/index';
    },
    clearBoard () {
      this.$parent.successShow = false;
    },
    goOrder () {
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
