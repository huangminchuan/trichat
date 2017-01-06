<style lang="less" scoped>
    .xc-list-item {
        position: relative;
        height: 62px;
        line-height: 62px;
        display:flex;
        flex-direction: row;

        .service-item-title {
            flex: 1;
            text-align: left;
        }

        .service-item-total-price {
            flex: none;
            padding-right: 15px;
            width: 80px;
            text-align: right;
            color: #ff5151;
        }
    }

</style>

<template>
    <div>
        <header-auto-model></header-auto-model>

        <div class="xc-service-container">
            <div class="service-header xc-1px-bottom">
                <div class="service-title">
                    我的服务项目
                </div>

            </div>
            <div class="service-body">
                <div class="xc-list-item xc-1px-bottom" v-for="product in products">
                    <div class="service-item-title">
                        {{ product.name }}
                    </div>
                    <div class="service-item-total-price">
                        ¥{{ itemAmount(product) }}
                    </div>
                </div>

                <detect-service-item></detect-service-item>
            </div>
        </div>

        <footer-total-price notice-text="支付金额以实际维修项目为准" :current-price="amount" next-step="下一步" :market-price="marketPrice" discount-price="0.00" @click="submit">
        </footer-total-price>
    </div>
</template>

<script>
    import Checklist from 'vux-components/checklist';
    import Group from 'vux-components/group'
    import Tabbar from 'vux-components/tabbar/tabbar'
    import Cell from 'vux-components/cell'
    import Flexbox from 'vux-components/flexbox'
    import FlexboxItem from 'vux-components/flexbox-item'
    import XButton from 'vux-components/x-button'
    import Confirm from 'vux-components/confirm'
    import { setProducts } from 'actions'
    import HeaderAutoModel from 'components/HeaderAutoModel'
    import FooterTotalPrice from 'components/FooterTotalPrice'
    import DetectServiceItem from 'components/DetectServiceItem'    

    export default {
        components: {
            Checklist,
            Group,
            Tabbar,
            Cell,
            Flexbox,
            FlexboxItem,
            XButton,
            Confirm,
            HeaderAutoModel,
            FooterTotalPrice,
            DetectServiceItem
        },
        data() {
            return {
                products: [],
                amount: "0.00",
                marketPrice: "0.00"
            };
        },
        vuex: {
            actions: {
                setProducts
            }
        },
        ready() {
            zhuge.track('微信维修厂', {
                'page': '产品确认页面'
            })
            const self = this;
            let state = self.$store.state;
            let amount = 0.00;
            let marketPrice = 0.00;
            self.products = state.orderInfo.products;

            self.products.forEach(product => {
                amount += parseFloat(product.price);
                marketPrice += parseFloat(product.price);

                product.materials.forEach(material => {
                    amount += parseFloat(material.price);
                    marketPrice += parseFloat(material.market_price) ? parseFloat(material.market_price) : parseFloat(material.price);
                });
            });

            self.marketPrice = marketPrice.toFixed(2);
            self.amount = amount.toFixed(2);
        },
        methods: {
            submit: function() {
                this.setProducts(this.products);
                zhuge.track('微信维修厂', {
                    'page': '产品确认页面提交',
                    'products': this.products.map(prod => prod.name)
                })
                this.$router.go({name:'createReservation'});
            },
            itemAmount: function(product) {
                let amount = 0.00
                amount += parseFloat(product.price);
                if (product.has_material) {
                    product.materials.forEach(material => {
                        amount += parseFloat(material.price);
                    });
                }

                return amount.toFixed(2);
            }
        }
    }
</script>