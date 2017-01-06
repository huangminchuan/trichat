<template lang="html">
  <div id="order">
    <div class="header">
      <div class="left-header"></div>
      <div class="right-header"  @click="showRule">活动规则</div>
    </div>
    <div class="title">加量不加价礼包当前奖品池</div>
    <div class="img-area">
      <img class="team-success-img" v-if="mobil_config.finished" src="/bundles/app/crazy_img/team-success.png"/>
      <img class="max-product" :src="'/bundles/app/crazy_img/product' + mobil_config.stage +  '.png'"/>
      <img class="left-img" src="/bundles/app/crazy_img/left.png"/>
      <img class="right-img" src="/bundles/app/crazy_img/right.png"/>
      <img class="price-img" :src="'/bundles/app/crazy_img/product' + this.mobil_config.stage + this.mobil_config.stage + '.png'"/>
    </div>
    <div class="package-detail" @click="showProduct">凑满10人即可获得最高<i>价值1130元的礼品</i></div>
    <div class="total-price"><span style="color: #349FEC">￥</span><i>380</i>/个</div>
    <div class="toggle-bar clearfix">
      <div class="left-bar" v-bind:class="activeTask" @click="clickTask">加礼任务</div>
      <div class="right-bar" v-bind:class="activeBuy" @click="clickBuy">参购详情</div>
    </div>


    <div class="task-area" v-show="showTask">
      <div class="level-product">
        <img :src="'/bundles/app/crazy_img/buy' + mobil_config.stage + '.png'"/>
      </div>
    </div>


    <div class="buy-detail" v-show="showBuy">
      <div class="user-area">
        <div class="user-head" v-for="item in mobil_config.join_list">
          <img class="user-style" :src="item.avatar"/>
          <span class="user-babel" v-if="item.role == 'captain'">组长</span>
        </div>
      </div>
      <div class="number-detail" v-if="!mobil_config.finished">您参加的上门保养购，成员已经增加到{{ mobil_config.join_list.length }}人，＋{{ addProduct[mobil_config.stage].name }}，再有{{ addProduct[mobil_config.stage + 1].number - mobil_config.join_list.length }}人参购 {{ '+' + addProduct[mobil_config.stage + 1].name || '' }}</div>
      <div class="number-detail" v-else style="text-align:center">组团成功，感谢各位参加，组长感激涕零</div>
      <div class="rest-time">
        剩余
        <span>{{ hour }}</span>
        <i>:</i>
        <span>{{ min }}</span>
        <i>:</i>
        <span>{{ second }}</span>
        结束
      </div>
      <p class="grey-bar"></p>
      <div class="member-list" :class="item.role == 'captain' ? is_boss : not_boss " v-for="item in mobil_config.join_list">
        <img :src="item.avatar"/>
        <span>{{ item.nickname }}</span>
        <span class="activity-time">{{ item.created_at }} {{ item.role == 'captain' ? '开组' : '参组' }}</span>
      </div>
    </div>


    <p class="grey-bar"></p>
    <div class="step">
      <img src="/bundles/app/crazy_img/stage2.jpg" v-if="!mobil_config.finished"/>
      <img src="/bundles/app/crazy_img/stage3.jpg" v-if="mobil_config.finished"/>
    </div>
    <p class="grey-bar"></p>
    <div class="product-area">
      <img class="product-detail" src="/bundles/app/crazy_img/product_detail.jpg"/>
    </div>
    <div class="join-button" @click="invitFriend" v-if="!mobil_config.finished && mobil_config.is_self_start">赶紧来凑满10人获养车礼包吧</div>
    <div class="team-success" @click="joinActiviy" v-if="mobil_config.finished && mobil_config.is_self_start">再开一个团</div>
    <div class="other-button" v-if="mobil_config.is_self_start == ''">
      <div class="left-button" @click="joinOther">我要参购</div>
      <div class="right-button" @click="joinActiviy">我要开团</div>
    </div>
    <div class="bottom-button" @click="showList">
      <img src="/bundles/app/crazy_img/team_circle.png"/>
    </div>
    <list v-show="listShow"></list>
    <rule v-show="ruleShow"></rule>
    <product v-show="productShow"></product>
    <invit v-show="invitShow"></invit>
    <success v-show="successShow"></success>
  </div>
</template>

<script>
import rule from '../components/rule.vue';
import list from '../components/list.vue';
import product from '../components/product.vue';
import invit from '../components/invit.vue';
import success from '../components/success.vue';
export default {
  data: function () {
    return {
      ruleShow: false,
      productShow: false,
      showTask: true,
      showBuy: false,
      invitShow: false,
      successShow: false,
      listShow: false,
      day: '',
      hour: '',
      min: '',
      second: '',
      mobil_config: window.xc_mobil_config,
      is_boss: {
        'big-boss': true
      },
      not_boss: {
        'big-boss': false
      },
      activeTask: {
        'active-bar': true
      },
      activeBuy: {
        'active-bar': false
      }
    }
  },
  computed: {
    addProduct: function () {
      return {
        ['1'] : {
          name: '品牌机油和机滤',
          number: 1
        },
        ['2'] : {
          name: '发动机舱清洗一次',
          number: 2
        },
        ['3'] : {
          name: '节气门清洗一次',
          number: 6
        },
        ['4'] : {
          name: '空调清洗一次',
          number: 10
        }
      }
    }
  },
  ready: function () {
    window.time_now = new Date(this.mobil_config.started_at); // 获取当前时间
    window.time_now_time = time_now.getTime() + 60 * 24 * 60 * 1000;
    window.time_end_time = new Date().getTime();
    setInterval(this.sumTime,1000);
    if ( this.mobil_config.finished && this.mobil_config.type != 'not_join' ) {
      this.successShow = true;
    }
    if ( this.mobil_config.finished ) {
      $('.rest-time').hide();
    }
  },
  attached: function () {},
  methods: {
    showRule: function () {
      this.ruleShow = !this.ruleShow;
    },
    showProduct: function () {
      this.productShow = !this.productShow
    },
    showList: function () {
      if ( window.xc_mobil_config.join_promotions.length == 0 && window.xc_mobil_config.start_promotions.length == 0 ) {
        alert('您还没有加入任何团，快去创建一个团吧');
      } else {
        this.listShow = !this.listShow;
      }
    },
    clickBuy: function () {
      this.showBuy = true;
      this.showTask = false;
      this.activeTask['active-bar'] = false;
      this.activeBuy['active-bar'] = true;
    },
    clickTask: function () {
      this.showTask = true;
      this.showBuy = false;
      this.activeTask['active-bar'] = true;
      this.activeBuy['active-bar'] = false;
    },
    invitFriend: function () {
      this.invitShow = !this.invitShow;
    },
    joinOther: function () {
      this.$http.post('/v2/mobil_promotion/join',{user_promotion_id:this.mobil_config.id}).then(function (response) {
        if ( response.data.status.code == 200 ) {
          sessionStorage.setItem('record_id',response.data.data.record_id);
          var currentHost = 'http://' + window.location.host;
          var random = parseInt( Math.random() * 10 );
          window.location.href = currentHost + '/wx/mobil_promotion_2?id=' + this.mobil_config.id + '&v=' + random + '#!/pay';
        } else {
          alert(response.data.status.msg);
        }
      },function (response) {
        console.log(response);
      });
    },
    joinActiviy: function () {
          var currentHost = 'http://' + window.location.host;
          var random = parseInt( Math.random() * 10 );
          window.location.href = currentHost + '/wx/mobil_promotion_2/id/0/source?v=' + random + '#!/index';
    },
    sumTime: function () {
      time_now_time = time_now_time + 1000;
      var time_distance = time_now_time - time_end_time ; // 时间差：活动结束时间减去当前时间
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
    rule,
    product,
    invit,
    success,
    list
  }
}
</script>

<style lang="scss">
  #order {
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
      .team-success-img {
        position: absolute;
        width: 20%;
        top: 25px;
        right: 20%;
        z-index: 10;
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
      .price-img {
        position: absolute;
        width: 25%;
        right: 20px;
        top: 10px;
      }
    }
    .package-detail {
      color: #888888;
      background-color: #fff;
      font-size: 14px;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 20px;
      i {
        color: #349FEC;
        text-decoration: underline;
      }
    }
    .total-price {
      background-color: #fff;
      box-sizing: border-box;
      font-size: 20px;
      text-align: center;
      color: #349FEC;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px dashed #dcdcdc;
      padding-bottom: 10px;
      i {
        font-size: 46px;
        color: #349FEC;
      }
    }
    .toggle-bar {
      height: 56px;
      line-height: 56px;
      font-size: 15px;
      background-color: #fff;
      .left-bar {
        width: 50%;
        text-align: center;
        float: left;
      }
      .right-bar {
        width: 50%;
        text-align: center;
        float: left;
      }
    }
    .task-area {
      .level-product {
        padding-right: 15px;
        padding-left: 15px;
        padding-bottom: 15px;
        background-color: #fff;
        img {
          width: 100%;
        }
      }
    }
    .buy-detail {
      .user-area {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 15px;
        .user-head {
          position: relative;
          width: 50px;
          height: 50px;
          margin-right: 15px;
          margin-bottom: 15px;
          &:after {
            margin-right: 0;
          }
          .user-style {
            border-radius: 25px;
            width: 100%;
          }
          .user-babel {
            color: #fff;
            border-radius: 10px;
            position: absolute;
            width: 32px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background-color: #349FEC;
            top: -5px;
            font-size: 12px;
            right: -15px;
          }
        }
      }
      .number-detail {
        font-size: 14px;
        color: #F83F23;
        line-height: 25px;
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
        margin-bottom: 15px;
      }
      .rest-time {
        text-align: center;
        color: #343434;
        height: 30px;
        padding-bottom: 20px;
        span {
          font-size: 16px;
          color: #fff;
          background-color: #E6C200;
          padding: 4px;
          border-radius: 4px;
        }
      }
      .member-list {
        height: 60px;
        line-height: 60px;
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
        font-size: 15px;
        img {
          width: 34px;
          height: 34px;
          border-radius: 17px;
          margin-right: 15px;
          vertical-align: -13px;
        }
        .activity-time {
          float: right;
        }
      }
    }
    .step {
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
      font-size: 16px;
      bottom: 0;
    }
    .team-success {
      height: 60px;
      line-height: 60px;
      color: #fff;
      text-align: center;
      background-color: #349FEC;
      position: fixed;
      width: 100%;
      font-size: 16px;
      bottom: 0;
    }
    .other-button {
      height: 60px;
      line-height: 60px;
      color: #fff;
      text-align: center;
      background-color: #349FEC;
      position: fixed;
      width: 100%;
      font-size: 16px;
      bottom: 0;
      .left-button {
        width: 50%;
        float: left;
        height: 60px;
        line-height: 60px;
        position: relative;
        &:after {
          position: absolute;
          content: '';
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: #dcdcdc;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
      }
      .right-button {
        width: 50%;
        float: left;
        height: 60px;
        line-height: 60px;
      }
    }
    .product-area {
      padding-bottom: 60px;
      .product-detail {
        width: 100%;
      }
    }
    .bottom-button {
      position: fixed;
      bottom: 75px;
      right: 15px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      img {
        width: 100%;
      }
    }
  }
</style>
