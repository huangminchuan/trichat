<template lang="html">
  <div id="pay">
    <div class="header">
      <div class="left-header"></div>
      <div class="right-header" @click="showRule">活动规则</div>
    </div>
    <div class="title">当前奖金池</div>
    <div class="img-area">
      <img class="max-product" :src="'/bundles/app/crazy_img/product' + this.mobil_config.stage + '.png'"/>
      <img class="left-img" src="/bundles/app/crazy_img/left.png"/>
      <img class="right-img" src="/bundles/app/crazy_img/right.png"/>
      <img class="price-img" :src="'/bundles/app/crazy_img/product' + this.mobil_config.stage + this.mobil_config.stage + '.png'"/>
    </div>
    <div class="package-detail" @click="showProduct">凑满10人即可获得最高<i>价值1130元的礼品</i></div>
    <p class="grey-bar"></p>
    <div class="pay-list">
      <img src="/bundles/app/crazy_img/pay.jpg"/>
    </div>
    <p class="grey-bar"></p>
    <div class="step">
      <img src="/bundles/app/crazy_img/stage1.jpg"/>
    </div>
    <p class="grey-bar"></p>
    <div class="product-area">
      <img class="product-detail" src="/bundles/app/crazy_img/product_detail.jpg"/>
    </div>
    <div class="bottom-price clearfix">
      <div class="total-price">合计：<span style="color: #349FEC">￥</span><i>380</i>元</div>
      <div class="pay-button" @click="quickPay">立即支付</div>
    </div>
    <product v-if="productShow"></product>
    <two-code v-if="codeShow"></two-code>
    <rule v-if="ruleShow"></rule>
  </div>
</template>

<script>
import product from '../components/product.vue'
import twoCode from '../components/code.vue'
import rule from '../components/rule.vue'
export default {
  data: function () {
    return {
      productShow: false,
      codeShow: false,
      ruleShow: false,
      mobil_config: window.xc_mobil_config
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    showProduct: function () {
      this.productShow = !this.productShow
    },
    quickPay: function () {
      if ( this.mobil_config.is_subscribe ) {
        if ( this.mobil_config.is_login ) {
          this.$http.post('/v2/pay/pingpp/custom_charge',{id:sessionStorage.getItem('record_id'),channel:'wx_pub',platform:'mobil'}).then(function (response) {
            if ( response.data.status.code == 200 ) {
              pingpp.createPayment(response.data.data.charge, function(result, err){
                if (result == "success") {
                  // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                  alert('支付成功');
                  setTimeout(function () {
                    var currentHost = 'http://' + window.location.host;
                    var random = parseInt( Math.random() * 10 );
                    window.location.href = currentHost + '/wx/mobil_promotion_2/id/' + window.xc_mobil_config.id + '/source?v=' + random + '#!/order';
                  },2000);
                } else if (result == "fail") {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                  var currentHost = 'http://' + window.location.host;
                  var random = parseInt( Math.random() * 10 );
                  window.location.href = currentHost + '/wx/mobil_promotion_2/id/' + window.xc_mobil_config.id + '/source?v=' + random + '#!/pay';
                } else if (result == "cancel") {
                  // 微信公众账号支付取消支付
                  var currentHost = 'http://' + window.location.host;
                  var random = parseInt( Math.random() * 10 );
                  window.location.href = currentHost + '/wx/mobil_promotion_2/id/' + window.xc_mobil_config.id + '/source?v=' + random + '#!/pay';
                }
              });
            } else {
              alert(response.data.status.msg);
            }
          },function (response) {
            console.log(response);
          });
        } else {
          var currentHost = 'http://' + window.location.host;
          var random = parseInt( Math.random() * 10 );
          window.location.href = currentHost + '/wx/mobil_promotion_2/id/' + this.mobil_config.id + '/source?v=' + random + '#!/login';
        }
      } else {
        this.codeShow = !this.codeShow;
      }
    },
    showRule: function () {
      this.ruleShow = !this.ruleShow
    }
  },
  components: {
    product,
    twoCode,
    rule
  }
}
</script>

<style lang="scss">
  #pay {
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
      font-size: 16px;
      color: #0054A6;
      text-align: center;
      margin: 25px 0 20px;
    }
    .img-area {
      text-align: center;
      position: relative;
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
      .price-img {
        position: absolute;
        width: 25%;
        right: 20px;
        top: 10px;
      }
    }
    .package-detail {
      color: #888888;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 20px;
      i {
        text-decoration: underline;
        color: #349FEC;
      }
    }
    .pay-list {
      img {
        width: 100%;
      }
    }
    .step {
      img {
        width: 100%;
      }
    }
    .bottom-price {
      position: fixed;
      width: 100%;
      bottom: 0;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      &:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #dcdcdc;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
      .total-price {
        width: 70%;
        padding-left: 15px;
        background-color: #fff;
        float: left;
        box-sizing: border-box;
        font-size: 18px;
        color: #343434;
        i {
          font-size: 26px;
          color: #349FEC;
        }
      }
      .pay-button {
        width: 30%;
        text-align: center;
        color: #fff;
        background-color: #349FEC;
        float: left;
      }
    }
    .product-area {
      padding-bottom: 60px;
      .product-detail {
        width: 100%;
      }
    }
  }
</style>
