<style lang="less">
    @import '~vux/dist/vux.css';
</style>

<template>
    <div>
        <loading :show="$loadingRouteData || loading" text="正在加载"></loading>
        
        <item-group :if="!loading" title="服务地址选择">
            <user-address-item 
                v-for="address in addresses"
                v-if="address.mobile && address.name"
                :address="address.full_address"
                :contact="address.name"
                :mobile="address.mobile"
                :selected="address.id == selectedAddress"
                :address-id="address.id"
                @click="selectAddress(address.id)"
            >
            </user-address-item>
        </item-group>

        <div class="xc-group-footer">
            <a class="xc-group-footer-btn xc-group-footer-confirm" @click="confirmUserAddress" >确认</a>
            <a class="xc-group-footer-btn xc-group-footer-addnew" v-link="{name:'newUserAddress'}">添加新地址</a>
        </div>
    </div>
</template>

<script>
    import ItemGroup from 'components/ItemGroup'
    import UserAddressItem from 'components/UserAddressItem'
    import GroupFooter from 'components/GroupFooter'
    import Loading from 'vux-components/loading'
    import { 
        setUserAddressList,
        setSelectedUserAddress,
        setOrderInfo,
        popLastPath 
    } from 'actions'

    export default {
        components: {
            ItemGroup,
            UserAddressItem,
            GroupFooter,
            Loading
        },
        methods: {
            selectAddress(address) {
                this.selectedAddress = address;
            },
            confirmUserAddress() {
                const self = this;
                this.setSelectedUserAddress(this.selectedAddress);
                let selectedAddress = {
                    mobile: "",
                    contact: ""
                };

                self.addresses.forEach(address => {
                    if (address.id == self.selectedAddress) {
                        selectedAddress = address;
                    }
                });
                this.setOrderInfo({
                    take_car_address_id: self.selectedAddress,
                    mobile: selectedAddress.mobile,
                    contact: selectedAddress.name
                });
                self.$router.go(self.popLastPath());
            },
            footerNew() {
                this.$router.go({name: 'newUserAddress'});
            }
        },
        data() {
            return {
                selectedAddress: 0,
                addresses: [],
                loading: false
            }
        },
        vuex: {
            actions: {
                setUserAddressList,
                setSelectedUserAddress,
                setOrderInfo,
                popLastPath
            }
        },
        ready() {
            zhuge.track('微信维修厂', {
                'page': '用户地址列表页面'
            })
            const self = this;
            self.loading = true;
            this.$http.get('/v2/user/address/list?_format=json&city_id=11095').then(function(res) {
                if (!(res.data.data)) {
                    alert("用户没有常用地址.");
                    return ;
                }

                self.setUserAddressList(res.data.data);
                self.addresses = res.data.data;
                self.selectedAddress = self.$store.state.selectedUserAddress

                self.loading = false;
            }, function(res) {

            });
        }
    }
</script>