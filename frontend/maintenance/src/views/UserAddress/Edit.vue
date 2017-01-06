<style lang="less">
    .xc-remove-address {
        margin-top: 10px;
        width: 100%; 
        height: 44px;
        line-height: 42px;
        text-align: center;
        color: #D35656;
        background-color: #FFFFFF;
    }

    .xc-edit-user-address .xc-group-footer {
        z-index: 2;
    }

</style>

<template>
    <div class="xc-edit-user-address">
        <item-group title="服务地址编辑" >
            <user-address-form
                :address.sync="addressInfo.address"
                :contact.sync="addressInfo.name"
                :mobile.sync="addressInfo.mobile"
                address-id="addressInfo.id"
                @select-search-address="selectSearchAddress"
            ></user-address-form>
        </item-group>

        <div class="xc-remove-address" @click="delete" v-if="$route.params.addressId > 0">
            删除该地址
        </div>
    
        <div class="xc-group-footer">
            <a class="xc-group-footer-btn xc-group-footer-confirm" @click="save">保存</a>
            <a class="xc-group-footer-btn xc-group-footer-addnew" v-link="{name:'newUserAddress'}">添加新地址</a>
        </div>

        <div class="xc-group-footer">
            <a class="xc-group-footer-btn" @click="save">保存</a>
            <a class="xc-group-footer-btn" @click="footerNew" v-if="$route.params.addressId > 0">添加新地址</a>
        </div>
    </div>
</template>

<script>
    import ItemGroup from 'components/ItemGroup'
    import UserAddressItem from 'components/UserAddressItem'
    import GroupFooter from 'components/GroupFooter'
    import UserAddressForm from 'components/UserAddressForm'
    import { showToast,setSelectedUserAddress,setOrderInfo } from 'actions'

    export default {
        components: {
            ItemGroup,
            GroupFooter,
            UserAddressForm
        },
        ready() {
            const self = this;

            if (!self.$route.params.addressId) {
                self.addressInfo = {
                    id:0,
                    address: "",
                    mobile: "",
                    name: "",
                    city_id: 11095,
                    district_code: "",
                    district_id:0
                }
                return false;
            }

            self.$store.state.userAddressList.forEach(address => {
                if (self.$route.params.addressId == address.id) {
                    self.addressInfo = {
                        id: address.id,
                        address: address.address,
                        mobile: address.mobile,
                        name: address.name,
                        city_id: address.city.id,
                        district_code: address.district.code,
                        district_id: address.district.id,
                    }
                }
            });
        },
        data() {
            return {
                addressInfo: {
                    id: 0,
                    address: "",
                    mobile: "",
                    name: "",
                    city_id: 11095,
                    district_code: "",
                    location: "",
                    district_id:0
                }
            }
        },
        vuex: {
            actions: {
                showToast,
                setSelectedUserAddress,
                setOrderInfo
            }
        },
        methods: {
            selectSearchAddress(tip) {
                const self = this;
                self.addressInfo.address = tip.name;
                self.addressInfo.district_code = tip.adcode;
                self.addressInfo.location = tip.location;
            },
            delete() {
                const addressInfo = this.addressInfo;
                const self = this;
                this.$http.post('/v2/user/address/delete', {id:addressInfo.id})
                    .then(function(res) {
                        if (res.data.status.code == 200) {
                            self.setSelectedUserAddress(0)
                            self.$router.go({name:'userAddressList'});
                        } else {
                            self.showToast(res.data.status.msg);
                        }
                    }, function(res) {
                        self.showToast("系统繁忙,请稍后重试.");
                    })
                ;
            },
            save() {
                const self = this;
                if (!self.addressInfo.name) {
                    self.showToast('请填写联系人');
                    return false;
                }

                if (!self.addressInfo.address) {
                    self.showToast('请填写联系地址');
                    return false;
                }

                if (!self.addressInfo.mobile) {
                    self.showToast('请填写手机号');
                    return false;
                }

                if (!self.addressInfo.city_id || !self.addressInfo.district_code) {
                    self.showToast('您输入的地址不在服务范围.');
                    return false;
                }

                let postUrl = '/v2/user/address/create';
                if (self.$route.params.addressId) {
                    postUrl = '/v2/user/address/edit';
                    let areaMap = {
                        "310101":11096,
                        "310104":11108,
                        "310105":11123,
                        "310106":11134,
                        "310107":11140,
                        "310108":11151,
                        "310109":11161,
                        "310110":11170,
                        "310112":11183,
                        "310113":11197,
                        "310114":11211,
                        "310115":11224,
                        "310116":11267,
                        "310117":11279,
                        "310118":11298,
                        "310119":11310,
                        "310120":11311
                    }

                    if (!typeof(areaMap[self.addressInfo.district_code]) == "undefined") {
                        self.addressInfo.district_id = areaMap[self.addressInfo.district_code];
                    }
                }
                zhuge.track('微信维修厂', {
                    'action': '编辑用户地址信息'
                })
                this.$http.post(postUrl, self.addressInfo)
                .then(function(res) {
                    if (res.data.status.code == 200) {
                        self.setSelectedUserAddress(res.data.data.id)
                        self.setOrderInfo({
                            take_car_address_id: res.data.data.id,
                            mobile: self.addressInfo.mobile,
                            contact: self.addressInfo.name
                        });
                        self.$router.go({name:'userAddressList'});
                    } else {
                        self.showToast(res.data.status.msg);
                    }
                }, function(res) {

                });
            },
            footerNew() { 
                this.addressInfo = {
                    id: 0,
                    address: "",
                    mobile: "",
                    name: "",
                    city_id: 11095,
                    district_code: "",
                    location: ""
                };
                this.$router.go({name:'newUserAddress'});
            }
        }
    }
</script>