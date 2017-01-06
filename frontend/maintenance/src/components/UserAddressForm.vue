<style lang="less" scoped>
    .xc-address-form {
        position: relative;

        .xc-address-group {
            position: relative;
            display: flex; 
            align-items: center;
            height: 42px;

            .xc-field-icon {
                flex: none;
                width: 20px;
                line-height: 20px;
            }

            .xc-address-field-input {
                margin-left: 10px;
                flex: 1;

                .xc-input-field {
                    width: 100%;
                    height: 22px;
                    border: 0;
                    outline: 0;
                    -webkit-appearance: none;
                    background-color: transparent;
                    font-size: inherit;
                    color: inherit;
                    height: 1.41176471em;
                    line-height: 1.41176471;
                }
            } 
        }

        .xc-address-search-list {
            position: fixed;
            left: 0px;
            top: 84px;
            z-index: 1;
            width: 100%;
            background-color: #FFFFFF;

            .xc-search-title {
                padding-left: 15px;
                background-color: #F5F5F5;
                height: 38px;
                line-height: 38px;
                color: #AFAFAF;
                font-size: 15px;
            }

            .xc-search-panel {
                position: relative;
                padding-left: 15px;
                
                .xc-search-item {
                    position: relative;
                    height: 60px;
                    padding-top: 8px;

                    .xc-search-item-title {
                        font-size: 16px;
                        color: #343434;
                    }

                    .xc-search-item-district {
                        font-size: 14px;
                        color: #888888;
                    }

                }
            }

        }
    }
</style>

<template>
    <div class="xc-address-form">
        <div class="xc-address-group xc-user-address xc-1px-bottom">
            <div class="xc-filed-icon">
                <i class="iconfont">
                    &#xe60a;
                </i>
            </div>

            <div class="xc-address-field-input">
                <input type="text" name="" v-model="address" debounce="500" class="xc-input-field" placeholder="请填写用户地址">
            </div>
        </div>

        <div class="xc-address-group xc-1px-bottom">
            <div class="xc-filed-icon">
                <i class="iconfont">
                    &#xe606;
                </i>
            </div>

            <div class="xc-address-field-input">
                <input type="text" name="" v-model="contact" class="xc-input-field" placeholder="请填写联系人">
            </div>
        </div>

        <div class="xc-address-group xc-1px-bottom">
            <div class="xc-filed-icon">
                <i class="iconfont">
                    &#xe608;
                </i>
            </div>

            <div class="xc-address-field-input">
                <input type="text" name="" v-model="mobile" class="xc-input-field" placeholder="手机号">
            </div>
        </div>
        <div class="xc-address-search-list" v-show="show">
            <div class="xc-search-title">
                您要找的是不是
            </div>
            <div class="xc-search-panel">
                <div class="xc-search-item xc-1px-bottom" v-for="tip in results" @click="selectSearchAddress(tip)">
                    <div class="xc-search-item-title">
                        {{ tip.name }}
                    </div>
                    <div class="xc-search-item-district">
                        {{ tip.district }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { showToast } from 'actions'
    export default {
        props: {
            address: String,
            contact: String,
            mobile: String,
            id: {
                type: Number,
                required: false
            }
        },
        data: function() {
            return {
                show: false,
                istip: false,
                results: []
            }
        },
        vuex: {
            actions: {
                showToast
            }
        },
        methods: {
            selectSearchAddress(tip) {
                this.show = false;
                this.results = [];
                this.address = tip.name;
                this.istip = true;
                this.$dispatch('select-search-address', tip);
            }
        },
        watch: {
            address: function(newVal, oldVal) {
                const self = this;

                if (self.istip == true) {
                    self.istip = false;
                    return ;
                }
                if (newVal.length <= 1 
                    || (oldVal && newVal.length < oldVal.length) 
                ) {
                    self.show = false;
                    return ;
                }
                self.$http({
                    url: 'http://restapi.amap.com/v3/assistant/inputtips',
                    method: 'GET',
                    params: {
                        key: '01de3db5e6e8cf88d46e8c02edeb4270',
                        city: '021',
                        citylimit: true,
                        output: 'json',
                        keywords: newVal
                    }
                })
                .then(res => {
                    if (res.data.count > 0) {
                        self.show = true;
                        self.results = res.data.tips;
                    } else {
                        self.show = false;
                        self.showToast('您输入的地址不在服务范围内.');
                    }
                });
            }
        },
        ready() {
            if (this.$route.params.addressId) {
                this.istip = true;
            }
        }
    }
</script>