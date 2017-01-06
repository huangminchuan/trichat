<style lang="less">
    .xc-yanghu-body {
        margin:10px 0px 70px 0px;
        background-color: #ffffff;

        .xc-products-list {
            padding-left: 15px;

            .xc-products-item {
                height: 60px;
            }
        }
    }


    .xc-auto-price {
        @media screen {
            width: 45% !important;
            @media (min-width: 320px) {
                font-size: 13px;
            }
            @media (min-width: 375px) {
                font-size: 16px;
            }
        }
    }
</style>

<template>
    <div class="xc-container">
        <header-auto-model :can-change="true"></header-auto-model>

        <div class="xc-yanghu-body">
            <div class="xc-products-header xc-1px-bottom xc-yanghu-header">
                常规养护
            </div>
            <div class="xc-products-list" v-for="product in products">
                <div class="xc-products-item xc-1px-bottom" @click="selectProduct(product.id)">
                    <div class="xc-products-item-status">
                        <i v-if="productSelected(product.id)" class="iconfont xc-actived-status">&#xe610;</i>
                        <i v-else class="iconfont xc-normal-status" >&#xe60f;</i>
                    </div>
                    <div class="xc-products-item-name">
                        {{ product.name }}
                    </div>
                    <div class="xc-products-item-price xc-auto-price">
                        {{ product | referencePrice }}
                    </div>
                </div>
            </div>
        </div>

        <footer-total-price notice-text="支付金额以实际维修项目为准" @go-next="submit" :current-price.sync="currentPrice" :market-price.sync="marketPrice" next-step="下一步"></footer-total-price>
        <popup :show.sync="showUserModels">
            <user-auto-models :show.sync="showUserModels"></user-auto-models>
        </popup>
    </div>
</template>

<script>
    import HeaderAutoModel from 'components/HeaderAutoModel'
    import FooterTotalPrice from 'components/FooterTotalPrice'
    import { 
        setOrderInfo,
        setLoading,
        showToast,
        setUserAutoModels,
        pushLastPath
    } from 'actions'
    import Popup from 'vux-components/popup'
    import UserAutoModels from 'components/UserAutoModels'

    export default {
        data: function() {
            return {
                products: [],
                selectedProducts:[],
                currentPrice: '0.00',
                marketPrice: '0.00',
                showUserModels: false
            }
        },
        methods: {
            productSelected(product) {
                const self = this;
                if (self.selectedProducts.indexOf(product) != -1) {
                    return true;
                }

                return false;
            },
            selectProduct(productId) {
                const self = this;
                if (self.selectedProducts.indexOf(productId) != -1) {
                    let prods = [];
                    self.selectedProducts.forEach(product => {
                        if (product != productId) {
                            prods.push(product);
                        }
                    });
                    self.selectedProducts = prods;
                } else {
                    self.selectedProducts.push(productId);
                }
                self.updatePrice();
            },
            updatePrice() {
                const self = this;
                let currentPrice = 0.00;
                let marketPrice  = 0.00;
                self.products.forEach(product => {
                    if (self.selectedProducts.indexOf(product.id) != -1) {
                        currentPrice += parseFloat(product.price);
                        marketPrice  += parseFloat(product.market_price)
                    }
                });

                self.currentPrice = currentPrice.toFixed(2);
                self.marketPrice  = marketPrice.toFixed(2);
            },
            submit() {
                const self = this;
                self.setOrderInfo({
                    products: []
                })
                let prods = [];

                if (self.selectedProducts.length == 0) {
                    self.showToast('请选择一项服务')
                    return false
                }

                self.products.forEach(product => {
                    if (self.selectedProducts.indexOf(product.id) != -1) {
                        prods.push(product)
                    }
                });
                self.setOrderInfo({
                    products:prods
                })
                zhuge.track('微信维修厂', {
                    'page': '常规保养产品详情确认',
                    'products': prods.map(prod => prod.name)
                })
                self.$router.go({name:'YanghuConfirm'});
            }
        },
        events: {
            'change-auto-model' : function(msg) {
                this.showUserModels = true;
            }
        },
        ready() {
            zhuge.track('微信维修厂', {
                'page': '常规保养详情'
            })
            const self = this;
            const state = this.$store.state;
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

            this.$http({
                url: "/v2/new_maintenance/product_list",
                params: {type:3, user_auto_model_id:1},
                method: 'GET'
            }).then(res => {
                self.products = res.data.data;
            }, res => {
                
            });
        },
        components: {
            HeaderAutoModel,
            FooterTotalPrice,
            Popup,
            UserAutoModels
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
            referencePrice(product) {
                if (product.is_need_assess) {
                    return `¥${product.min_reference_price}起`
                } 

                return `¥${product.price}`
                
            }
        }
    }
</script>   