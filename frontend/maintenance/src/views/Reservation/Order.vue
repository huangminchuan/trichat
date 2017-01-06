<style>
    @import '~vux/dist/vux.css';
</style>

<template>
    <div>
        <service-factory></service-factory>

        <delivery-type 
            @go-select-user-address="goSelectAddress"
            :come-type.sync="come_type" 
            :contact.sync="contact" 
            :mobile.sync="mobile" 
            :remark.sync="remark" 
            :address.sync="address"
            :take-car-date.sync="take_car_date"
            :time-period.sync="take_car_time_period"
            >
        </delivery-type>

        <footer-total-price notice-text="支付金额以实际维修项目为准" :current-price="amount" next-step="立即预约" :market-price="marketPrice" @click="submit"></footer-total-price>
        <toast :show.sync="success" type="success">预约成功</toast>
    </div>
</template>

<script>

    import Datetime from 'vux-components/datetime'
    import ServiceFactory from 'components/ServiceFactory'
    import DeliveryType from 'components/DeliveryType'
    import FooterTotalPrice from 'components/FooterTotalPrice'
    import Toast from 'vux-components/Toast'
    import Loading from 'vux-components/loading'
    import { setOrderInfo,showToast,setLoading,pushLastPath } from 'actions'
    import moment from 'moment'

    export default {
        components: {
            Datetime,
            ServiceFactory,
            DeliveryType,
            FooterTotalPrice,
            Toast,
            Loading
        },
        ready() {
            zhuge.track('微信维修厂', {
                'page': '预约提交页面'
            })
            const state = this.$store.state;
            const self = this;
            this.come_type = state.orderInfo.come_type;
            this.take_car_date = state.orderInfo.take_car_date;
            this.contact = state.orderInfo.contact;
            this.mobile = state.orderInfo.mobile;
            this.address = state.orderInfo.address;
            this.time_period = state.orderInfo.time_period;

            let amount = 0.00;
            let marketPrice = 0.00;
            state.orderInfo.products.forEach(product => {
                amount += parseFloat(product.price);
                marketPrice += parseFloat(product.price);

                product.materials.forEach(material => {
                    amount += parseFloat(material.price);
                    marketPrice += parseFloat(material.market_price) ? parseFloat(material.market_price) : parseFloat(material.price);
                });
            });

            self.amount = amount.toFixed(2);
            self.marketPrice = marketPrice.toFixed(2);
        },
        data() {
            return {
                come_type: 1,
                take_car_date: "",
                take_car_address_id: "",
                contact: "",
                mobile: "",
                amount: "0.00",
                remark: "",
                address: "",
                marketPrice: "0.00",
                success: false,
                loading: false,
                take_car_time_period: 1
            }
        },
        vuex: {
            actions: {
                setOrderInfo,
                showToast,
                setLoading,
                pushLastPath
            }
        },
        watch: {
            come_type: function(newVal,oldVal) {
                let amount = parseFloat(this.amount);
                let marketPrice = parseFloat(this.marketPrice);
                if (oldVal == 1 && newVal == 2) {
                    amount += 139;
                    marketPrice += 139;
                } else if (oldVal == 2 && newVal == 1) {
                    amount -= 139;
                    marketPrice -= 139;
                }

                this.amount = amount.toFixed(2);
                this.marketPrice = marketPrice.toFixed(2);
            },
            take_car_date: function(newVal) {
                if (newVal == "") {
                    return false;
                }

                if (moment().format("YYYY-MM-DD") > newVal ) {
                    this.showToast("您选择日期不正确");
                    this.take_car_date = "";
                    return false;
                }
            }
        },
        methods: {
            goSelectAddress: function() {
                const self = this;
                this.setOrderInfo({
                    mobile: self.mobile,
                    contact: self.contact,
                    take_car_date: self.take_car_date,
                    leave_type: 1,
                    come_type: self.come_type,
                    take_car_time_period: self.take_car_time_period,
                    user_remark: self.remark
                });
                self.pushLastPath(self.$route.path);

            },
            submit: function() {
                const self = this;
                const state = self.$store.state;

                this.setOrderInfo({
                    mobile: self.mobile,
                    contact: self.contact,
                    take_car_date: self.take_car_date,
                    come_type: self.come_type,
                    user_remark: self.remark,
                    take_car_time_period: self.take_car_time_period
                });
                
                if (!state.orderInfo.take_car_date) {
                    self.showToast("请选择到店时间");
                    return false;
                }

                if (state.orderInfo.come_type == 2 && !state.orderInfo.take_car_address_id) {
                    self.showToast("请选择上门取车地址");
                    return false;
                }

                if (!state.orderInfo.contact) {
                    self.showToast("请填写联系人");
                    return false;
                }

                if (!state.orderInfo.mobile) {
                    self.showToast("请填写联系方式");
                    return false;
                }

                if (!state.orderInfo.user_auto_model_id) {
                    self.showToast("请选择用户车型");
                    return false;
                }
                this.setLoading(true);

                let prods = state.orderInfo.products;
                prods.push({
                    id:25
                });
                self.setOrderInfo({
                    products: prods
                });

                zhuge.track('微信维修厂', {
                    'page': '预约提交行为',
                })
                
                this.$http({
                    url: '/v2/new_maintenance/create',
                    data: self.$store.state.orderInfo,
                    method: 'POST'
                }).then(function(response) {
                    if (response.data.status.code == 200) {
                        self.setLoading(false);
                        self.success = true;
                        zhuge.track('微信维修厂', {
                            'page': '预约提交成功'
                        })
                        setTimeout(function(){
                            self.$router.go({ 
                                name:'detailReservation',
                                params: { reservationId: response.data.data.id}
                            });
                        }, 1000);
                        
                    } else {
                        zhuge.track('微信维修厂', {
                            'page': '预约提交失败',
                            'msg': response.data.status.msg
                        })
                        self.setLoading(false);
                        self.showToast(response.data.status.msg);
                    }
                }, function() {

                })
            }
        }
    }
</script>