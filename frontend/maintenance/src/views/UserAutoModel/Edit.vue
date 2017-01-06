<style lang="less">
  .xc-panel {
    padding: 0 15px;
    width: 100%;
    .xc-line-panel {
      box-sizing: border-box;
      margin-top: 12px;
      padding: 14px 15px;
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 48px;
      background-color: #ffffff;
      .xc-field-title {
        flex: none;
        width: 78px;
        text-align: left;
        line-height: 48px;

        i.iconfont {
          font-size: 16px;
        }
      }
      .xc-field-right {
        flex: 1;
        text-align: right;
      }
      .xc-model-km {
        margin-left: 4px;
        flex: none;
        width: 36px;
      }
      .xc-field-license {
        flex: none;
        min-width: 72px;
      }
      .xc-field-province {
        flex: 1;
        text-align: right;
        color: #44A7EF;
        &::active {
          background-color: #888888;
        }
      }
    }
  }
  
  .xc-province-panel {
    position: relative;
    width: 100%;
    height: 184px;
    background: #FFFFFF;
    .xc-province-item {
      position: relative;
      width: 12.5%;
      height: 46px;
      float: left;
      line-height: 46px;
      text-align: center;
      &:before {
        content: '';
        position: absolute;
        right: 0;
        background: #EAEAEA;
        width: 1px;
        height: 100%;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
      &:after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        background: #EAEAEA;
        width: 100%;
        height: 1px;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
    }
  }
  
  .xc-field-input {
    width: 100%;
    text-align: right;
    font-size: 16px;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
  }

  .xc-vin-img {
    width: 100%;
  }

  .xc-auto-model-container {
    .weui_dialog {
      background-color: none;
    }
  }

  .xc-panel-helper {
    margin-top: 15px;
    color: #ff5151;
    font-size: 14px;
  }

</style>

<template>
  <div class="xc-auto-model-container">
    <header-auto-model :can-change="true" @change-auto-model="changeAutoModel"></header-auto-model>

    <div class="xc-panel">
      <div class="xc-line-panel">
        <div class="xc-field-title">
          购车时间
        </div>
        <div class="xc-field-right">
            <group>
              <datetime title="" :value="regTime" :max-year="maxYear" @change="regTimeChange" year-row="{value}年" month-row="{value}月" format="YYYY-MM" cancel-text="取消", confirm-text="确认">{{ regTime }}</datetime>
            </group>
        </div>
      </div>
      <div class="xc-line-panel">
        <div class="xc-field-title">
          行驶里程
        </div>
        <div class="xc-field-right">
          <input type="text" class="xc-field-input" minLength="1" maxLength="8" placeholder="请输入" v-model="mileage">
        </div>
        <div class="xc-model-km">
          公里
        </div>
      </div>
      <div class="xc-line-panel">
        <div class="xc-field-title">
          车牌号
        </div>
        <div class="xc-filed-right xc-field-province" @click="show = !show">
          <span>{{ provinces[provinceId] || '沪' }}</span><i class="iconfont xc-field-province-icon">&#xe613;</i>
        </div>
        <div class="xc-field-license">
          <input type="text" class="xc-field-input xc-license-width" minLength="6" maxLength="6" size="6" :value="upperLicense" v-model="license"
            placeholder="请输入">
        </div>
      </div>
      <div class="xc-line-panel">
        <div class="xc-field-title">
          车架号 <i @click="vinNotice = true" class="iconfont">&#xe616;</i>
        </div>
        <div class="xc-field-right">
          <input type="text" class="xc-field-input" minLength="17" maxLength="17" size="17" :value="upperVin" v-model="vin" placeholder="请输入">
        </div>
      </div>

      <div class="xc-panel-helper">
        * 以上四项均为选填项
      </div>
    </div>
    <popup :show.sync="show">
      <div class="xc-province-panel">
        <div v-for="(k,item) in provinces" @click="selectProvince(k,item)" class="xc-province-item">{{item}}</div>
      </div>
    </popup>

    <dialog :show.sync="vinNotice" @click="vinNotice = !vinNotice" >
      <img class="xc-vin-img" src="../../assets/vin.png" alt="">
    </dialog>

    <div class="xc-group-footer">
      <a class="xc-group-footer-btn" @click="save">保存</a>
    </div>
  </div>
</template>

<script>
  import HeaderAutoModel from 'components/HeaderAutoModel';
  import Calendar from 'components/Calendar';
  import Datetime from 'components/Datetime';
  import Popup from 'vux-components/popup';
  import Dialog from 'vux-components/dialog';
  import { setUserAutoModel,pushLastPath,popLastPath,showToast,setOrderInfo } from 'actions'
  import moment from 'moment'

  export default {
    components: {
      HeaderAutoModel,
      Calendar,
      Datetime,
      Popup,
      Dialog
    },
    vuex: {
      actions: {
        setUserAutoModel,
        setOrderInfo,
        pushLastPath,
        popLastPath,
        showToast
      }
    },
    ready: function () {
      const self = this;
      this.$http({
        url: "/v2/areas/abbreviations?_format=json",
        method: "GET"
      }).then(
        function (res) {
          self.provinces = res.data.data;
        },
        function (err) {

        }
      );
      // 如果是新建页面，则忽略初始化信息
      if (self.$route.path.indexOf('new') >= 0) {
        return;
      }

      const initData = self.$store.state.userAutoModel;
      self.regTime = initData.reg_time.substr(0, 7);
      self.vin = initData.vin;
      self.mileage = initData.mileage;
      self.license = initData.license;
      self.provinceId = initData.province_id;
    },
    data: function () {
      return {
        regTime: "",
        vin: "",
        maxYear: (new Date()).getFullYear(),
        mileage: "",
        license: "",
        provinceId: 10,
        show: false,
        provinces: [],
        vinNotice: false
      }
    },
    watch: {
      regTime: function(newVal) {
        if (newVal == "") {
            return false;
        }

        if (moment().format("YYYY-MM-DD") <= newVal ) {
            this.showToast("您选择日期不正确");
            this.regTime = "";
            return false;
        }
      }
    },
    methods: {
      showVinNotice() {
        this.vinNotice =  true;
      },
      changeAutoModel() {
        this.pushLastPath(this.$route.path);
        this.$router.go({name: 'AutoModelList'});
      },
      selectProvince(k, item) {
        this.provinceId = k;
        this.show = false;
      },
      regTimeChange(val) {
          this.regTime = val;
      },
      save() {
        zhuge.track('微信维修厂', {
            'action': '编辑用户车型信息'
        })
        const self = this;
        const state = this.$store.state;

        let newAutoModel = {
          province_id: self.provinceId,
          license: self.license,
          vin: self.vin,
          reg_time: self.regTime,
          mileage: self.mileage
        };
        let postUrl = '/v2/user_auto_model/create';
        if (self.$route.params.userAutoModelId) {
          postUrl = '/v2/user_auto_model/edit';
          newAutoModel.user_auto_model_id = self.$route.params.userAutoModelId;
        }

        this.setUserAutoModel(newAutoModel);
        this.$http.post(postUrl, state.userAutoModel)
          .then(res => {
            if (res.data.status.code == 200) {
              self.setUserAutoModel({
                user_auto_model_id: res.data.data.id
              });
              self.setOrderInfo({
                user_auto_model_id: res.data.data.id
              });
              
              let lastPath = self.popLastPath();

              self.$router.go({path: lastPath ? lastPath : '/products' });
            } else {
              self.showToast(res.data.status.msg);
            }
          })
          .then(res => {

          });
      }
    },
    computed: {
      upperLicense: function () {
        return this.license.toUpperCase();
      },
      upperVin: function () {
        return this.vin.toUpperCase();
      },
    }
  }
</script>
