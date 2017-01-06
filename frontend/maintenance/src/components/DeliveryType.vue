<style lang="less" scoped>
    .xc-delivery-type {
        margin-top: 10px;
        background-color: #FFFFFF;

        .xc-delivery-field {
            position: relative;
            align-items: center;
            width: 100%;
            height: 52px;
            box-sizing: border-box;
            padding-left: 15px;
            line-height: 48px;

            .xc-radio-label {
                display: inline-block;

                .delivery-title {
                    position: relative;
                    top: 2px;
                    display: inline-block;
                    font-size: 16px;

                    &:first-of-type {
                        margin-right: 20px;
                    }
                }

                .iconfont {
                    position: relative;
                    width: 18px;
                    top: 2px;
                }

                .xc-input-radio {
                    position: absolute;
                    left: -9999em;
                }

                .edaijia {
                    position: relative;
                    top: -3px;
                    margin-left: 5px;
                    padding: 1px 6px;
                    color: #FFFFFF;
                    font-size: 12px;
                    border-top-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    background-color: #44A7EF;
                }
            }
        }

        .xc-choose-datetime {
            position: relative;
            width: 100%;

            .weui_cells_title {
                margin: 0px;
            }

            .weui_cells {
                border-bottom: none;
                font-size: 16px;

                .weui_cell {
                    margin-top: 0px;
                    border-bottom: none; 
                    border-top: none;
                    height: 60px;

                    &:before {
                        content: "";
                        height: 0;
                        border-top: none;
                    }
     
                }

                &:before {
                    content: "";
                    height: 0;
                    border-top: none;
                }

                &:after {
                    border-bottom: none;
                    height: 0;
                }
            }
        }
    }

    .xc-delivery-price {
        padding-left: 12px;
        padding-top: 0px;
        height: 26px;
        color: #D35656;
        font-size: 12px;

        span {
            display: inline-block;
            position: relative;
            top: 7px;
            left: 3px;
            width: 16px;
            height: 18px;
            font-size: 22px;
        }
    }

    .xc-form-remark {
        margin-bottom: 75px;
    }

    .xc-form-user,.xc-form-remark {
        margin-top: 10px; 
        background-color: #FFFFFF;
        padding-left: 15px;
    }

    .xc-datetime-field {
        display: flex;
        height: 60px;
        flex-direction: row;
        padding-left: 15px;
        align-items: center;


        .xc-datetime-icon-box {
            flex: none;
            width: 20px;
            margin-right: 5px;;
        }

        .xc-datetile-title {
            flex: 1;
        }

        .xc-field-right {
            margin-right: 15px;
            flex: none;
            width: 100px;
            text-align: right;
        }
    }

    .xc-form-field {
        display: flex;
        position: relative;
        flex-direction: row;
        align-items: center;
        height: 60px;
        padding-left: 15px; 

        &:after {
            left: 15px;
        }

        .xc-time-period {
            flex: none;
            margin-right: 12px;
            width: 90px;
            height: 50px;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            border-radius: 4px;
            color: #888888;
            border: 1px solid #888888;

            .xc-time-range {
                display: block;
                padding-top: 5px;
                margin-bottom: -3px;
            }

            .xc-time-detail {
                font-size: 12px;
            }
        }

        .time-period-active {
            color: #44A7EF;
            border: 1px solid #44A7EF;
        }
    }

    .xc-time-block  {
        height: 72px;
    }
</style>

<template>
    <div class="xc-delivery-type">
        <div class="xc-delivery-field xc-1px-bottom">
            <label for="s11" class="xc-radio-label" @click="comeType = 1">
                <i v-if="comeType == 1" class="iconfont">&#xe610;</i>
                <i v-else class="iconfont">&#xe60f;</i>
                <p class="delivery-title">自驾到店</p> 
            </label>
            <label for="s12" class="xc-radio-label" @click="comeType = 2">
                <i v-if="comeType == 2" class="iconfont">&#xe610;</i>
                <i v-else class="iconfont">&#xe60f;</i>
                <p class="delivery-title">上门取车 <span class="edaijia">e代驾</span></p>
            </label> 
        </div>

        <div class="xc-choose-datetime">
            <div class="weui_cells_title"></div>
            <div class="weui_cells">
                <user-address-field @go-select-user-address="goSelectAddress" v-if="comeType == 2"></user-address-field>
                <div class="xc-delivery-price" v-if="comeType==2"><span>*</span>上门取送费用为¥139.00</div>
                <div class="xc-datetime-field">
                    <div class="xc-datetime-icon-box">
                        <i class="iconfont">&#xe60d;</i>
                    </div>
                    <div class="xc-datetile-title">
                        {{ getTitle() }}
                    </div>
                    <div class="xc-field-right">
                        <Calendar title="''" :value.sync="takeCarDate" :start-date="now"></Calendar>
                    </div>
                </div>

                <div class="xc-form-field xc-time-block xc-1px-top" v-if="takeCarDate">
                    <p class="xc-time-period" :class="{'time-period-active':timePeriod==1}" @click="timePeriod = 1">
                        <span class="xc-time-range">早</span>
                        <span class="xc-time-detail">8:30-11:00</span>
                    </p>

                    <p class="xc-time-period" :class="{'time-period-active':timePeriod==2}" @click="timePeriod = 2">
                        <span class="xc-time-range">中</span>
                        <span class="xc-time-detail">11:00-15:00</span>
                    </p>    

                    <p class="xc-time-period" :class="{'time-period-active':timePeriod==3}" @click="timePeriod = 3">
                        <span class="xc-time-range">晚</span>
                        <span class="xc-time-detail">15:00-17:30</span>
                    </p>
                </div>         
            </div>
        </div>
    </div>
 
    <div class="xc-form-user" v-if="comeType == 1"> 
        <input-line icon="&#xe606;" :option.sync="contact" placeholder="请输入联系人"></input-line>
        <input-line icon="&#xe608;" :option.sync="mobile" placeholder="请输入手机号"></input-line>
    </div>

    <div class="xc-form-remark">
        <input-line icon="&#xe604;" :option.sync="remark" placeholder="请输入您的特殊需求"></input-line>
    </div>
</template>

<script>
    import Datetime from 'components/Datetime'
    import InputLine from 'components/InputLine'
    import UserAddressField from 'components/UserAddressField'
    import Calendar from 'components/Calendar'
    import moment from 'moment'

    export default {
        components: {
            Datetime,
            InputLine,
            UserAddressField,
            Calendar
        },
        props: {
            comeType: {
                required: true,
                type: Number
            },
            timePeriod: {
                required: true,
                type: Number
            },
            mobile: {
                required: false,
                type: String
            },
            contact: {
                required: false,
                type: String
            },
            remark: {
                required: false,
                type: String
            },
            address: {
                required: false,
                type: String
            },
            takeCarDate: {
                required: false,
                type: String
            }
        },
        methods: {
            getTitle: function() {
                return this.comeType == 1 ? "到店日期" : "取车日期";
            },
            goSelectAddress: function() {
                this.$dispatch('go-select-user-address');
            }
        },
        computed: {
            now: () => {
                return moment().format('YYYY-MM-DD');
            }
        }
    }
</script>