<template lang="html">
  <div id="main">
    <div class="header">
      <div class="left-header"></div>
      <div class="right-header"  @click="showRule">活动规则</div>
    </div>
    <div class="main-title">
      <img src="/bundles/app/crazy_img/main1.png"/>
    </div>
    <div class="main-body">
      <img src="/bundles/app/crazy_img/main2.png"/>
    </div>
    <div class="get-free-fisrt" @click="joinActiviy">
      <span>进入活动</span>
      <img src="/bundles/app/crazy_img/button.png"/>
    </div>
    <two-code v-show="codeShow"></two-code>
    <rule v-show="ruleShow"></rule>
    <success v-show="successShow"></success>
    <list v-show="listShow"></list>
  </div>
</template>

<script>
import twoCode from '../components/code.vue'
import rule from '../components/rule.vue'
import success from '../components/success.vue'
import list from '../components/list.vue'
export default {
  data: function () {
    return {
      codeShow: false,
      ruleShow: false,
      successShow: false,
      listShow: false,
      mobil_config: window.xc_mobil_config
    }
  },
  computed: {

  },
  ready: function () {
    if ( window.xc_mobil_config.join_promotions.length != 0 || window.xc_mobil_config.start_promotions.length != 0 ) {
      this.listShow = true;
    } else {
      this.listShow = false;
    }
  },
  attached: function () {
  },
  methods: {
    joinActiviy: function () {
      this.$http.post('/v2/mobil_promotion/start',{promotion_id:2}).then(function (response) {
        if ( response.data.status.code == 200 ) {
          sessionStorage.setItem('record_id',response.data.data.record_id);
          var currentId = response.data.data.user_promotion_id;
          var currentHost = 'http://' + window.location.host;
          var random = parseInt( Math.random() * 10 );
          window.location.href = currentHost + '/wx/mobil_promotion_2/id/' + currentId + '/source?v=' + random + '#!/detail';
        } else {
          alert(response.data.status.msg);
        }
      },function (error) {
        console.log(response);
      });
    },
    showRule: function () {
      this.ruleShow = !this.ruleShow;
    }
  },
  components: {
    twoCode,
    rule,
    success,
    list
  }
}
</script>

<style lang="scss">
  #main {
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
    .main-title {
      margin-top: 20px;
      text-align: center;
      img {
        width: 80%;
      }
    }
    .main-body {
      position: relative;
      margin-top: -30px;
      text-align: center;
      z-index: -1;
      img {
        width: 80%;
      }
    }
    .get-free-fisrt {
      width: 100%;
      margin-top: 5px;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 16px;
      color: #fff;
      position: relative;
      span {
        position: absolute;
        z-index: 10;
        left: 50%;
        margin-left: -32px;
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
        height: 90px;
        background-image: url('/bundles/app/crazy_img/left.png');
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
        background-image: url('/bundles/app/crazy_img/right.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center right;
        z-index: 2;
      }
    }
  }
</style>
