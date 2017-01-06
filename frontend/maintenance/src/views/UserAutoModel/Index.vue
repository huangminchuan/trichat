<style lang="less" scoped >
    @import '~vux/dist/vux.css';
    .xc-line-panel{
      background-color:#fff;
      height:48px;
      margin:15px 15px 0px 15px;
      line-height:48px;
      padding:0px 15px 0px 15px;
      color:#343434;
      font-size:16px;
      display: flex;
      flex-direction:row;
    }
    .xc-left-panel{
      flex:1;
    }
    .xc-right-panel{
      flex:3;
      text-align:right;
      input{
        height:48px;
        text-align:right !important;
      }
      input::-webkit-input-placeholder{
        text-align: right;
      }
    }
    .iconfont{
      font-size:14px;
      color:#888888;
    }
    .province_panel{
      display: flex;
      flex-wrap: wrap;
    }
    .province_item{
      flex:0 0 12.5%;
      height:46px;
      border-bottom: 1px solid #d8d8d8;
      border-right: 1px solid #d8d8d8;
      line-height:46px;
      text-align:center;

    }
    .xc-right-panel {
        .weui_cell{
          padding:0 !important;
          float: right;
        }
      }
</style>

<template>

  <div>
    <header-auto-model></header-auto-model>
    <div class="xc-line-panel">
      <div class="xc-left-panel">购车时间</div>
      <div class="xc-right-panel">
        <Calendar :title="''" :value.sync="buyTime"></Calendar>
      </div>
    </div>
    <div class="xc-line-panel">
      <div class="xc-left-panel">行驶里程</div>
      <div class="xc-right-panel">
        <input type="tel" :option.sync="mileage" placeholder="请填写"><span>公里</span>
      </div>
    </div>
    <div class="xc-line-panel">
      <div class="xc-left-panel">车牌号</div>
      <div class="xc-right-panel">
        <span @click="show=true">{{ province }}</span><input type="tel" style="width: 100px;" :option.sync="code" placeholder="请填写">
      </div>
    </div>
    <div class="xc-line-panel">
      <div class="xc-left-panel">车架号</div>
      <div class="xc-right-panel">
        <input type="tel" :option.sync="vin" placeholder="请输入">
      </div>

    </div>
    <div class="xc-group-footer">
      <a class="xc-group-footer-btn" @click="save">保存</a>
    </div>

    <self-action-sheet :show.sync='show'>
      <div class="province_panel">
          <div v-for= "(k,item) in provinces" @click="selectProvince(k,item)" class="province_item">{{item}}</div>
      </div>
    </self-action-sheet>

  </div>
</template>

<script>
    import HeaderAutoModel from 'components/HeaderAutoModel'
    import SelfActionSheet from 'components/SelfActionSheet'
    import Calendar from 'vux-components/Calendar'
    export default {
        data() {
          return {
            show:false,
            provinces:Object,
            province:"京",
            provinceId:String,
            buyTime: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate(),
            code:String,
            vin:String,
            mileage:String
          }
        },
        components:{
          HeaderAutoModel,
          SelfActionSheet,
          Calendar
        },
        methods:{
          selectProvince ( key,item ){
            this.province = item;
            this.provinceId = key;
          },
          save (){
            this.$router.go({name:'AutoList'});
          }
        },
        ready() {
          zhuge.track('微信维修厂', {
              'page': '用户车型列表'
          })
          const self = this;
          this.$http({
            url: "/v2/areas/abbreviations?_format=json",
            method: "GET"
          }).then(
            function(res) {
              self.provinces = res.data.data ;
            },
            function(err) {

            }
          );
        }
    }
</script>
