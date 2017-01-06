<style>
    @import '~vux/dist/vux.css';

    .xc-material-item {
        padding-left: 20px;
    }

</style>

<template>
    <div>
        <header-auto-model></header-auto-model>

        <service-items :options="products">
        </service-items>

        <footer-total-price :current-price="amount" next-step="下一步" :market-price="marketPrice" discount-price="0.00" @click="submit">
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
    import ServiceItems from 'components/ServiceItems'

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
            ServiceItems
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
            }
        }
    }
</script>