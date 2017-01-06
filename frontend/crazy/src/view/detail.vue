<template>
  <div id="detail">
    <div class="header">
      <div class="left-header"></div>
      <div class="right-header" @click="showRule">活动规则</div>
    </div>
    <div class="title">加量不加价礼包</div>
    <div class="img-area">
      <img class="max-product" src="/bundles/app/crazy_img/product4.png"/>
      <img class="left-img" src="/bundles/app/crazy_img/left.png"/>
      <img class="right-img" src="/bundles/app/crazy_img/right.png"/>
      <img class="price-img" src="/bundles/app/crazy_img/product44.png"/>
    </div>
    <div class="package-detail">凑满10人即可获得以上所有礼品</div>
    <div class="package-message clearfix">
      <div class="left-message clearfix">
        <div class="left-price"><span class="money-icon">￥</span>380</div>
        <div class="right-area">
          <div class="right-number">已开{{ mobil_config.total_num }}个组</div>
          <div class="error-price">￥1130.00</div>
        </div>
      </div>
      <div class="right-message">
        <p>距离结束仅剩{{ day }}天</p>
        <div class="rest-time">
          <span>{{ hour }}</span>
          <i>:</i>
          <span>{{ min }}</span>
          <i>:</i>
          <span>{{ second }}</span>
        </div>
      </div>
    </div>
    <p class="grey-bar"></p>
    <p class="package-explain">加量不加价礼包说明</p>
    <p class="package-explain-detail">＊礼包价格统一为380元，参购人数增多，礼品会越多，礼品会在组团成功后发送至您的卡券列表</p>
    <p class="grey-bar"></p>
    <div class="step">
      <img :src="'/bundles/app/crazy_img/buy' + ( mobil_config.stage - 1 ) + '.png'"/>
    </div>
    <p class="grey-bar"></p>
    <div class="product-area">
      <img class="product-detail" src="/bundles/app/crazy_img/product_detail.jpg"/>
    </div>
    <div class="join-button" @click="goBuy">我要开组</div>
    <rule v-show="ruleShow"></rule>
  </div>
</template>

<script>
import rule from '../components/rule.vue';
export default {
  data: function () {
    return {
      ruleShow: false,
      mobil_config: window.xc_mobil_config,
      day: '',
      hour: '',
      min: '',
      second: ''
    }
  },
  computed: {
  },
  ready: function () {
    setInterval(this.sumTime,1000);
  },
  attached: function () {},
  methods: {
    showRule: function () {
      this.ruleShow = !this.ruleShow;
    },
    goBuy: function () {
      var currentHost = 'http://' + window.location.host;
      var random = parseInt( Math.random() * 10 );
      window.location.href = currentHost + '/wx/mobil_promotion_2?id=' + this.mobil_config.id + '&v=' + random + '#!/pay';
    },
    sumTime: function () {
      var time_now = new Date(); // 获取当前时间
      var time_end = new Date(this.mobil_config.expires_at);
      time_now = time_now.getTime();
      time_end = time_end.getTime();
      var time_distance = time_end - time_now; // 时间差：活动结束时间减去当前时间
      var int_day, int_hour, int_minute, int_second;
          int_day = Math.floor(time_distance / 86400000)
          time_distance -= int_day * 86400000;
          // 相减的差数换算成小时
          int_hour = Math.floor(time_distance / 3600000)

          time_distance -= int_hour * 3600000;

          // 相减的差数换算成分钟
          int_minute = Math.floor(time_distance / 60000)

          time_distance -= int_minute * 60000;

          // 相减的差数换算成秒数
          int_second = Math.floor(time_distance / 1000)

          // 判断小时小于10时，前面加0进行占位
          if (int_hour < 10)

          int_hour = "0" + int_hour;

          // 判断分钟小于10时，前面加0进行占位
          if (int_minute < 10)

          int_minute = "0" + int_minute;

          // 判断秒数小于10时，前面加0进行占位
          if (int_second < 10)

          int_second = "0" + int_second;

          // 显示倒计时效果
          this.day = int_day;

          this.hour = int_hour;

          this.min = int_minute;

          this.second = int_second;
    }
  },
  components: {
    rule
  }
}
</script>

<style lang="scss">
  #detail {
    .header {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      .left-header {
        width: 198px;
        height: 21px;
        background-image: url('/bundles/app/crazy_img/logo.png');
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
    .title {
      font-size: 18px;
      color: #0054A6;
      text-align: center;
      margin: 25px 0 20px;
    }
    .img-area {
      text-align: center;
      position: relative;
      .price-img {
        position: absolute;
        width: 25%;
        right: 20px;
        top: 10px;
      }
      .max-product {
        width: 80%;
      }
      .left-img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 18%;
      }
      .right-img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 18%;
      }
    }
    .package-detail {
      color: #888888;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .package-message {
      .left-message {
        width: 60%;
        height: 72px;
        float: left;
        background-color: #349FEC;
        .left-price {
          box-sizing: border-box;
          padding-left: 14px;
          float: left;
          height: 72px;
          line-height: 72px;
          .money-icon {
            font-size: 20px;
          }
          font-size: 38px;
          color: #fff;
        }
        .right-area {
          height: 72px;
          float: right;
          color: #fff;
          font-size: 14px;
          box-sizing: border-box;
          float: left;
          padding-top: 17px;
          margin-left: 10px;
          .error-price {
            text-decoration: line-through;
          }
          .right-number {
            margin-bottom: 8px;
          }
        }
      }
      .right-message {
        width: 40%;
        height: 72px;
        float: right;
        background-color: #FFEF09;
        p {
          margin-top: 10px;
          color: #746200;
          font-size: 14px;
          text-align: center;
          margin-bottom: 12px;
        }
        .rest-time {
          text-align: center;
          color: #746200;
          height: 30px;
          span {
            font-size: 16px;
            color: #fff;
            background-color: #BA9D00;
            padding: 4px;
            border-radius: 4px;
          }
        }
      }
    }
    .package-explain {
      font-size: 16px;
      color: #343434;
      line-height: 27px;
      padding-left: 15px;
      margin-top: 15px;
      margin-bottom: 5px;
    }
    .package-explain-detail {
      font-size: 14px;
      line-height: 20px;
      color: #F83F23;
      padding-left: 15px;
      padding-right: 15px;
      margin-bottom: 15px;
      box-sizing: border-box;
    }
    .level-product {
      padding-right: 15px;
      padding-left: 15px;
      padding-bottom: 15px;
      background-color: #fff;
      img {
        width: 100%;
      }
    }
    .step {
      padding: 15px;
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
    .join-button {
      height: 60px;
      line-height: 60px;
      color: #fff;
      text-align: center;
      background-color: #349FEC;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
    .product-area {
      padding-bottom: 60px;
      .product-detail {
        width: 100%;
      }
    }
  }
</style>
