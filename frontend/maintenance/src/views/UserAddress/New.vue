<style lang="less">
    .xc-remove-address {
        margin-top: 10px;
        width: 100%; 
        height: 44px;
        line-height: 42px;
        text-align: center;
        color: #D35656;
        background-color: #FFFFFF;;
    }

</style>

<template>
    <div>
        <item-group title="添加服务地址" >
            <user-address-form
                :address.sync="addressInfo.address"
                :contact.sync="addressInfo.contact"
                :mobile.sync="addressInfo.mobile"
                @select-search-address="selectSearchAddress"
            ></user-address-form>
        </item-group>

        <div class="xc-group-footer">
            <a class="xc-group-footer-btn" @click="save">保存</a>
        </div>
    </div>
</template>

<script>
    import ItemGroup from 'components/ItemGroup'
    import UserAddressItem from 'components/UserAddressItem'
    import GroupFooter from 'components/GroupFooter'
    import UserAddressForm from 'components/UserAddressForm'
    import { showToast } from 'actions'

    export default {
        components: {
            ItemGroup,
            GroupFooter,
            UserAddressForm
        },
        ready() {
            const self = this;
        },
        vuex: {
            actions: {
                showToast
            }
        },
        data() {
            return {
                addressInfo: {
                    city: 11095,
                    district: 310101
                }
            }
        },
        methods: {
            
            save() {
                const self = this;
                if (!self.addressInfo.contact) {
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

                this.$http.post('/v2/user/address/create', {
                    name: self.addressInfo.contact,
                    address: self.addressInfo.address,
                    mobile: self.addressInfo.mobile,
                    city_id: self.addressInfo.city,
                    district_code: self.addressInfo.district
                }).then(function(res) {
                    if (res.data.status.code == 200) {
                        self.$router.go({name:'userAddressList'});
                    }
                }, function(res) {

                });
            }
        }
    }
</script>