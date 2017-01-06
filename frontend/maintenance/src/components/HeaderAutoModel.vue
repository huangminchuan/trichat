<style lang="less" scoped>
    @import '~assets/styles/iconfont.css';

    .xc-header-modelinfo {
        display: -webkit-flex;
        display: flex;
        height: 70px;
        background-color: #FFFFFF;
    }

    .xc-flex-item{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        width: 0%;
    }

    .xc-flex-middle {
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        padding: 0 15px;
    }

    .xc-header-icon-div {
        width: 32px;
        height: 32px;
        margin-right: 8px;
        line-height: 1;

        .xc-series-icon {
            font-size: 32px;
            color: #44A7EF;
        }
    }
    .xc-header-autoseries{
        font-size: 14px;
        line-height: 20px;
        color: #343434;
    }

    .xc-header-automodel {
        line-height: 14px;
        font-size: 10px;
        color: #343434;
    }

    .xc-header-changemodel {
        display: block;
        color: #44A7EF;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        flex:none;

        .xc-change-icon {
            color: #888888;
            font-size:14px;
        }
    }

    .xc-header-model-logo {
        position: relative;
        top: -1px;
        width: 32px;
        height: 32px;
    }

    .xc-no-auto-model-notice {
        font-size: 18px;
    }
</style>

<template>
    <div class="xc-header-modelinfo xc-flex-middle">
        <div class="xc-header-icon-div">
            <img class="xc-header-model-logo" v-bind:src="userAutoModel.logo" alt="">
        </div>
        <div class="xc-flex-item">
            <div v-show="userAutoModel.logo">
                <p class="xc-header-autoseries">{{ userAutoModel.brand_name + userAutoModel.series_name }}</p>
                <p class="xc-header-automodel">{{ userAutoModel.model_name }} </p>
            </div>
            <div v-else class="xc-no-auto-model-notice">
                车型
            </div>
        </div>
        <div v-show="canChange" class="xc-header-changemodel" @click="changeAutoModel()">
            <span v-if="userAutoModel.user_auto_model_id > 0">
                更换
            </span>
            <span v-else>
                选择
            </span>
             <i class="iconfont xc-change-icon">&#xe607;</i>
        </div>
    </div>
</template>

<script>
    export default {
        ready() {
            const state = this.$store.state;
            this.userAutoModel = state.userAutoModel;
            if (!this.userAutoModel.logo) {
                this.userAutoModel.brand_name = '请填写车型信息';
                this.userAutoModel.logo = require('assets/default.png')
            }
        },
        props: {
            canChange: {
                type: Boolean
            }
        },
        data: function() {
            return {
                userAutoModel: {
                    user_auto_model_id: 0,
                    logo: "",
                    series_name: "",
                    brand_name: "",
                    model_name: ""
                }
            }
        },
        methods: {
            changeAutoModel() {
                this.$dispatch('change-auto-model', 'balabalabalabala');
            }
        }
    }
</script>
