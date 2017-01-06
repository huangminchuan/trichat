<style lang="less" scoped>
    .xc-user-operation {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 52px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #FFFFFF;

        .xc-operate-btn {
            position: relative;
            flex: 1;
            text-align: center;
            height: 100%;
            line-height: 52px;
            font-size: 15px;
            color: #44A7EF;
        }
    }

    .xc-services-panel {
        margin-top: 10px;
        position: relative;
        width: 100%;
        background-color: #FFFFFF;

        .xc-services-title {
            position: relative;
            height: 44px;
            font-size: 14px;
            color: #343434;
            padding-left: 15px;
            line-height: 44px;
        }

        .xc-services-items {
            padding-left: 15px;
            padding-top: 10px;
            padding-bottom: 10px;

            .xc-service-item {
                font-size: 14px;
                color: #888888;

                .xc-product-info {
                    display: flex;
                    height: 32px;
                    line-height: 32px;

                    .xc-service-item-title {
                        flex: 1;
                    }

                    .xc-service-item-price {
                        padding-right: 15px;
                        flex: none;
                        width: 130px;
                        text-align: right;
                        color: #343434;
                    }
                }

                .xc-product-materials {

                    .xc-material-item {
                        display: flex;
                        height: 32px;
                        padding-left: 0px;
                        font-size: 14px;
                        color: #888888;
                        line-height: 32px;

                        .xc-material-item-name {
                            flex: 1;
                        }

                        .xc-material-item-price {
                            padding-right: 15px;
                            flex: none;
                            width: 100px;
                            text-align: right;
                            color: #343434;
                        }
                    }
                }
            }
        }

        .xc-service-total {
            position: relative;
            padding-right: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            text-align: right;
        }
    }

    .xc-line-through {
        text-decoration: line-through;
        color: #888888;
    }

    .xc-reservation-panel {
        margin-top: 10px;
        background-color: #FFFFFF;

        .xc-reservation-title {
            position: relative;
            padding-left: 15px;
            height: 44px;
            line-height: 44px;
            color: #343434;
            font-size: 14px;
        }

        .xc-reservation-info {
            position: relative;
            padding-top: 10px;
            padding-left: 15px;
            margin-bottom: 62px;

            .xc-reservation-item {
                display: flex;
                padding-top: 3px;
                padding-bottom: 5px;
                align-items: flex-start;
                min-height: 32px;
                font-size: 14px;


                .xc-reservation-field {
                    flex: none;
                    margin-right: 10px;
                    color: #888888;
                    width: 56px;
                }

                .xc-reservation-value {
                    flex: 1;
                    color: #343434;
                    padding-right: 15px;
                    white-space: wrap;
                }

            }
        }
    }

    .xc-price {
        color: #FF5151;
    }

    .xc-disabled {
        color: #888888 !important;
    }

    .xc-fault-panel {
        position: relative;
        margin-top: 0px;
        background-color: #FFFFFF;

        .xc-panel-title {
            position: relative;
            height: 44px;
            padding-left: 15px;
            line-height: 44px;
        }

        .xc-fault-items {
            padding: 0px 15px 4px 15px;

            .xc-fault-item {
                position: relative;
                padding-top: 0px;
                font-size: 14px;

                .xc-fault-name {
                    .xc-fault-name {
                        color: #3c3c3c;
                    }

                    .xc-fault-desc {
                        color: #a2a2a2;
                    }
                }

                &:last-of-type:after {
                    display: none !important;
                }
            }

            .xc-fault-images {
                padding-top: 10px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                .xc-fault-image {
                    margin-right: 10px;
                    margin-bottom: 5px;
                    width: 80px;
                    height: 80px;
                }
            }
        }
    }
</style>

<template>
    <div>
        <loading :show.sync="loading" text="正在加载"></loading>
        <div v-if="!loading">
            <div class="xc-fault-panel" v-if="reservation.images.length > 0">
                <div class="xc-panel-title xc-1px-bottom">保险材料</div>
                <div class="xc-fault-items">
                    <div class="xc-fault-item xc-1px-bottom">
                        <div class="xc-fault-images">
                            <img :src="image.src" class="xc-fault-image" v-for="image in reservation.images">
                        </div>
                    </div>
                </div>
            </div>

            <div class="xc-reservation-panel">
                <div class="xc-reservation-title xc-1px-bottom">
                    预约信息
                </div>

                <div class="xc-reservation-info">
                    <div class="xc-reservation-item">
                        <div class="xc-reservation-field">
                            预约状态
                        </div>
                        <div class="xc-reservation-value">
                            {{ reservation.status_string }}
                        </div>
                    </div>
                    <div class="xc-reservation-item">
                        <div class="xc-reservation-field">
                            门店地址
                        </div>
                        <div class="xc-reservation-value">
                            上海市闵行区双柏路1299号
                        </div>
                    </div>
                    <div class="xc-reservation-item">
                        <div class="xc-reservation-field">
                            姓名
                        </div>
                        <div class="xc-reservation-value">
                            {{ reservation.contact }}
                        </div>
                    </div>
                    <div class="xc-reservation-item">
                        <div class="xc-reservation-field">
                            手机号
                        </div>
                        <div class="xc-reservation-value">
                            {{ reservation.mobile }}
                        </div>
                    </div>

                    <div class="xc-reservation-item" v-if="reservation.user_remark">
                        <div class="xc-reservation-field">
                            用户备注
                        </div>
                        <div class="xc-reservation-value">
                            {{ reservation.user_remark }}
                        </div>
                    </div>
                </div>

            </div>

            <div class="xc-user-operation xc-1px-top">
                <a class="xc-operate-btn xc-cancel-order xc-1px-right" v-if="reservation.status != 2" @click="cancel($event)">
                    取消预约
                </a>
                <a href="tel:02164023587" class="xc-operate-btn xc-contact-customer">
                    联系客服
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import ReservationListModel from 'components/ReservationListModel'
    import Loading from 'vux-components/loading'
    import moment from 'moment'
    import {
        setToast,
        setLoading,
        showToast
    } from 'actions'

    export default {
        components: {
            ReservationListModel,
            Loading
        },
        data() {
            return {
                reservation: {
                    id: 0,
                    images: []
                },
                loading: true,
                amount:"0.00"
            };
        },
        ready() {
            const self = this;
            let state = self.$store.state;
            let reservationId = self.$route.params.reservationId;
            self.$http.get('/v2/new_maintenance/insurance_reservation_detail', {id:reservationId})
      .then(res => {
        self.loading = false;
        if (res.data.status.code == 200) {
          self.reservation = res.data.data;
        }
      })
      .then(res => {

      })
    ;
        },
        methods: {
            getMoment(day) {
                moment.locale('zh-cn')
                return moment(day, 'YYYY-MM-DD HH:mm').format('YYYY.MM.DD(ddd)') + ' ' + this.reservation.take_car_time_period_string;
            },
            cancel(event) {
                console.info(event)
                event.preventDefault();
                const self = this;
                self.setLoading(true)
                let reservationId = self.$route.params.reservationId;
                self.$http.post('/v2/new_maintenance/insurance_reservation_cancel', {id:reservationId})
                    .then(res => {
                        self.setLoading(false);
                        if (res.data.status.code == 200) {
                            self.setToast({
                                type: 'success',
                                msg: '操作成功'
                            })
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000)
                        } else {
                            self.showToast(res.data.status.msg)
                        }
                    }, res => {
                        self.showToast('系统繁忙,请稍后再试')
                    }
                )
            }
        },
        filters: {
            round: function(val) {
                return parseFloat(val).toFixed(2)
            }
        },
        vuex: {
            actions: {
                setToast,
                setLoading,
                showToast
            }
        }
    }
</script>
