<template lang="html">
  <div id="phone">
    <div class="_line-form header-tip _text_center" style="background-color:#4180ec">
        <div class="_line-sm-height _text_center _font-white">
            <span>请使用手机号登陆</span>
        </div>
    </div>
    <div class="_line-form">
        <div class="_line-content min-border">
            <div class=" _line-value">
                <input type="tel" id="imgnumber" placeholder="请输入右侧图形验证码" style="outline:none;">
            </div>
            <div class="_text_center _line-title" @click="getnumberimg">
                <img id="getimg" :src="codeImg" width="74" height="32">
            </div>
        </div>
        <div class="_line-content min-border">
            <div class=" _line-value">
                <input type="tel" id="phonenumber" placeholder="请输入手机号" style="outline:none">
            </div>
            <div class="_text_center _line-title" @click="getNumber">
                <button class="btn" id="getNumber" type="button" style="background-color:#56AFF0!important;">获取验证码</button>
            </div>
        </div>

        <div class="_line-content min-large-border">
            <div class="text-right _line-value">
                <input type="tel"  id="identidifycode" placeholder="请输入验证码" style="outline:none">
            </div>
        </div>
    </div>
    <div class="_text_center" style="margin-right: 0;">
        <button class="btn but-md" @click="login" id="confirm" type="button" style="outline:none;border:none;font-size:16px;background-color:#56AFF0!important;">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      codeImg: '',
      xcMobile : window.xc_mobil_config,
    }
  },
  computed: {},
  ready: function () {
    $('body').addClass('none-background');
    this.$http.get('/v2/user/verify/captcha_img').then(
      function (response) {
      this.codeImg = response.url;
    },function (response) {
      console.log(response)
    });
  },
  attached: function () {},
  methods: {
    getnumberimg: function () {
      this.$http.get('/v2/user/verify/captcha_img').then(
        function (response) {
        this.codeImg = response.url + "?v=" + parseInt( 1000 * Math.random() );
      },function (response) {
        console.log(response)
      });
    },
    setTime:function(time){
        var self = this;
        var flag =1;
        var button = $("#getNumber");
        if(time == 0){
            flag = 1;
            button.html("获取验证码");
            button.removeAttr("disabled","false").removeClass("but-default").addClass("btn");
            time = 60;
        }else{
            flag = 0;
            button.html("已发送"+time+"s");
            button.addClass("but-default").attr("disabled","true");
            time --;
            setTimeout(function(){
                self.setTime(time);
            },1000);
        }
        return flag;
    },
    getNumber: function () {
      this.$http.post('/v2/user/check/captcha',{'mobile': $('#phonenumber').val() ,'captcha': $('#imgnumber').val() }).then(
        function (response) {

          let responseData = response.data;
          if (typeof responseData === 'string') {
            responseData = JSON.parse(responseData);
          }

        if (responseData.status.code == 200) {
          $('#getNumber').css('background-color','#D7D7D7!important');
          var time=60;
          var flag = this.setTime(time);
          if(flag) {
              this.model.getIdentidifyCode($("#phonenumber").val(),$("#imgnumber").val());
          }
        } else {
          alert(responseData.status.msg);
        }
      },function (response) {
        console.log(response);
      });
    },
    login: function () {
      this.$http.post('/v2/user/check/verification_code',{'mobile': $('#phonenumber').val(),'code': $('#identidifycode').val(), 'is_login': true}).then(
        function (response) {

          let responseData = response.data;
          if (typeof responseData === 'string') {
            responseData = JSON.parse(responseData);
          }

        if (responseData.status.code == 200) {
          var currentHost = 'http://' + window.location.host;
          var random = parseInt( Math.random() * 100 );
          window.location.href = currentHost + '/wx/mobil_promotion_2?id=' + window.xc_mobil_config.id + '&v=' + random + '#!/pay';
        } else {
          alert(responseData.status.msg);
        }
      }, function (response) {
        console.log(response);
      });
    }
  },
  components: {}
}
</script>

<style lang="scss">
._line-form {
  background-color: #fff;
  margin-bottom: 10px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}
.re-line-form {
  background-color: #fff;
  margin-bottom: 10px;
  width: 100%;
}
.re-line-form span {
  font-size: 16px;
  color: #b1b8c3;
}
.re-line-form i {
  color: #b1b8c3;
}
.re-line {
  padding-left: 20px;
}
._line-content {
  height: 55px;
  width: 100%;
  line-height: 50px;
}
._line-content i {
  line-height: 50px !important;
}
.re-line-content {
  padding-right: 20px;
}
._line-min-content {
  height: 40px;
  border: 1px solid #dfdfdf;
  width: 100%;
}
._line-min-line {
  height: 40px;
  padding: 10px;
}
._line-min {
  display: inline;
  float: left;
  text-align: center;
}
.re-line-icon {
  display: inline;
  float: left;
}
.re-line-icon img {
  width: 30px;
}
._line-icon {
  width: 10%;
  display: inline;
  float: left;
}
.re-line-title {
  width: 3%;
  display: inline;
  float: left;
}
.re-line-title img {
  width: 10px;
}
._line-title {
  width: 26%;
  display: inline;
  float: left;
}
.re-line-value {
  width: 85%;
  padding-left: 14px;
  display: inline;
  float: left;
}
._line-value {
  width: 62%;
  display: inline;
  float: left;
  color: #95979d;
}
._slide_head {
  background-color: #63A0D4;
  height: 55px;
  color: #FBF8F8;
}
._data_list {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #dfdfdf;
  font-size: 16px;
  color: #333;
}
._data_list a {
  padding: 5px !important;
  padding-left: 10px !important;
}
._new_series_list {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #dfdfdf;
  font-size: 16px;
  color: grey;
}
._new_series_list a {
  padding: 5px !important;
  padding-left: 10px !important;
}
.new-auto-model-list {
  height: 50px;
  border-bottom: 1px solid #dfdfdf;
  font-size: 12px;
  color: #333;
  padding: 5px !important;
  padding-left: 10px !important;
}
._foot {
  height: 55px;
  width: 100%;
  bottom: 0;
  position: fixed;
  background-color: #fff;
  border-top: 1px solid #e7ebf0;
}
._foot span {
  padding-left: 15px;
  width: 60%;
  font-size: 14px;
  color: #848c99;
  float: left;
  text-decoration: line-through;
}
._foot label {
  padding-left: 15px;
  width: 60%;
  float: left;
  color: #4180ec;
  font-size: 16px;
}
._foot ._blue-back {
  right: 0;
  bottom: 0;
  height: 55px;
  line-height: 55px;
  text-align: center;
  width: 40%;
  position: fixed;
  color: #fff;
  background-color: #4180ec;
}
._slide-week-body {
  overflow-x: auto !important;
  height: 48px;
  width: 100%;
}
._slide-week-body ._slide-week-line {
  width: 560px;
  height: 48px;
  position: relative;
  overflow: auto;
  background-color: #eeeff3;
  color: #4180ec;
}
._slide-week-body ._slide-week-line ._slide-week {
  padding-top: 4px;
  height: 48px;
  width: 80px;
  border-right: 1px solid #dfdfdf;
  float: left;
  text-align: center;
}
._slide-week-body ._slide-week-line ._slide-week span {
  height: 20px;
  width: 80px;
}
._slide-week-select {
  color: #fff !important;
  background-color: #4180ec;
  border: 1px solid #4180ec;
}
._time-panel {
  margin-top: 20px;
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  overflow: auto;
}
._busy-remark {
  width: 25px;
  height: 15px;
  position: absolute;
  margin-left: 30%;
  margin-top: -5px;
  z-index: 300;
  border-radius: 2px;
  background-color: red;
  color: #fff;
  text-align: center;
}
._discount-remark {
  width: 25px;
  height: 15px;
  position: absolute;
  margin-left: 30%;
  margin-top: -5px;
  z-index: 300;
  border-radius: 2px;
  background-color: #4180ec;
  color: #fff;
  text-align: center;
}
._panel-logo-content {
  height: 125px;
  width: 100%;
  padding: 14px;
}
._panel-logo-content ._logo-panel {
  height: 100px;
  width: 33%;
  float: left;
  text-align: center;
}
._panel-center {
  padding: 14px;
  width: 100%;
  overflow: auto;
}
._panel-center ._panel-content {
  width: 50%;
  height: 50px;
  float: left;
  margin-bottom: 14px;
}
._modal-line {
  width: 100%;
  min-height: 40px;
  margin-bottom: 10px;
}
._line-in {
  float: left;
  display: inline;
}
._width-three {
  width: 33%;
  text-align: center;
}
._slide-part {
  color: #4180ec;
  border-bottom: 2px solid #4180ec;
}
._notify-black {
  width: 100%;
  height: 50px;
  line-height: 50px;
  opacity: 0.5;
  position: fixed;
  background: black;
  top: -50px;
  animation: note 4s;
  color: #ffffff;
  text-align: center;
  z-index: 999;
  -webkit-animation-name: note;
  -webkit-animation-duration: 4s;
}
@keyframes note {
  0% {
    background: black;
    left: 0px;
    top: -100px;
  }
  25% {
    background: black;
    left: 0px;
    top: 0px;
  }
  75% {
    background: black;
    left: 0px;
    top: 0px;
  }
  100% {
    background: black;
    left: 0px;
    top: -100px;
  }
}
@-moz-keyframes note {
  /* Firefox */
  0% {
    background: black;
    left: 0px;
    top: -100px;
  }
  25% {
    background: black;
    left: 0px;
    top: 0px;
  }
  75% {
    background: black;
    left: 0px;
    top: 0px;
  }
  100% {
    background: black;
    left: 0px;
    top: -100px;
  }
}
@-webkit-keyframes note {
  /* Safari and Chrome */
  0% {
    background: black;
    left: 0px;
    top: -100px;
  }
  25% {
    background: black;
    left: 0px;
    top: 0px;
  }
  75% {
    background: black;
    left: 0px;
    top: 0px;
  }
  100% {
    background: black;
    left: 0px;
    top: -100px;
  }
}
@-o-keyframes note {
  /* Opera */
  0% {
    background: black;
    left: 0px;
    top: -100px;
  }
  25% {
    background: black;
    left: 0px;
    top: 0px;
  }
  75% {
    background: black;
    left: 0px;
    top: 0px;
  }
  100% {
    background: black;
    left: 0px;
    top: -100px;
  }
}
.line_bak {
  height: 35px;
  line-height: 35px;
  text-align: center;
}
@media only screen and (max-height: 736px) {
  .xc-auto-key {
    position: fixed;
    right: 15px;
    top: 10%;
    width: 10px;
    height: auto;
    z-index: 10;
  }
  .xc-auto-key .word {
    height: 21px;
    color: #4180ec !important;
    font-size: 13px;
  }
}
@media only screen and (min-height: 737px) {
  .xc-auto-key {
    position: fixed;
    right: 15px;
    top: 10%;
    width: 10px;
    height: auto;
    z-index: 10;
  }
  .xc-auto-key .word {
    height: 30px;
    color: #4180ec !important;
    font-size: 15px;
  }
}
.xc-series-content {
  padding-left: 20px;
  color: #b4b4b4;
  display: none;
  margin: 0;
}
.auto-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 20;
}
.auto-model {
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  background-color: #fff;
  display: none;
  overflow: auto;
  z-index: 30;
}
.auto-model .head-title {
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background-color: #4180ec;
  padding-left: 15px;
  text-align: center;
}
.auto-model .model-content {
  height: 100%;
  padding-top: 50px;
  right: 0;
}
.auto-model .model-content ._line-min-line {
  background-color: #f2f2f2;
}
.auto-model .model-content ._line-content {
  line-height: 24px;
  display: table;
}
.auto-model .model-content ._line-content div {
  vertical-align: middle;
  display: table-cell;
}
.gray-content {
  height: 34px;
  line-height: 34px;
  width: 100%;
  background-color: #f1f2f6;
  border-radius: 5px;
  padding-left: 5px;
}
.gray-content .xc-word {
  width: 85%;
  padding-left: 15px;
  font-size: 16px;
  color: #b1b8c3;
}
.gray-content .xc-word input[type='text'] {
  background-color: rgba(241, 242, 246, 0);
  font-size: 16px;
  color: #b2b8c2;
  line-height: 34px;
}
.gray-content .xc-word input::-webkit-input-placeholder {
  color: #b2b8c2;
}
@media only screen and (max-width: 414px) {
  .index-slide-button {
    z-index: 1000;
    position: absolute;
    top: 145px;
    left: 50%;
    margin-left: -17px;
  }
}
@media only screen and (min-width: 415px) {
  .index-slide-button {
    z-index: 1000;
    position: absolute;
    top: 315px;
    left: 50%;
    margin-left: -17px;
  }
}
.pay-btn {
  width: 100px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #848c99;
  margin: 0px 5px 0px 5px;
  position: relative;
}
.pay-btn img {
  display: none;
  vertical-align: inherit;
  margin-left: 77%;
  margin-bottom: -2px;
  position: absolute;
  right: 0;
  bottom: 1px;
}
.pay-btn span {
  color: #848c99;
  font-size: 13px;
}
.pay-selected-btn {
  border: 1px solid #4180ec;
}
.pay-selected-btn img {
  display: block;
}
.pay-selected-btn span {
  color: #4180ec;
}
.body-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 20;
}
.mask-box {
  display: none;
  position: fixed;
  width: 70%;
  height: 500px;
  top: 20%;
  left: 15%;
  z-index: 30;
}
.mask-box .mask-img {
  position: relative;
  width: 100%;
}
.mask-box .mask-time {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.15);
  color: #ffffff;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  text-align: center;
}
.mask-box .mask-close {
  position: absolute;
  right: 10px;
  top: -35px;
  width: 20px;
}
.mask-content {
  display: none;
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 150px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  text-align: center;
  background-color: #ffffff;
  z-index: 40;
}
.mask-content .mask-container {
  height: 99px;
  line-height: 30px;
  padding: 12px;
  border-bottom: 1px solid #dddddd;
}
.mask-content .mask-footer {
  height: 50px;
  padding: 5px;
  line-height: 40px;
}
.mask-content .mask-footer div {
  width: 50%;
  text-align: center;
}
.btn {
  background-color: #4180ec !important;
  color: #fff !important;
}
.but-xs {
  width: 80px;
  height: 30px;
  font-size: 12px;
}
.but-sm {
  width: 150px;
  height: 35px;
}
.but-md {
  width: 255px;
  height: 42px;
}
.but-default {
  background-color: #dfdfdf !important;
}
.but-white {
  background-color: #fff !important;
  border: 1px solid #dfdfdf !important;
  color: #333348 !important;
}
.but-cancel-white {
  background-color: #fff !important;
  border: 1px solid #dfdfdf !important;
  color: #95979d !important;
}
.but-blue {
  background-color: #fff !important;
  border: 1px solid #4180ec !important;
  color: #4180ec !important;
}
.but-green {
  background-color: #7be48f !important;
  border: 1px solid #7be48f !important;
  color: #fff !important;
}
.but-info {
  background-color: #4180ec !important;
  border: 1px solid #4180ec !important;
  color: #fff !important;
}
body {
  font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3";
  font-size: 14px !important;
  color: #333348;
  background-color: transparent;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}
a {
  color: #333348;
  text-decoration: none;
  cursor: pointer;
}
a:hover,
a:focus {
  color: #333348;
  text-decoration: none;
}
input[type='tel'] {
  width: 100%;
  border: none;
  height: 36px;
  font-size: 14px;
  line-height: 44px;
}
input[type="search"] {
  border-radius: 5px;
  border: 1px solid #aaa;
  height: 35px;
  line-height: 35px;
}
ul {
  list-style-type: none;
}
ul li {
  width: 100%;
}
input[type='text'] {
  width: 100%;
  border: none;
  height: 36px;
  font-size: 14px;
  line-height: 44px;
}
select {
  -webkit-box-shadow: none !important;
  color: #b4b4b4 !important;
  border: none !important;
  border-color: #fff;
  background-color: #fff !important;
  background: #fff;
  -webkit-transition: none !important;
  background: -webkit-linear-gradient(top, #000, #000);
  -webkit-background-clip: text;
}
._text_center {
  text-align: center;
  margin-right: 15px;
}
._text-right {
  text-align: right;
}
._font-lg {
  font-size: 18px !important;
}
._font-md {
  font-size: 16px !important;
}
._font-sm {
  font-size: 14px !important;
}
._font-xs {
  font-size: 12px !important;
}
._font-mini {
  font-size: 10px !important;
}
._font-default {
  color: #b4b4b4;
}
._font-info {
  color: #4180ec;
}
._font-white {
  color: #fff;
}
._font-red {
  color: #ed462f !important;
}
._font-black {
  color: #333348;
}
._margin-bottom-65 {
  margin-bottom: 65px;
}
._margin-top-45 {
  margin-top: 45px;
}
._margin-top-25 {
  margin-top: 25px;
}
._border-line {
  border-bottom: 1px solid #dfdfdf;
}
._border-top-line {
  border-top: 1px solid #dfdfdf;
}
._right-line {
  border-right: 1px solid #dfdfdf;
}
._line-lg-height {
  height: 70px;
  line-height: 70px;
}
._line-md-height {
  height: 40px;
  line-height: 40px;
}
._line-sm-height {
  height: 35px;
  line-height: 35px;
}
@media only screen and (min-width: 415px) {
  ._line-max-height {
    height: 340px;
    width: 100%;
  }
}
@media only screen and (max-width: 414px) {
  ._line-max-height {
    height: 170px;
    width: 100%;
  }
}
._padding-left-lg {
  padding-left: 15px ;
}
._padding-left-md {
  padding-left: 10px;
}
._padding-left-sm {
  padding-left: 5px;
}
._padding-right-lg {
  padding-right: 15px;
}
._padding-right-md {
  padding-right: 10px;
}
._padding-right-sm {
  padding-right: 5px;
}
._selected {
  background-color: #4180ec;
}
._gray_background {
  background-color: #95979d !important;
}
.positoin-fix {
  position: fixed;
}
#phone {
  height: 100%;
}
#phone .header-tip {
  background-color: #56AFF0!important;
  height: 33px;
  line-height: 33px;
  padding-left: 0px;
}
#phone ._line-content .btn {
  padding: 0;
  width: 74px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: none;
}
#phone .min-border {
  position: relative;
}
#phone .min-border:after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #dcdcdc;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
#phone .min-large-border {
  position: relative;
}
#phone .min-large-border:after {
  position: absolute;
  content: '';
  bottom: -1px;
  left: -20px;
  width: 105%;
  height: 1px;
  background: #dcdcdc;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
#phone ._line-sm-height .tip {
  font-family: "iconfont";
  font-size: 16px;
  font-style: normal;
}
#phone ._line-form {
  padding-right: 0;
  margin-bottom: 10px;
  box-sizing: border-box;
}
#phone ._line-form ._line-value {
  width: 70%;
  height: 48px;
  position: relative;
  text-align: left;
}
#phone ._line-form ._line-value input {
  padding: 0;
  height: 47px;
  line-height: normal;
  vertical-align: middle;
  font-size: 14px;
  text-indent: 10px;
  color: #343434!important;
}
#phone ._line-form ._line-value .img-icon,
#phone ._line-form ._line-value .key-icon,
#phone ._line-form ._line-value .phone-icon {
  font-family: "iconfont";
  font-size: 21px;
  font-style: normal;
  position: absolute;
  top: 12px;
  left: 0;
  line-height: normal;
}
#phone ._line-form ._line-value .shortcut {
  font-family: "iconfont";
  font-size: 12px;
  font-style: normal;
  position: absolute;
  right: 0;
  top: 3px;
  width: 30px;
  text-align: right;
}
#phone ._line-form ._line-title {
  width: auto;
  height: 55px;
  float: right;
  display: flex;
  align-items: center;
}
#phone ._line-form ._line-title .btn {
  font-size: 12px;
  background-color: #44A7EF!important;
}
#phone .but-md {
  width: 92%;
  background-color: #44A7EF!important;
  margin-top: 5px;
}
#phone button[disabled] {
  background-color: #D7D7D7!important;
}
#phone ._line-form ._line-title .btn[disabled] {
  background-color: #D7D7D7!important;
}
</style>
