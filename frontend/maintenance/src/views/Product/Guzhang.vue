<style lang="less" scoped>
    .xc-fault-items-panel {
        margin-top: 10px;
        margin-bottom: 10px;
        position: relative;
        background-color: #FFFFFF;

        .xc-fault-items-title {
            position: relative;
            padding-left: 15px;
            height: 52px;
            line-height: 52px;
        }

        .xc-fault-items-body {
            position: relative;
            padding-left: 15px;

            .xc-fault-item {
                position: relative;
                height: 60px;
                line-height: 60px;

                .xc-fault-item-name {
                    display: inline-block;
                    position: relative;
                    float: left;
                    top: 0px;
                    left: 0px;
                    height: 60px;
                }

                .xc-fault-item-children {
                    display: inline-block;
                    width: 72%;
                    height: 60px;
                    -o-text-overflow: ellipsis;/*兼容opera*/
                    text-overflow: ellipsis;/*这就是省略号喽*/		  
                    overflow: hidden;/*设置超过的隐藏*/
                    white-space: nowrap;/*设置不折行*/
                    margin-left: 10px;
                    font-size: 15px;
                    color: #888888;
                }

                .xc-right-icon {
                    display: inline-block;
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    padding-right: 15px;
                    line-height: 60px;
                    height: 60px; 
                    
                    .iconfont {
                        font-size: 14px;
                        color: #888888;
                    }
                }
            }
        }
    }
</style>

<template>
    <div>
        <header-auto-model :can-change="true"></header-auto-model>

        <div class="xc-fault-items-panel">
            <div class="xc-fault-items-title">
                故障类型
            </div>
            <div class="xc-fault-items-body">
                <div class="xc-fault-item xc-1px-top" 
                     v-for="item in $store.state.faultItems"
                     @click="editItem(item.cat_id)">
                    <div class="xc-fault-item-name">
                        {{ item.cat_name }}
                    </div>
                    <div class="xc-fault-item-children">
                        <span>{{ item.full_name }}</span>
                    </div>
                    <div class="xc-right-icon">
                        <i class="iconfont xc-change-icon">&#xe607;</i>
                    </div>
                </div>

                <div class="xc-fault-item xc-add-fault-item xc-1px-top" @click="addFaultItem">
                    <i class="iconfont">&#xe602;</i>
                    添加汽车故障项
                </div>
            </div>
        </div>

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

        <div class="xc-group-footer">
            <a class="xc-group-footer-btn xc-group-footer-confirm" @click="save">立即预约</a>
        </div>

        <popup :show.sync="showUserModels">
            <user-auto-models :show.sync="showUserModels"></user-auto-models>
        </popup>
    </div>
</template>

<script>
    import HeaderAutoModel from 'components/HeaderAutoModel'
    import UserAutoModels from 'components/UserAutoModels'
    import ServiceFactory from 'components/ServiceFactory'
    import DeliveryType from 'components/DeliveryType'
    import FooterTotalPrice from 'components/FooterTotalPrice'
    import { 
        setOrderInfo,
        setLoading,
        showToast,
        setUserAutoModels,
        pushLastPath
    } from 'actions'
    import Popup from 'vux-components/popup'

    export default {
        data: function() {
            return {
                showUserModels: false,
                faultItems:[],
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
        ready() {
            // zhuge.track('微信维修厂', {
            //     'page': '故障维修页面'
            // })
            const self = this;
            const state = this.$store.state;
            self.faultItems = state.faultItems;
            this.come_type = state.orderInfo.come_type || 1;
            this.take_car_date = state.orderInfo.take_car_date || "";
            this.contact = state.orderInfo.contact;
            this.mobile = state.orderInfo.mobile;
            this.address = state.orderInfo.address;
            this.time_period = state.orderInfo.time_period || "";

            if (state.userAutoModel.user_auto_model_id == 0) {
                this.setLoading(true);
                
                this.$http.get('/v2/user_auto_modellist', {'latest':1})
                    .then(res => {
                        self.setLoading(false);
                        if (res.data.status.code == 200 && res.data.data.length == 0) {
                            self.pushLastPath(self.$route.path);
                            self.showUserModels = true;
                        } else if (res.data.status.code == 200) {
                            self.setUserAutoModels(res.data.data);
                            if (!state.orderInfo.user_auto_model_id) {
                                self.showUserModels = true;
                            } else {
                                self.showUserModels = false;
                            }
                            
                        } else {
                            self.showToast(res.data.status.msg);
                            window.location = '/wx/index';
                        }
                    })
                    .then(res => {

                    })
                ;
            }   
        },
        methods: {
            addFaultItem() {
                this.$router.go({name:'GuzhangItem'});
            },
            editItem(cat_id) {
                const self = this
                self.pushLastPath(self.$route.path);
                self.$router.go({name:"EditGuzhangItem", params:{itemId:cat_id}})
            },
            save() {
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

                if (state.orderInfo.auto_fault_items.length == 0) {
                    self.showToast("请添加故障项");
                    return false;
                }

                this.setLoading(true);

                this.$http({
                    url: '/v2/new_maintenance/create',
                    data: self.$store.state.orderInfo,
                    method: 'POST'
                }).then(function(response) {
                    if (response.data.status.code == 200) {
                        self.setLoading(false);
                        // self.success = true;
                        // zhuge.track('微信维修厂', {
                        //     'page': '预约提交成功'
                        // })
                        setTimeout(function(){
                            self.$router.go({ 
                                name:'detailReservation',
                                params: { reservationId: response.data.data.id}
                            });
                        }, 1000);
                        
                    } else {
                        // zhuge.track('微信维修厂', {
                        //     'page': '预约提交失败',
                        //     'msg': response.data.status.msg
                        // })
                        self.setLoading(false);
                        self.showToast(response.data.status.msg);
                    }
                }, function() {

                })
            },
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
            }
        },
        events: {
            'change-auto-model' : function(msg) {
                this.showUserModels = true;
            },
        },
        components: {
            HeaderAutoModel,
            UserAutoModels,
            Popup,
            ServiceFactory,
            DeliveryType
        },
        vuex: {
            actions: {
                setOrderInfo,
                setLoading,
                showToast,
                setUserAutoModels,
                pushLastPath
            }
        },
        filters: {
            join(val) {
                return val.map(item => {
                    return item.name;
                }).join(',')
            }
        }
    }
</script>