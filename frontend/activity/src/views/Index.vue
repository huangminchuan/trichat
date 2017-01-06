<template>
  <div id="main">
    <div class="header clearfix">
      <div class="left-header"></div>
      <div class="right-header" @click="introduction">活动规则</div>
    </div>
    <div class="level">{{ xcMobile.nickname }}的机油桶</div>
    <div class="charge-outer">
      <div style="width: 76%;margin-left: 12%;min-height: 272px;">
        <img :src="oilImgSrc" width="100%"/>
      </div>
      <div class="exchange-area" @click="exchangeEnter">
        <img class="exchange-button" src="../assets/exchange.png">
        <span>兑换奖品</span>
      </div>
      <div class="show-oil">
        <p id="current-oil">{{ xcMobilOil > 0 ? xcMobilOil + '00ml' : '0ml'   }}</p>
        <p>当前机油数</p>
      </div>
    </div>
    <get-button v-bind:one-button="oneButton" v-bind:two-button="twoButton"  v-bind:three-button="threeButton"></get-button>
    <div class="scroll-block">
      <img src="/bundles/app/activity_mobil/trumpet.png" width="20" height="20" style="position:relative;top:8px;margin-right:7px;"/>
      <div class="inner-scroll-block" transition="scroll" v-for="message in scrollMessage" v-if="$index == 0 ? true : false">
        <img :src="message.avatar" width="20" height="20" style="position:absolute;top: 50%;margin-top:-10px;border-radius:10px;"/>
        <span>{{ message.name }}领取了{{ message.coupon_name }}</span>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="left-bottom-bar" @click="reloadPage">我的机油桶</div>
      <div class="right-bottom-bar" v-link="{name:'Rank'}">活动排行榜</div>
    </div>
    <div class="toggle-tip" @click="clearTip" v-if="tipShow"></div>
    <exchange-area :ex-show.sync="exShow"></exchange-area>
    <question v-if="quShow" :is-first.sync="isFirst"></question>
    <two-code v-if="codeShow"></two-code>
    <game-rule :in-show.sync="inShow"></game-rule>
    <exchange-success v-if="confirmEx" :pass-success="passSuccess" :exchange-success="exchangeSuccess" :full-oil="fullOil"></exchange-success>
    <invite v-if="invShow"></invite>
  </div>
</template>

<script>
import exchangeArea from '../components/exchange.vue';
import question from '../components/question.vue';
import twoCode from '../components/twoCode.vue';
import invite from '../components/invite.vue';
import gameRule from '../components/gameRule.vue';
import getButton from '../components/getButton.vue';
import exchangeSuccess from '../components/exchangeSuccess.vue';
export default {
  components: {
    exchangeArea,
    question,
    twoCode,
    gameRule,
    getButton,
    invite,
    exchangeSuccess
  },
  data: function () {
    return {
      exShow: false,
      inShow: false,
      quShow: false,
      confirmEx: false,
      exchangeSuccess: false,
      passSuccess: false,
      invShow: false,
      codeShow: false,
      scrollMessage: null,
      addUserList: null,
      oneButton: false,
      twoButton: false,
      threeButton: false,
      tipShow: false,
      originArray: null,
      xcMobile: window.xc_mobil_config,
      xcMobilOil: window.xc_mobil_config ? (window.xc_mobil_config.oil_num ? window.xc_mobil_config.oil_num : 0) : 0,
      isFirst: 0
    }
  },
  methods: {
    exchangeEnter () {
      this.exShow = !this.exShow;
    },
    introduction () {
      this.inShow = !this.inShow;
    },
    showQuestion () {
      this.quShow = true;
    },
    clearTip () {
      this.tipShow = false;
      localStorage.setItem('pageTip','1');
    },
    reloadPage () {
        var random = parseInt( Math.random() * 10 );
        window.location.href = 'http://www.xieche.com.cn/wx/mobil_promotion/id/0?v=' + random + '#!/index';
    }
  },
  events: {
    showQuestion () {
      this.quShow = true;
    }
  },
  ready: function () {
    $('html').removeClass('bg-none');
    if ( document.getElementsByTagName("body")[0].offsetHeight > 603 ) {
      let trueHeight = ( ( document.getElementsByTagName("body")[0].offsetHeight - 603 ) / 4 ) + 'px';
      document.getElementsByClassName("scroll-block")[0].style.marginTop = trueHeight;
    }
    if ( this.xcMobile.type == 'self' ) {
      this.$http.get('/v2/mobil_promotion/add_user_list', {params:  {user_promotion_id	: this.xcMobile.id}}).then(
        function(response){

          let responseData = response.data;
          if (typeof responseData === 'string') {
            responseData = JSON.parse(responseData);
          }

          if (responseData.status.code == 200) {
            this.addUserList=responseData.data;
            if ( this.addUserList.length == 0 ) {
              this.oneButton = true;
              this.twoButton = false;
              this.threeButton = false;
            } else {
              this.oneButton = false;
              this.twoButton = true;
              this.threeButton = false;
            }
          } else {
            this.oneButton = true;
            this.twoButton = false;
            this.threeButton = false;
          }
        },
        function(response){
        }
      );
    } else {
      this.oneButton = false;
      this.twoButton = false;
      this.threeButton = true;
    }
    this.$http.get('/v2/mobil_promotion/notice').then(
      function (response) {


        let responseData = response.data;
        if (typeof responseData === 'string') {
          responseData = JSON.parse(responseData);
        }

      this.scrollMessage = responseData.data;
      this.originArray = responseData.data;
    },function (response) {
    });
    if ( this.xcMobile.type == 'self' ) {
      if ( localStorage.getItem('preUrl') ) {
        if ( this.xcMobile.is_full && localStorage.getItem('preUrl') != 'login' ) {
          this.confirmEx = true;
          this.passSuccess = true;
        } else {
          this.confirmEx = true;
          this.exchangeSuccess = true;
          localStorage.removeItem('preUrl');
        }
      } else {
        if ( this.xcMobile.is_full ) {
          this.confirmEx = true;
          this.passSuccess = true;
        }
      }
    }
    if ( localStorage.getItem('pageTip') ) {
      this.tipShow = false;
    } else {
      this.tipShow = true;
    }
    setInterval(() => {
      if ( this.scrollMessage && this.scrollMessage.length != 1 ) {
        this.scrollMessage.shift();
      } else {
        this.$http.get('/v2/mobil_promotion/notice').then((response) => {

          let responseData = response.data;
          if (typeof responseData === 'string') {
            responseData = JSON.parse(responseData);
          }

          this.scrollMessage = responseData.data;
        }, (response) => {
        });
      }
    },3000);
    zhuge.track('美孚机油活动-首页');
  },
  computed:{
    oilImgSrc: function () {
      if( this.xcMobilOil >=0 && this.xcMobilOil <=5 ) {
        return "/bundles/app/activity_mobil/" + this.xcMobilOil + "00ml.png";
      } else if ( this.xcMobilOil >= 5 && this.xcMobilOil <= 10 ) {
        return "/bundles/app/activity_mobil/500ml.png";
      } else if ( this.xcMobilOil >= 10 && this.xcMobilOil <= 15 ) {
        return "/bundles/app/activity_mobil/1000ml.png";
      } else if ( this.xcMobilOil >= 15 && this.xcMobilOil <= 20 ) {
        return "/bundles/app/activity_mobil/1500ml.png";
      } else if ( this.xcMobilOil >= 20 && this.xcMobilOil <= 25 ) {
        return "/bundles/app/activity_mobil/2000ml.png";
      } else if ( this.xcMobilOil >= 25 && this.xcMobilOil <= 30 ) {
        return "/bundles/app/activity_mobil/2500ml.png";
      } else if ( this.xcMobilOil >= 30 && this.xcMobilOil <= 35 ) {
        return "/bundles/app/activity_mobil/3000ml.png";
      } else if ( this.xcMobilOil >= 35 ) {
        return "/bundles/app/activity_mobil/4000ml.png";
      } else {
        return "/bundles/app/activity_mobil/000ml.png";
      }
    },
    fullOil: function () {
      if ( this.xcMobile.is_full ) {
        return this.xcMobile.oil_num * 100
      } else {
        return 0
      }
    }
  },
  attached: function () {
  }
}
</script>

<style lang="scss" scoped>
  #main {
    height: 100%;
    .toggle-tip {
      background-color: rgba(0, 0, 0, 0.7);
      width: 100%;
      height: 110%;
      position: fixed;
      top: -6px;
      z-index: 999;
      background-image: url('../assets/activity.png');
      background-repeat: no-repeat;
      background-size: 80%;
      background-position: 50% 35%;
    }
    .header {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      .left-header {
        width: 198px;
        height: 21px;
        background-image: url('../assets/logos.png');
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 15px;
      }
      .right-header {
        font-size: 15px;
        margin-right: 19px;
        color: #FE5959;
        height: 21px;
        line-height: 23px;
        text-decoration: underline;
      }
    }
    .level {
      line-height: 25px;
      color: #0054A6;
      font-size: 18px;
      margin-top: 19px;
      text-align: center;
    }
    .charge-outer {
      position: relative;
      padding-top: 18px;
      text-align: center;
      .exchange-area {
        position: absolute;
        right: 30px;
        top: -10px;
        width: 23%;
        text-align: center;
        span {
          position: absolute;
          top: 0;
          left: 50%;
          margin-left: -13px;
          top: 50%;
          margin-top: -24px;
          width: 32px;
          height: 44px;
          color: #897613;
          font-size: 16px;
          line-height: 22px;
        }
        .exchange-button {
          width: 100%;
          .inner-exchange-button {
            width: 32px;
            color: #897613;
            font-size: 16px;
            margin: 17px auto 0;
            line-height: 19px;
            position: relative;
            left: 2px;
          }
        }
      }
      .show-oil {
        position: absolute;
        width: 80px;
        height: 80px;
        top: 80px;
        left: 45%;
        border: 1px solid #FE5959;
        border-radius: 40px;
        p {
          &:first-child {
            margin-top: 25px;
            color: #FE5959;
            font-size: 16px;
            line-height: 1.1;
            margin-bottom: 5px;
          }
          &:nth-child(2) {
            color: #343434;
            font-size: 10px;
            line-height: 1.1;
          }
        }
        &:after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          width: 70px;
          height: 70px;
          border: 1px dashed #FE5959;
          border-radius: 35px;
        }
      }
    }
    .inner-scroll-block {
      display: inline-block;
      position: relative;
    }
    .scroll-block {
      display: flex;
      justify-content: center;
      text-align: center;
      padding-bottom: 70px;
      span {
        display: inline-block;
        white-space:nowrap;
        overflow:hidden;
        width: 200px;
        margin-left: 25px;
        text-overflow:ellipsis;
        font-size: 15px;
        color: #44A7EF;
        height: 36px;
        line-height: 36px;
      }
    }
    .bottom-bar {
      position: fixed;
      bottom: 0;
      background-color: #349FEC;
      width: 100%;
      height: 60px;
      line-height: 60px;
      display: flex;
      color: #fff;
      font-size: 16px;
      z-index: 10;
      div {
        width: 50%;
        text-align: center;
        &:first-child {
          position: relative;
          &:after {
            position: absolute;
            content: '';
            bottom:0;
            right: 0;
            width: 1px;
            height: 100%;
            background: #FFFFFF;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            opacity: .3;
          }
        }
      }
    }
  }
</style>
