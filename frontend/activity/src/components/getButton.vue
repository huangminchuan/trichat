<template>
  <div id="button">
    <div v-if="oneButton" @click="question" class="get-free-fisrt">
      <span>我要免费机油</span>
      <img src="/bundles/app/activity_mobil/button.png"/>
    </div>
    <div v-if="twoButton" class="get-free-twice">
      <img src="/bundles/app/activity_mobil/button1.png" @click="shareOther"/>
      <span @click="shareOther">我要免费机油</span>
      <img src="/bundles/app/activity_mobil/button2.png" v-link="{name:'Friend'}"/>
      <span v-link="{name:'Friend'}">查看加油好友</span>
    </div>
    <div v-if="threeButton" class="get-free-third">
      <div class="button-content">
        <img src="/bundles/app/activity_mobil/button1.png" @click="helpAdd"/>
        <span @click="helpAdd">帮他加机油</span>
      </div>
      <div class="button-content">
        <img src="/bundles/app/activity_mobil/button2.png" @click="myOil"/>
        <span @click="myOil">我也要机油</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      xcMobilConfig : window.xc_mobil_config
    }
  },
  props: ['oneButton','twoButton','threeButton'],
  computed: {

  },
  methods: {
    question () {
      if ( this.xcMobilConfig.is_first ) {
        if ( this.$parent.isFirst == 0 ) {
          this.$dispatch('showQuestion');
        } else {
          this.$parent.invShow = true;
        }
      } else {
          this.$parent.invShow = true;
      }
    },
    shareOther () {
      if ( this.xcMobilConfig.is_first ) {
        this.$http.post('/v2/mobil_promotion/add',{user_promotion_id: this.xcMobilConfig.id}).then(
          function (response) {

            let responseData = response.data;
            if (typeof responseData === 'string') {
              responseData = JSON.parse(responseData);
            }

          if ( responseData.status.code == 200 ) {
            alert('恭喜你100ml机油添加成功，赶快分享给你的好友帮你加油吧~');
          } else {
            alert(responseData.status.msg);
          }
        }, function (response) {
          console.log(response);
        });
      } else {
        this.$parent.invShow = true;
      }
    },
    helpAdd () {
      this.$http.post('/v2/mobil_promotion/add',{user_promotion_id: this.xcMobilConfig.id}).then(
        function (response) {

          let responseData = response.data;
          if (typeof responseData === 'string') {
            responseData = JSON.parse(responseData);
          }

        if ( responseData.status.code == 200 ) {
          alert('帮好友加油成功，点击“我也要机油”赢取你的【免费】机油~');
          this.$parent.xcMobilOil ++;
        } else {
          alert(responseData.status.msg);
        }
      }, function (response) {
        console.log(response);
      });
    },
    myOil () {
      var random = parseInt( Math.random() * 10 );
      window.location.href = 'http://www.xieche.com.cn/wx/mobil_promotion/id/0?v=' + random + '#!/index';
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 320px) {
    .get-free-twice {
      span {
        font-size: 15px;
      }
    }
  }
  #button {
    .get-free-fisrt {
      width: 100%;
      margin-top: 19px;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 16px;
      color: #fff;
      position: relative;
      span {
        position: absolute;
        z-index: 10;
        left: 50%;
        margin-left: -48px;
        top: 50%;
        margin-top: -13px;
      }
      img {
        width: 74%;
      }
      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        display: block;
        width: 20%;
        height: 120px;
        background-image: url('../assets/pic_left.png');
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 2;
      }
      &:before {
        position: absolute;
        bottom: 0;
        right: 0;
        content: '';
        display: block;
        width: 20%;
        height: 80px;
        background-image: url('../assets/pic_right.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center right;
        z-index: 2;
      }
    }
    .get-free-twice {
      width: 100%;
      margin-top: 19px;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 16px;
      color: #fff;
      position: relative;
      img {
        width: 36%;
      }
      span {
        position: absolute;
        z-index: 10;
        left: 25%;
        margin-left: -24px;
        top: 50%;
        margin-top: -13px;
        &:nth-child(4) {
          position: absolute;
          z-index: 10;
          right: -75px;
          top: 50%;
          width: 30%;
          left: 61%;
          margin-top: -13px;
        }
      }
      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        display: block;
        width: 20%;
        height: 120px;
        background-image: url('../assets/pic_left.png');
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 2;
      }
      &:before {
        position: absolute;
        bottom: 0;
        right: 0;
        content: '';
        display: block;
        width: 20%;
        height: 80px;
        background-image: url('../assets/pic_right.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center right;
        z-index: 2;
      }
    }
    .get-free-third {
      width: 100%;
      margin-top: 19px;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 16px;
      color: #fff;
      position: relative;
      .button-content {
        width: 36%;
        display: inline-block;
        position: relative;
        span {
          position: absolute;
          z-index: 10;
          left: 50%;
          margin-left: -42px;
          top: 50%;
          margin-top: -13px;
        }
      }
      img {
        width: 100%;
      }
      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        display: block;
        width: 20%;
        height: 120px;
        background-image: url('../assets/pic_left.png');
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 2;
      }
      &:before {
        position: absolute;
        bottom: 0;
        right: 0;
        content: '';
        display: block;
        width: 20%;
        height: 80px;
        background-image: url('../assets/pic_right.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center right;
        z-index: 2;
      }
    }
  }
</style>
