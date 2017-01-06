<template>
  <div id="rule" v-if="inShow">
    <div class="board" @click="clearBoard"></div>
    <img class="one-oil" src="../assets/one_oil.png"/>
    <div class="rule-area">
      <div class="yellow-close" @click="clearBoard"></div>
      <span class="yellow-close-button" @click="clearBoard">x</span>
      <div class="rule-title">活动规则</div>
      <div class="rule-body">
        <p>1.首次为自己加油，需要先回答正确一道题</p>
        <p>2.每个用户只有一次为自己加油和一次替他人加油的资格</p>
        <p>3.邀请小伙伴帮自己加油，限定100ml/次/人</p>
        <p>4.每闯过一关，即可兑换相应的奖品</p>
        <p class="prize-tip">首位加满机油桶的用户，可获得一份价值5000元自驾游基金(每个城市限1份)</p>
        <p>5.通过获取的代金券完成服务并晒单分享后，即可获得一份由“美孚机油”提供的百元礼品</span></p>
        <p>6.兑换机油仅限上门保养服务使用，不能邮寄，不能退换，不能兑现</p>
        <p>7.携车上门服务范围包含11个城市：<span class="yellow-font">北京、上海、苏州、无锡、杭州、南京、济南、成都、深圳、福州、厦门</span></p>
        <p>8.奖品设置如下：</p>
        <p class="prize-item">加满<span class="yellow-font">500ml</span>：预约上门小保养满300-50，100元汽车清洗项目代金劵，共90000份</p>
        <p class="prize-item">加满<span class="yellow-font">1000ml</span>：预约汽车清洗满300-100元和100元上门保养代金劵，共70000份</p>
        <p class="prize-item">加满<span class="yellow-font">1500ml</span>：预约速霸2000小保养和汽车清洗满500-100元，100元汽车清洗代金劵，共50000份</p>
        <p class="prize-item">加满<span class="yellow-font">2000ml</span>：预约速霸2000大保养和汽车清洗满600-100元，100元上门保养代金劵，共30000份</p>
        <p class="prize-item">加满<span class="yellow-font">3000ml</span>：加满3000ml：预约价值699元的速霸2000小保养仅需330元，汽车清洗200元代金劵，共10000份</p>
        <p class="prize-item">加满<span class="yellow-font">4000ml</span>：免费赠送4L速霸2000机油，100元汽车清洗代金券，100元无门槛上门汽车保养代金券，奖品共500份</p>
        <p>9.活动周期：</p>
        <p>活动时间：2016年9月1日-9月10日</p>
        <p>兑奖时间：2016年9月1日-10月31日</p>
        <p>使用有效期：截止到2016年12月31日</p>
        <p><span class="yellow-font">注：超过10月31日还未兑换，将视为用户放弃领取奖品</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inShow"],
  methods: {
    clearBoard () {
      this.inShow = !this.inShow
    }
  }
}
</script>

<style lang="scss">
  #rule {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    .prize-item {
      margin-bottom: 10px;
    }
    .one-oil {
      width: 18%;
      position: absolute;
      top: 5%;
      left: 12%;
      z-index: 12;
    }
    .rule-area {
      box-sizing: border-box;
      width: 86%;
      left: 7%;
      top: 10%;
      height: 80%;
      overflow: auto;
      background-color: #44A7EF;
      position: absolute;
      z-index: 11;
      padding-top: 30px;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 15px;
      border-radius: 8px;
      .rule-title {
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin-bottom: 25px;
      }
      .rule-body {
        height: 84%;
        overflow: auto;
        .prize-tip {
          padding: 12px;
          color: #FFE350;
          font-size: 15px;
          line-height: 25px;
          background-color: #1D7FC6;
          margin-top: 6px;
          margin-bottom: 6px;
        }
        p {
          line-height: 25px;
          color: #fff;
          font-size: 15px;
        }
      }
      .yellow-close {
        position: absolute;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        border-top: 56px solid #FFE350;
        border-left: 56px solid transparent;
      }
      .yellow-close-button {
        position: absolute;
        right: 8px;
        top: 2px;
        font-size: 25px;
        color: #fff;
      }
    }
    .yellow-font {
      color: #FFE350;
    }
  }
</style>
