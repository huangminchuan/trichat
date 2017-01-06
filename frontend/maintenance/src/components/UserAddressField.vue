<style lang="less" scoped>
    .user-address-field {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 90px;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding-right: 10px;

        &:after {
            content: '';
            position: absolute;
            left: 15px;
            bottom: 0;
            background: #EAEAEA;
            width: 100%;
            height: 1px;
            -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
            -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
        }

        .user-address-info {
            flex: 1;
            display: flex;
            box-sizing: border-box;
            padding-left: 15px;

            .user-address-icon {
                flex: none;
                width: 23px;

                .iconfont {
                    position: relative;
                    top: -2px;
                    font-size: 18px;
                    color: #44A7EF;
                }
            }

            .user-address-detail {
                flex: 1;

                .user-address-title {
                    color: #343434;
                }

                .user-address-desc {
                    margin-top: 8px;
                    color: #888888;
                    font-size: 15px;

                    .user-address-contact {
                        margin-right: 10px;
                        display: inline-block;
                        min-width: 70px;
                    }
                }
            }
        }
            
        .select-user-address {
            flex: none;
            width: 20px;

            .xc-right-arrow {
                color: #888888;
                font-size: 14px;
            }
        }
    }
</style>

<template>
    <div>
        <a v-if="!selectedUserAddress" class="user-address-field" @click="selectUserAddress">
            <div class="user-address-info">
                <div class="user-address-icon">
                    <i class="iconfont">&#xe60a;</i>
                </div>

                <div class="user-address-detail">
                    <div class="user-address-placeholder">
                        取车地址选择
                    </div>
                </div>
            </div>
            <div class="select-user-address">
                <i class="iconfont xc-right-arrow">&#xe607;</i>
            </div>
        </a>
        <a v-else class="user-address-field" @click="selectUserAddress">
            <div class="user-address-info">
                <div class="user-address-icon">
                    <i class="iconfont">&#xe60a;</i>
                </div>

                <div class="user-address-detail">
                    <div class="user-address-title">
                        {{ userAddress.fullAddress }}
                    </div>
                    <div class="user-address-desc" v-if="userAddress.contact && userAddress.mobile">
                        <span class="user-address-contact">{{ userAddress.contact }}</span>
                        <span class="user-address-mobile">{{ userAddress.mobile }}</span>
                    </div>
                </div>
            </div>
            <div class="select-user-address">
                <i class="iconfont xc-right-arrow">&#xe607;</i>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        vuex: {
            getters: {
                userAddressList: state => state.userAddressList,
                selectedUserAddress: state => state.selectedUserAddress
            }
        },
        methods: {
            selectUserAddress() {
                this.$dispatch("go-select-user-address");
                this.$router.go({ name:'userAddressList' });
            }
        },
        computed: {
            userAddress() {
                const self = this;
                let addressInfo = {};
                self.userAddressList.forEach(address => {
                    if (address.id == self.selectedUserAddress) {
                        addressInfo = {
                            id: address.id,
                            contact: address.name,
                            mobile: address.mobile,
                            fullAddress: address.full_address
                        }
                    }
                });
                return addressInfo;
            }
        }
    }
</script>