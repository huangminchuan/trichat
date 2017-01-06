<style lang="scss" scoped>
.order-detail {
  display: flex;
  box-sizing: border-box;
  background-color: #fff;
  padding: 15px 15px;
  color: #888;
  font-size: 14px;
  .order-detail-content {
    width: 60%;
    & > div {
      margin-bottom: 3px;
    }
  }
  .order-sum {
    position: relative;
    width: 40%;
    font-size: 12px;
    color: #fff;
    text-align: right;
    .order-money {
      font-size: 16px;
      color: #44A7EF;
      text-align: right;
      margin-bottom: 5px;
    }
    .pay-status {
      position: absolute;
      display: inline-block;
      padding: 2px 4px;
      padding-left: 4px;
      padding-right: 4px !important;      
      top:26px;
      right: 0px;
      font-size: 12px;
      border-radius: 2px;
    }
    .unpay-status {
      background-color: #F1BB4F;
    }
    .payed-status {
      background-color: #6EBEF8;
    }
    .cancel-status {
      background-color: #C1C1C1;
    }
    .wait-status {
      background-color: #63D987;
    }
  }
}
.service-item {
  span {
    color: #888;
    font-size: 15px;
    &:first-child {
      font-size: 16px;
      color: #343434;
      margin-right: 8px;
    }
  }
}
.order-status {
  height: 48px;
  line-height: 48px;
  color: #44A7EF;
  font-size: 15px;
  background-color: #fff;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background: #dcdcdc;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .unpay-order {
    text-align: center;
  }
  .repayed-order {
    text-align: center;
  }
  .payed-order {
    display: flex;
    div {
      width: 125px;
      flex: 1 1 auto;
      text-align: center;
      position: relative;
      &:last-child {
        &:after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          background: #dcdcdc;
          width: 0px;
          height: 100%;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
      }
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        background: #dcdcdc;
        width: 1px;
        height: 100%;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
    }
  }
  .paying-status {;
    text-align: center;
    color: #44A7EF;
    height: 48px;
    line-height: 48px;
    font-size: 15px;

    div {
      width: 50%;
      text-align: center;
      &:first-child {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          background: #dcdcdc;
          width: 1px;
          height: 100%;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
      }
    }
  }
}
.order-item {
  margin-bottom: 10px;
  display: block;
  &:last-child {
    margin-bottom: 0;
  }
}
.order-time {
  position: relative;
  top: -3px;
}
.hide {
  display: none!important;
}
.xc-period-icon {
  color:  #888888;
  font-size: 16px;
  margin-right: 6px;
}
</style>

<template>
    <div v-if="!$store.state.loading">
      <header-nav></header-nav>
      <div v-if="reservations.length > 0">
        <component class="order-item" v-for="reservation in reservations">
          <reservation-list-model 
            :logo="reservation.user_auto_model.auto_model.logo"
            :series-name="reservation.user_auto_model.auto_model.brand_name + reservation.user_auto_model.auto_model.series_name"
            :model-name="reservation.user_auto_model.auto_model.model_name"></reservation-list-model>
          <div class="order-detail">
            <div class="order-detail-content">
              <div class="service-item">
                <span>{{ firstProduct(reservation) }}</span>
              </div>
              <div class="order-time">......</div>
              <div class="order-address"><i class="iconfont xc-period-icon">&#xe60d;</i>{{ getMoment(reservation) }}</div>
            </div>
            <div class="order-sum">
              <div class="order-money">¥{{reservation.price}}</div>
              <span class="pay-status" :class="{'unpay-status':reservation.status != 4,'payed-status':reservation.status == 4}">
                {{ reservation.status_string }}<span v-if="reservation.status != 4">({{ reservation.pay_status_string }})</span> 
                </span>
            </div>
          </div>
          <div class="order-status">
            <div class="unpay-order hide">
              去支付
            </div>
            <div class="payed-order hide">
              <div>联系技师</div>
              <div>联系客服</div>
              <div>去评价</div>
            </div>
            <div class="repayed-order hide">
              重新预约
            </div>
            <div class="paying-status" v-link="{name:'detailReservation',params:{reservationId:reservation.id}}">
              查看详情
            </div>
          </div>
        </component>
      </div>
    
      <div v-else style="text-align:center;">
          您目前没有预约信息.
      </div>
    </div>
</template>

<script>
  import HeaderNav from 'components/HeaderNav.vue';
  import ReservationListModel from 'components/ReservationListModel'
  import moment from 'moment'
  import {
      setLoading
  } from 'actions'

  export default {
    ready() {
      const self = this;
      self.setLoading(true)
      self.$http.get('/v2/new_maintenance/list?_format=json')
        .then(res => {
          self.setLoading(false)
          if (res.data.status.code == 200) {
            self.reservations = res.data.data;
          }
        }, res => {
          self.setLoading(false)
        })
        
    },
    data: function(){
      return {
        reservations: []
      }
    },
    components: {
      ReservationListModel,
      HeaderNav
    },
    methods: {
      getMoment(reservation) {
          moment.locale('zh-cn');
          let period = "";
          if (typeof (reservation.take_car_time_period_string) != 'undefined' && reservation.take_car_time_period_string != '未知') {
            period = reservation.take_car_time_period_string;
          } 
          return moment(reservation.take_car_date, 'YYYY-MM-DD HH:mm').format('YYYY.MM.DD(ddd)') + ' ' + period;
      },
      firstProduct(reservation) {
          let product = ''
          if (reservation.products.length > 0) {
              product = reservation.products[0].name
          } else {
            product = reservation.auto_fault_items[0].cat_name
          }

          return product
      }
    },
    events: {
      changeNav(val) {
        
      }
    },
    vuex: {
      actions: {
        setLoading
      }
    }
  }
</script>
