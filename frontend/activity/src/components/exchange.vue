<template>
  <div id="exchange-area" v-show="exShow">
    <div class="present-area" transition="right" v-show="init1" data-level="1">
      <div class="gift-area">
        <img class="gift-pass-title" src="/bundles/app/activity_mobil/gif_title.png"/>
        <span class="gift-pass">加满500ml</span>
      </div>
      <img class="present-area-body enable1" src="/bundles/app/activity_mobil/enable_1.png" v-show="exchangeStatus['1'].can_exchange && !exchangeStatus['1'].is_exchanged && xcMobile.type == 'self' "/>
      <img class="present-area-body unable1" src="/bundles/app/activity_mobil/unable_1.png" v-else/>
      <div class="exchange-number1 exchange-number">已兑换8000/9000份</div>
      <div class="exchange-button" @click="exchangeGift($event)" v-show="exchangeStatus['1'].can_exchange && !exchangeStatus['1'].is_exchanged && xcMobile.type == 'self' ">立即兑换</div>
      <div class="unchange-button item1" v-else>立即兑换</div>
     <div class="board" @click="clearBoard"></div>
    </div>
    <div class="present-area" transition="right" v-show="init2" data-level="2">
      <div class="gift-area">
        <img class="gift-pass-title" src="/bundles/app/activity_mobil/gif_title.png"/>
        <span class="gift-pass">加满1000ml</span>
      </div>
      <img class="present-area-body enable2" src="/bundles/app/activity_mobil/enable_2.png"  v-show="exchangeStatus['2'].can_exchange && !exchangeStatus['2'].is_exchanged && xcMobile.type == 'self' "/>
      <img class="present-area-body unable2" src="/bundles/app/activity_mobil/unable_2.png"  v-else/>
      <div class="exchange-number2 exchange-number">已兑换8000/9000份</div>
      <div class="exchange-button" @click="exchangeGift($event)" v-show="exchangeStatus['2'].can_exchange && !exchangeStatus['2'].is_exchanged && xcMobile.type == 'self' ">立即兑换</div>
      <div class="unchange-button item2" v-else>立即兑换</div>
     <div class="board" @click="clearBoard"></div>
    </div>
    <div class="present-area" transition="right" v-show="init3" data-level="3">
      <div class="gift-area">
        <img class="gift-pass-title" src="/bundles/app/activity_mobil/gif_title.png"/>
        <span class="gift-pass">加满1500ml</span>
      </div>
      <img class="present-area-body enable3" src="/bundles/app/activity_mobil/enable_3.png" v-show="exchangeStatus['3'].can_exchange && !exchangeStatus['3'].is_exchanged && xcMobile.type == 'self' "/>
      <img class="present-area-body unable3" src="/bundles/app/activity_mobil/unable_3.png"  v-else/>
      <div class="exchange-number3 exchange-number">已兑换8000/9000份</div>
      <div class="exchange-button" @click="exchangeGift($event)" v-show="exchangeStatus['3'].can_exchange && !exchangeStatus['3'].is_exchanged && xcMobile.type == 'self' ">立即兑换</div>
      <div class="unchange-button item3" v-else>立即兑换</div>
     <div class="board" @click="clearBoard"></div>
    </div>
    <div class="present-area" transition="right" v-show="init4" data-level="4">
      <div class="gift-area">
        <img class="gift-pass-title" src="/bundles/app/activity_mobil/gif_title.png"/>
        <span class="gift-pass">加满2000ml</span>
      </div>
      <img class="present-area-body enable4" src="/bundles/app/activity_mobil/enable_4.png" v-show="exchangeStatus['4'].can_exchange && !exchangeStatus['4'].is_exchanged && xcMobile.type == 'self' "/>
      <img class="present-area-body unable4" src="/bundles/app/activity_mobil/unable_4.png"  v-else/>
      <div class="exchange-number4 exchange-number">已兑换8000/9000份</div>
      <div class="exchange-button" @click="exchangeGift($event)" v-show="exchangeStatus['4'].can_exchange && !exchangeStatus['4'].is_exchanged && xcMobile.type == 'self' ">立即兑换</div>
      <div class="unchange-button item4" v-else>立即兑换</div>
     <div class="board" @click="clearBoard"></div>
    </div>
    <div class="present-area" transition="right" v-show="init5" data-level="5">
      <div class="gift-area">
        <img class="gift-pass-title" src="/bundles/app/activity_mobil/gif_title.png"/>
        <span class="gift-pass">加满3000ml</span>
      </div>
      <img class="present-area-body enable5" src="/bundles/app/activity_mobil/enable_5.png" v-show="exchangeStatus['5'].can_exchange && !exchangeStatus['5'].is_exchanged && xcMobile.type == 'self' "/>
      <img class="present-area-body unable5" src="/bundles/app/activity_mobil/unable_5.png"  v-else/>
      <div class="exchange-number5 exchange-number">已兑换8000/9000份</div>
      <div class="exchange-button" @click="exchangeGift($event)" v-show="exchangeStatus['5'].can_exchange && !exchangeStatus['5'].is_exchanged && xcMobile.type == 'self' ">立即兑换</div>
      <div class="unchange-button item5" v-else>立即兑换</div>
     <div class="board" @click="clearBoard"></div>
    </div>
    <div class="present-area" transition="right" v-show="init6" data-level="6">
      <div class="gift-area">
        <img class="gift-pass-title" src="/bundles/app/activity_mobil/gif_title.png"/>
        <span class="gift-pass">加满4000ml</span>
      </div>
      <img class="present-area-body enable6" src="/bundles/app/activity_mobil/enable_6.png" v-show="exchangeStatus['6'].can_exchange && !exchangeStatus['6'].is_exchanged && xcMobile.type == 'self' "/>
      <img class="present-area-body unable6" src="/bundles/app/activity_mobil/unable_6.png"  v-else/>
      <div class="exchange-number6 exchange-number">已兑换8000/9000份</div>
      <div class="exchange-button" @click="exchangeGift($event)" v-show="exchangeStatus['6'].can_exchange && !exchangeStatus['6'].is_exchanged && xcMobile.type == 'self' ">立即兑换</div>
      <div class="unchange-button item6" v-else>立即兑换</div>
     <div class="board" @click="clearBoard"></div>
    </div>
    <div class="right-area" @click="toRight" v-if="showRight"></div>
    <div class="left-area" @click="toLeft" v-if="showLeft"></div>
    <img class="right-arrow" src="../assets/right_arrow.png" @click="toRight" v-if="showRight"/>
    <img class="left-arrow" src="../assets/right_arrow.png" @click="toLeft" style="transform:rotate(180deg);" v-if="showLeft">
    <div class="board" @click="clearBoard"></div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: function () {
    return {
      init1: true,
      init2: false,
      init3: false,
      init4: false,
      init5: false,
      init6: false,
      showRight: true,
      showLeft: false,
      selfParent: this.$parent,
      exchangeStatus: window.xc_mobil_config.exchange_status,
      xcMobile : window.xc_mobil_config,
      init: 1
    }
  },
  props: ["exShow"],
  methods: {
    clearBoard () {
      this.exShow = !this.exShow;
    },
    toRight () {
      var currentItem = 'init' + this.init;
      this[currentItem] = false;
      if (this.init == 1) {
        this.showLeft = true;
      }
      if (this.init == 5) {
        this.showRight = false;
      }
      setTimeout(() => {
        ++ this.init;
        var nextItem = 'init' + this.init;
        this[nextItem] = true;
      },500);
    },
    toLeft () {
      var currentItem = 'init' + this.init;
      this[currentItem] = false;
      if (this.init == 2) {
        this.showLeft = false;
      }
      if (this.init == 6) {
        this.showRight = true;
      }
      setTimeout(() => {
        -- this.init;
        var nextItem = 'init' + this.init;
        this[nextItem] = true;
      },500);
    },
    exchangeGift (event) {
      if ( !this.xcMobile.is_subscribe ) {
        this.$parent.exShow = false;
        this.$parent.codeShow = true;
      } else {
        if ( this.xcMobile.is_login ) {
          zhuge.track('美孚机油活动-兑换按钮点击事件');
          this.$http.post('/v2/mobil_promotion/get_prize',{user_promotion_id: this.xcMobile.id,step_level: event.target.parentNode.getAttribute("data-level")}).then(
            function (response) {

              let responseData = response.data;
              if (typeof responseData === 'string') {
                responseData = JSON.parse(responseData);
              }

            if ( responseData.status.code == 200 ) {
              this.$parent.exShow = false;
              this.$parent.confirmEx = true;
              this.$parent.passSuccess = false;
              this.$parent.exchangeSuccess = true;
            } else {
              alert(responseData.status.msg);
            }
          }, function (response) {
            console.log(response);
          });
        } else {
          this.$router.go({ name:'Login' });
        }
      }
    }
  },
  ready: function () {
    for( var key in this.exchangeStatus ) {
      var numberNumber = '.exchange-number' + key;
      if ( numberNumber != '.exchange-number6') {
        $(numberNumber).text( '已兑换' + ( this.exchangeStatus[key].get_num * 5 ) + '/' + this.exchangeStatus[key].limit_num + '份');
      } else {
        $(numberNumber).text( '已兑换' + this.exchangeStatus[key].get_num + '/' + this.exchangeStatus[key].limit_num + '份');
      }
      if ( this.xcMobile.type == 'self' ) {
        if ( this.exchangeStatus[key].is_exchanged == true ) {
          var keyName = '.item' + key;
          var enimgName = '.enable' + key;
          var unimgName = '.unable' + key;
          $(keyName).on('click',function () {
            window.location.href = 'http://www.xieche.com/wx/index#newCoupons/from/h5';
          });
          $(keyName).text('立即下单');
          $(keyName).css('background-color','#44a7ef');
          $(unimgName).hide();
          $(enimgName).show();
        }
      }
    }
  }
}
</script>

<style lang="scss" scope>
  #exchange-area {
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 997;
    text-align: center;
    .outer-present-area {
      position: relative;
      width: 200%;
      overflow: hidden;
    }
    .present-area {
      position: relative;
      width: 100%;
      .gift-area {
        position: relative;
        z-index: 11;
        width: 47%;
        margin: 0 auto 47px;
        .gift-pass-title {
          width: 100%;
        }
        .gift-pass {
          position: absolute;
          left: 0;
          top: 0;
          width: 120px;
          font-size: 20px;
          color: #fff;
          left: 50%;
          text-align: center;
          margin-left: -60px;
          z-index: 11;
          top: 50%;
          margin-top: -14px;
        }
      }
      .present-area-body {
        width: 64%;
        margin-bottom: 15px;
        position: relative;
        z-index: 11;
      }
      .exchange-number {
        width: 50%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        z-index: 11;
        margin: 0 auto;
        position: relative;
        margin-bottom: 20px;
      }
      .exchange-button {
        width: 30%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background-color: #44A7EF;
        border-radius: 4px;
        z-index: 11;
        margin: 0 auto;
        position: relative;
      }
      .unchange-button {
        width: 30%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background-color: rgba(255,255,255,.4);
        border-radius: 4px;
        z-index: 11;
        margin: 0 auto;
        position: relative;
      }
    }
    .right-area {
      position: fixed;
      width: 18%;
      height: 44%;
      top: 28%;
      right: 0;
      z-index: 12;
    }
    .right-arrow {
      position: fixed;
      width: 4%;
      top: 48%;
      right: 5%;
      z-index: 11;
    }
    .left-arrow {
      position: fixed;
      width: 4%;
      top: 48%;
      left: 5%;
      z-index: 11;
    }
    .left-area {
      position: fixed;
      width: 18%;
      height: 44%;
      top: 28%;
      left: 0;
      z-index: 12;
    }
    .right-transition {
      transition: all .5s ease;
      position: relative;
      width: 100%;
      right: 0;
      z-index: 11;
    }
    .right-enter,.right-leave  {
      opacity: 0;
      right: 375px;
      z-index: 11;
    }
  }
</style>
