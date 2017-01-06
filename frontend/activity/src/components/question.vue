<template>
  <div id="question">
    <div class="board" @click="clearBoard"></div>
    <div class="correct" v-if="trueAlert">回答正确</div>
    <div class="error" v-if="falseAlert">回答错误</div>
    <div class="two-question">
      <div class="question-header">携车网的logo长得像哪种动物？</div>
      <img class="question-bg" src="/bundles/app/activity_mobil/question_icon.png"/>
      <span class="question-tip">＊回答正确即可进行闯关</span>
      <div class="question-solution">
        <div class="solution" @click="trueAnswer">
          <span>1.螃蟹</span>
          <img v-if="false" class="hook" src="/bundles/app/activity_mobil/right_hook.png"/>
        </div>
        <div class="solution" @click="errorAnswer">
          <span>2.龙虾</span>
          <img v-if="false" class="hook" src="/bundles/app/activity_mobil/right_hook.png"/>
        </div>
        <div class="solution" @click="errorAnswer">
          <span>3.扇贝</span>
          <img v-if="false" class="hook" src="/bundles/app/activity_mobil/right_hook.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      trueAlert: false,
      falseAlert: false,
      xcMobilOil : window.xc_mobil_config
    }
  },
  props: ['isFirst'],
  methods: {
    clearBoard () {
      this.$parent.quShow = false
    },
    trueAnswer () {
      if ( this.isFirst == 0 ) {
        this.trueAlert = true;
        this.isFirst ++;
        this.$http.post('/v2/mobil_promotion/add',{user_promotion_id: this.xcMobilOil.id}).then(
          function (response) {

            let responseData = response.data;
            if (typeof responseData === 'string') {
              responseData = JSON.parse(responseData);
            }

          if ( responseData.status.code == 200 ) {
            alert(responseData.status.msg);
          } else {
            alert(responseData.status.msg);
          }
        }, function (response) {
        });
        setTimeout(() => {
          this.$parent.quShow = false;
          this.$parent.xcMobilOil ++;
        },1000);
      }
    },
    errorAnswer () {
      this.falseAlert = true;
      setTimeout(() => {
        this.falseAlert = false;
      },1000);
    }
  }
}
</script>

<style lang="scss">
  #question {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .two-question {
      border-radius: 6px;
      position: relative;
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 14px;
      background-color: #fff;
      width: 75%;
      z-index: 11;
      .question-header {
        height: 22px;
        line-height: 22px;
        font-size: 15px;
        color: #343434;
        margin-bottom: 14px;
        text-align: left;
      }
      .question-bg {
        width: 100%;
        margin-bottom: 11px;
      }
      .question-tip {
        display: block;
        height: 22px;
        line-height: 22px;
        font-size: 13px;
        color: #FF4747;
      }
    }
    .question-solution {
      .solution {
        display: flex;
        width: 100%;
        height: 60px;
        align-items: center;
        position: relative;
        &:after {
          position: absolute;
          content: '';
          bottom:0;
          left: 0;
          width: 215%;
          height: 1px;
          background: #EFEFEF;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          opacity: .8;
        }
        &:last-child {
          &:after {
            height: 0;
          }
        }
        span {
          color: #343434;
          font-size: 15px;
          margin-right: 15px
        }
        img {
          width: 25px;
          height: 25px;
        }
        .hook {
          width: 21px;
          height: 14px;
          position: absolute;
          right: 20px;
        }
      }
    }
    .correct {
      position: fixed;
      top: 60%;
      left: 33%;
      z-index: 12;
      width: 34%;
      background-color: rgba(40,40,40,.75);
      text-align: center;
      height: 50px;
      line-height: 50px;
      color: #FFFFFF;
      font-size: 16px;
      border-radius: 5px;
    }
    .error {
      position: fixed;
      top: 60%;
      left: 33%;
      z-index: 12;
      width: 34%;
      background-color: rgba(40,40,40,.75);
      text-align: center;
      height: 50px;
      line-height: 50px;
      color: #FFFFFF;
      font-size: 16px;
      border-radius: 5px;
    }
  }
</style>
