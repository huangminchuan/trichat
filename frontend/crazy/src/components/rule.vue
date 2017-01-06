<template>
  <div id="rule">
    <div class="board" @click="clearBoard"></div>
    <img class="one-oil" src="/bundles/app/crazy_img/present.png"/>
    <div class="rule-area">
      <div class="yellow-close" @click="clearBoard"></div>
      <span class="yellow-close-button" @click="clearBoard">x</span>
      <div class="rule-title">活动规则</div>
      <div class="rule-body">
        <p>1.活动中一旦确认参与，即刻支付相关费用，支付完成后可以在2016年12月31日前依照需求，提前两天通过携车网微信公众号预约上门服务，服务完毕将获得价值<span class="yellow-font">百元礼品一份</span></p>
        <p>2.本活动所产生的所有服务不能兑现、不能邮寄、不能退换</p>
        <p>3.套餐中的机油为美孚提供的美孚速霸™2000半合成机油4L，如需升级必须选择美孚品牌内的高品质机油，并支付对应差价</p>
        <p>4.380元套餐费用中包含工时费和上门服务费</p>
        <p>5.1人礼包原价值为<span class="yellow-font">416元</span>；5人礼包原价值为<span class="yellow-font">634</span>元；9人礼包原价值为<span class="yellow-font">882</span>元；10人礼包原价值为<span class="yellow-font">1130</span>元，依照不同的参与人数，您只需花费<span class="yellow-font">380</span>元就可以获得对应的礼包</p>
        <p>6.组队成功后，每位成员均可享相应的套餐内容</p>
        <p>7.参团人数达到10人或开团时间结束即组队成功，自动将奖品发送至个人账户下”我的卡券”中</p>
        <p>8.携车上门服务范围包含11个城市：<span class="yellow-font">北京、上海、苏州、无锡、杭州、南京、济南、成都、深圳、福州、厦门</span></p>
        <p>9.客服咨询电话：400-002-6666</p>
        <p>10.活动周期：</p>
        <p>活动时间：2016年9月11日-10月31日</p>
        <p>使用有效期：截止到2016年12月31日</p>
        <p><span class="yellow-font">注：超过11月10日还未兑换，将视为用户放弃领取奖品</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearBoard () {
      this.$parent.ruleShow = false;
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
      top: 10%;
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
