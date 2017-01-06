<style lang="less">
    .xc-service-container {
        margin-top: 10px;
        margin-bottom: 70px;

        background-color: #ffffff;

        .service-header {
            display: flex;
            position: relative;
            height: 52px;
            align-items: center;
            padding-right: 15px;
            padding-left: 15px;
            
            .service-title {
                flex: 1;
                font-size: 15px;
                color: #343434;
            }

            .service-addnew {
                flex: none;
                color: #44A7EF;
                font-size: 14px;

                .iconfont {
                    color: #888888;
                }
            }
        }

        .service-body {
            padding-left: 15px;
            .service-item {
                position: relative;

                .service-item-header {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 15px;
                    min-height: 22px;
                    line-height: 22px;
                    padding-top: 15px;
                    padding-right: 15px;

                    .service-item-icon {
                        flex: none;
                        width: 20px;
                        text-align: left;
                        margin-right: 6px;
                        .iconfont {
                            color: #44A7EF;
                            font-size: 20px;
                        }
                    }

                    .service-item-title {
                        flex: 1;
                        color: #343434;
                        font-size: 16px;
                    }

                    .service-item-total-price {
                        flex: none;
                        width: 120px;
                        color: #FF5151;
                        text-align: right;

                        .xc-verticle-divider {
                            margin: 0px 6px;
                            border-right: 1px solid #DCDCDC;
                        }

                        .iconfont {
                            color: #888888;
                        }

                        .market-price {
                            color: #888888;
                        }
                    }
                }

                .service-item-lists {
                    margin-top: -10px;
                    list-style: none;
                    padding-right: 15px; 
                    padding-bottom: 10px;   

                    li.service-material {
                        display: flex;
                        align-items: center;
                        list-style: none;
                        height: 36px;
                        line-height: 36px;
                        padding-left: 26px;

                        .service-material-name {
                            flex: 1;
                            color: #888888;
                            font-size: 14px;
                        }

                        .service-material-price {
                            flex: none;
                            width: 100px;
                            font-size: 14px;
                            text-align: right;
                            color: #888888;
                        }
                    }
                }
            }
        }
    }


</style>

<template>
    <div class="xc-service-container">
        <div class="service-header xc-1px-bottom">
            <div class="service-title">
                我的服务项目
            </div>
            <!-- <div class="service-addnew">
                添加服务 <i class="iconfont">&#xe607;</i>
            </div> -->
        </div>
        <div class="service-body">
            <div class="service-item xc-1px-bottom" v-for="product in options">
                <div class="service-item-header">
                    <div class="service-item-icon">
                        <i class="iconfont">&#xe60c;</i>
                    </div>
                    <div class="service-item-title">
                        {{ product.name }}
                    </div>
                    <div class="service-item-total-price">
                        ¥{{ itemAmount(product) }}
                        <!--<span class="xc-verticle-divider"></span><i class="iconfont">&#xe60b;</i>-->
                    </div>
                </div>
                <ul class="service-item-lists" v-if="product.has_material">
                    <li class="service-material" v-for="material in product.materials">
                        <div class="service-material-name">
                            {{ material.name }}
                        </div>
                        <div class="service-material-price">
                            ¥{{ material.price }}
                        </div>
                    </li>
                </ul>
            </div>

            <detect-service-item></detect-service-item>
        </div>
    </div>
</template>

<script>
    import DetectServiceItem from './DetectServiceItem'
    export default {
        components: {
            DetectServiceItem
        },
        props: {
            options: {
              type: Array,
              required: true
            }
        },
        methods: {
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