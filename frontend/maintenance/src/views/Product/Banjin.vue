<style lang="less">
    @import '~vux/dist/vux.css';

    .xc-product-detail-list {
        margin-top: 10px;
        width: 100%;
        background-color: #FFFFFF;

        .xc-product-detail-title {
            position: relative;
            padding-left: 15px;
            font-size: 15px;
            color: #343434;
            height: 52px;
            line-height: 52px;

            &:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                background: #EAEAEA;
                width: 100%;
                height: 1px;
                -webkit-transform: scaleY(0.5);
                        transform: scaleY(0.5);
                -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
            }
        }

        .xc-product-detail-panel {
            width: 100%;
            padding-left: 15px;
            margin-bottom: 70px;

            .xc-product-material-item {
                display: flex;
                position: relative;
                align-items: center;
                flex-direction: row;
                height: 60px;
                font-size: 16px;
                padding-right: 15px;

                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background: #EAEAEA;
                    width: 100%;
                    height: 1px;
                    -webkit-transform: scaleY(0.5);
                            transform: scaleY(0.5);
                    -webkit-transform-origin: 0 0;
                            transform-origin: 0 0;
                }

                .xc-product-material-status {
                    flex: none;
                    width: 26px;

                    .xc-unselected {
                        color: #979797;
                    }
                }

                .xc-product-material-name {
                    flex: 1;

                }

                .xc-product-material-price {
                    flex: none;
                    color: #888888;
                }
            }
        }
    } 

    .xc-material-sort {
        position: relative;
        top: -1px;
        margin-right: 4px;
        display: inline-block;
        color: #FFFFFF;
        width: 18px;
        height: 18px;
        text-align: center;
        border-radius: 9px;
        line-height: 18px;
        font-size: 13px;
        background-color: #44A7EF;
    }

    .xc-banjin-panel {
        margin-top: 10px;
        background-color: #FFFFFF;
        padding: 6px;

        .xc-banjin-img {
            width: 100%;
        }
    }
    
    .xc-item-img-helper {
        padding-left: 10px;
        color: #ff5151;
    }

</style>

<template>
<div>
    <div v-if="product">
        <div>
            <header-auto-model :can-change="true"></header-auto-model>

            <div class="xc-banjin-panel">
                <img class="xc-banjin-img" src="../../assets/banjin.jpg" alt="">
                <div class="xc-item-img-helper">
                    * 最终支付金额以技师实际评估维修项目为准
                </div>
            </div>

            <div class="xc-product-detail-list">
                <div class="xc-product-detail-title">
                    钣金喷漆部位选择
                </div>
                <div class="xc-product-detail-panel">
                    <div class="xc-product-material-item" v-for="material in product.materials" @click="selectMaterial(material)">
                        <div class="xc-product-material-status">
                            <i v-if="selectedMaterials.indexOf(material.key) >= 0" class="iconfont">&#xe610;</i>
                            <i v-else class="iconfont xc-unselected">&#xe60f;</i>
                        </div>
                        <div class="xc-product-material-name">
                            <span class="xc-material-sort">{{ material.sort }}</span>{{ material.name }}
                        </div>
                        <div class="xc-product-material-price">
                            ¥{{ material.price }}
                        </div>
                    </div>
                </div>
            </div>

            <footer-total-price :current-price="amount" next-step="下一步" :market-price="marketPrice" @go-next="submit">
            </footer-total-price>
        </div>

        <popup :show.sync="showUserModels">
            <user-auto-models :show.sync="showUserModels"></user-auto-models>
        </popup>
    </div>
    <div v-else>
        <other-product></other-product>
    </div>
</div>
</template>

<script>
    import Group from 'vux-components/group'
    import Tabbar from 'vux-components/tabbar/tabbar'
    import Cell from 'vux-components/cell'
    import Toast from 'vux-components/Toast'
    import { 
        setProducts,
        setOrderInfo,
        pushLastPath,
        setUserAutoModels,
        setLoading,
        showToast
    } from 'actions'
    import HeaderAutoModel from 'components/HeaderAutoModel'
    import FooterTotalPrice from 'components/FooterTotalPrice'
    import Popup from 'vux-components/popup'
    import UserAutoModels from 'components/UserAutoModels'
    import OtherProduct from 'views/Product/OtherProduct'


    export default {
        components: {
            Group,
            Tabbar,
            Cell,
            HeaderAutoModel,
            FooterTotalPrice,
            Popup,
            UserAutoModels,
            OtherProduct,
            Toast
        },
        vuex: {
            actions: {
                setProducts,
                setOrderInfo,
                pushLastPath,
                setUserAutoModels,
                setLoading,
                showToast
            }
        },
        data() {
            return {
                product:{
                    price: "0.00",
                    materials: []
                },
                selectedMaterials: [],
                amount: "0.00",
                marketPrice: "0.00",
                showUserModels: false
            };
        },
        ready() {
            zhuge.track('微信维修厂', {
                'page': '钣金喷漆产品详情'
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
                
            if (state.orderInfo.user_auto_model_id) {
                self.$http.get('/v2/new_maintenance/product_list', {
                    user_auto_model_id: state.orderInfo.user_auto_model_id
                }).then(
                    function(res) {
                        self.setLoading(false);
                        let products = res.data.data.map(product => {
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

                            if (product.id == 1) {
                                self.product = product;
                            }
                            return product;
                        });
                        self.setProducts(products);
                    },
                    function(err) {

                    }
                );

                if (self.product.has_material) {
                    self.product.materials.map(material => {
                        material.key = material.id.toString();
                        material.value = material.name;
                        return material;
                    })
                }

                state.orderInfo.products.forEach(prod => {
                    if (prod.id == 1) {
                        self.selectedMaterials = prod.materials.map(material => material.id);
                }
            });
            }
        },
        events: {
            'change-auto-model' : function(msg) {
                this.showUserModels = true;
            },
            'select-user-auto-model': function() {
                const self = this;
                const state = this.$store.state;

                self.$http.get('/v2/new_maintenance/product_list', {
                    user_auto_model_id: state.orderInfo.user_auto_model_id
                }).then(
                    function(res) {
                        let products = res.data.data.map(product => {
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

                            if (product.id == 1) {
                                self.product = product;
                            }
                            return product;
                        });
                        self.setProducts(products);
                    },
                    function(err) {

                    }
                );
            }
        },
        methods: {
            selectMaterial(material) {
                if (this.selectedMaterials.indexOf(material.key) >= 0) {
                    this.selectedMaterials.splice(this.selectedMaterials.indexOf(material.key) ,1);
                } else {
                    this.selectedMaterials.push(material.key);
                }
            },
            submit() {
                const self = this;
                self.setOrderInfo({
                    products: []
                });
                let selectedMaterials = self.selectedMaterials;
                let prods = self.$store.state.orderInfo.products;
                let userAutoModelId = self.$store.state.userAutoModel.auto_model_id;
                if (!userAutoModelId) {
                    this.showToast('请选择车型');
                    return false;
                }

                let prod = {
                    id: self.product.id,
                    name: self.product.name,
                    price: self.product.price,
                    has_material: self.product.has_material,
                    type: self.product.type,
                    materials: []
                };

                selectedMaterials.forEach(material => {
                    self.product.materials.forEach(tmpMaterial => {
                        if (tmpMaterial.key == material) {
                            prod.materials.push({
                                id: parseInt(material),
                                name: tmpMaterial.name,
                                market_price: tmpMaterial.market_price,
                                price: tmpMaterial.price,
                                amount: 1
                            });
                        }
                    });   
                });

                if (self.selectedMaterials.length == 0) {
                    this.showToast('请至少选择一个喷漆服务部位');
                    self.setOrderInfo({
                        products: []
                    });
                    return false;
                }

                if (prod.materials.length == 0) {
                    this.showToast('请至少选择一个喷漆服务部位');
                    return false;
                }

                let hasProd = false;
                prods.forEach((product,k) => {
                    if (product.id == prod.id) {
                        prods[k] = prod;
                        hasProd = true;
                    }
                });
                
                if (!hasProd) {
                    prods.push(prod);
                }

                self.setOrderInfo({
                    products: prods
                });
                zhuge.track('微信维修厂', {
                    'page': '钣金喷漆详情页面提交',
                    'products': prods.map(prod => prod.name)
                })
                self.$router.go({name:'ProductConfirm'});
            }
        },
        watch: {
            selectedMaterials: function(val,oldVal) {
                const self = this;
                let materials = self.product.materials;
                let amount = 0.00 + parseFloat(self.product.price);
                let marketPrice = 0.00 + parseFloat(self.product.price);

                materials.forEach((material,i) => {
                    if (val.some(x => x === material.key)) {
                        amount += parseFloat(material.price);
                        marketPrice += parseFloat(material.market_price) ? parseFloat(material.market_price) :parseFloat(material.price);
                    }
                })

                self.amount = amount.toFixed(2);
                self.marketPrice = marketPrice.toFixed(2);
            }
        }
    }
</script>
