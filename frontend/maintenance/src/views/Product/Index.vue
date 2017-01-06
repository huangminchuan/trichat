<style lang="less">
    @import '~vux/dist/vux.css';

    .xc-products-box {
        display: flex;  
        flex-direction: row;
	    flex-wrap:wrap;
        align-items: center;
        width: 100%;
        background-color: #FFF;
        font-size: 14px;

        .xc-product-item {
            position: relative;
            width: 33.33%;
            display: flex;
            align-items: center;
            min-height: 80px;
            text-align: center;
            background-color:"transparent";

            span {
                width: 100%;
                text-align: center;
            }

            &:active {
                background-color: #DDDDDD;
                color: #6CA5EC;
            }

            &:before {
                content: '';
                position: absolute;
                left: 0;
                background: #EAEAEA;
                width: 1px;
                height: 100%;
                -webkit-transform: scaleX(0.5);
                        transform: scaleX(0.5);
                -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
            }

            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                background: #EAEAEA;
                width: 100%;
                height: 1px;
                -webkit-transform: scaleY(0.5);
                        transform: scaleY(0.5);
                -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
            }

            .xc-product-title {
                width: 100%;
                padding: 0px 2px;
                text-align: center;
            }
        }
    }
</style>

<template>
    <div>
        <div class="xc-products-box">
            <div class="xc-product-item" v-for="product in products" v-link="{name:'ProductDetail',params:{productId:product.id}}">
                <span>{{ product.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Group from 'vux-components/group'
    import Cell from 'vux-components/cell'
    import { setProducts } from 'actions'

    export default {
        components: {
            Group,
            Cell
        },
        vuex: {
            actions: {
                setProducts
            }
        },
        data() {
            return {
                products: [],
                selectedProducts: []
            }
        },
        ready() {
            const self = this;
            this.$http({
                url: "/v2/new_maintenance/product_list?_format=json",
                method: "GET"
            }).then(
                function(res) {
                    self.products = res.data.data.map(product => {
                        product.key = product.id.toString();
                        product.value = product.name;

                        if (product.has_material) {
                            product.materials = product.materials.map(material => {
                                material.key = material.id.toString();
                                material.value = material.name;
                                material.selected = false;   
                                return material;
                            });
                        }
                        return product;
                    });
                    self.setProducts(self.products);
                    localStorage.products = JSON.stringify(self.products);
                },
                function(err) {

                }
            );
        },
        methods: {
        }
    }
</script>