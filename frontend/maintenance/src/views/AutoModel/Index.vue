<style lang="less">
    .xc-model-page {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: auto;
        font-size: 14px;

        .xc-model-search-box {
            flex: 1;
            display: flex;
            align-items: center;
            height: 54px;
            padding: 10px 15px;
            background-color: #FFFFFF;

            .xc-model-input-button {
                width: 100%;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background-color: #EFEFEF;
                font-size: 15px;
                color: #888888;

                .iconfont {
                    font-size: 14px;
                    color: #888888;
                }
            }

        }

        .xc-model-hot-brands {
            flex: 1;
            min-height: 215px;
            background-color: #ffffff;

            .xc-hot-brands-title {
                position: relative;
                padding-left: 15px;
                height: 52px;
                line-height: 52px;
                font-size: 14px;
                color: #888888;
            }

            .xc-hot-brands-list {
                display:-webkit-flex;
                display: flex;
                flex-direction: row;
                -webkit-flex-wrap:wrap;
                flex-wrap: wrap;
                align-items: center;

                .xc-hot-brand-logo-item {
                    float: left;
                    padding-top: 17px;
                    width: 20%;
                    height: 74px;
                    text-align: center;

                    .xc-hot-brand-name {
                        font-size: 14px;
                        color: #343434;
                    }
                }
            }
        }
    }

    .xc-model-panel {
        margin-bottom: 10px;
        background-color: #FFFFFF;

        .xc-model-panel-title {
            position: relative;
            padding-left: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: #888888;
        }

        .xc-model-panel-body {
            padding-left: 15px;

            .xc-model-panel-item {
                display: flex;
                position: relative;
                min-height: 60px;
                

                &:last-of-type {
                    border-bottom: none;
                }

                align-items: center;
                flex-direction: column;

                .xc-model-brand-panel {
                    flex: 1;
                    display: flex;
                    width: 100%;
                    height: 60px;
                    align-items: center;
                    

                    &:last-of-type {
                        border-bottom: none;
                    }

                    .xc-panel-item-icon {
                        flex: none;
                        margin-right: 10px;
                        width: 27px;
                        height:27px;
                        text-align: center;
                    }

                    .xc-panel-item-title {
                        flex: 1;
                        font-size: 14px;
                    }

                    .xc-panel-item-status {
                        flex: none;
                        margin-right: 25px;
                        line-height: 1;
                        width: 17px;
                        font-size: 17px;
                        height: 17px;
                    }
                }

                .xc-model-series-panel {
                    position: relative;
                    flex: 1;
                    width: 100%;
                    padding-left: 15px;

                    .xc-model-series-title {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 60px;
                        line-height: 60px;
                        text-align: left;

                        &:last-of-type {
                            border-bottom: none;
                        }

                        .xc-series-title {
                            flex: 1;
                        }

                        .xc-series-status {
                            flex: none;
                            margin-right: 25px;
                            width: 17px;
                            height: 17px;
                            line-height: 1;
                        }
                    }
                }
            }
        }
    }

    .xc-brand-icon {
        width: 27px;
        height: 27px;
    }

    .xc-modal-background {
        position: fixed;
        z-index: 2;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%; 
        background-color: #000000;
        opacity: 0.3;   
    }

    .xc-model-list-container {
        position: fixed;
        z-index: 11;
        width: 85%;
        height: 100%;
        overflow: scroll;
        top: 0px;
        right: 0px;
        background-color: #F5F5F5;

        .xc-model-title {
            position: fixed;
            z-index: 99;
            top: 0px;
            right: 0px;
            width: 85%;
            height: 52px; 
            line-height: 52px;
            text-align: center;
            background-color: #ffffff;
            font-size: 14px;

            .xc-model-goback {
                position: absolute;
                top: 3px;
                left: 12px;
                height: 46px;
                line-height: 46px;
                font-size: 14px;

                i.iconfont {
                    position: relative;
                    top: -1px;
                    font-size: 12px;
                    color: #888888;
                }
            }
        }

        .xc-empty-block {
            width: 100%;
            height: 60px;
        }

        .xc-model-item {
            background-color: #ffffff;
            z-index: 10;
            width: 100%;
            margin-top: 10px;

            .xc-model-item-title {    
                position: relative;            
                padding-left: 15px;
                height: 52px;
                color: #888888;
                font-size: 14px;
                line-height: 52px;
            }

            .xc-model-item-panel {
                padding-left: 15px;
                width: 100%;

                .xc-model-info {
                    position: relative;
                    width: 100%;
                    display: flex;
                    padding: 20px 15px 13px 0px;
                    align-items: flex-start;
                    min-height: 60px;
                    font-size: 14px;

                    .xc-model-name {
                        flex: 1;
                    }

                    .xc-model-status {
                        flex: none;
                        width: 26px;
                        text-align: right;
                        height: 20px;
                        line-height: 20px;

                        .iconfont {
                            position: relative;
                            top: -3px;
                        }
                    }
                }
            }
        }
        
    }

    .right-mask-transition {
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        transition: all 0.3s ease;
    }

    .right-mask-enter,.right-mask-leave {
        right: -85%;
    }

    .xc-position-fixed {
        position: fixed;
    }

</style>

<template>
    <div class="xc-model-page-container">
        <div class="xc-model-page" :class="{'xc-position-fixed':modelListActived}">
            <div class="xc-model-hot-brands xc-model-panel">
                <div class="xc-hot-brands-title xc-1px-bottom">
                    热门品牌
                </div>
                <div class="xc-hot-brands-list">
                    <a href="#brand_130" class="xc-hot-brand-logo-item" @click="hotBrand(130)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/Volkswagen.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            大众
                        </div>
                    </a>
                    <a href="#brand_171" class="xc-hot-brand-logo-item" @click="hotBrand(171)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/Ford.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            福特
                        </div>
                    </a>
                    <a  href="#brand_156" class="xc-hot-brand-logo-item" @click="hotBrand(156)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/honda.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            本田
                        </div>
                    </a>
                    <a href="#brand_102" class="xc-hot-brand-logo-item"  @click="hotBrand(102)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/Toyota.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            丰田
                        </div>
                    </a>
                    <a href="#brand_11" class="xc-hot-brand-logo-item"  @click="hotBrand(11)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/Buick.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            别克
                        </div>
                    </a>
                    <a href="#brand_139" class="xc-hot-brand-logo-item"  @click="hotBrand(139)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/Audi.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            奥迪
                        </div>
                    </a>
                    <a href="#brand_169" class="xc-hot-brand-logo-item"  @click="hotBrand(169)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/modern.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            现代
                        </div>
                    </a>
                    <a href="#brand_193" class="xc-hot-brand-logo-item"  @click="hotBrand(193)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/Chevrolet.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            雪佛兰
                        </div>
                    </a>
                    <a href="#brand_136" class="xc-hot-brand-logo-item"  @click="hotBrand(136)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/Benz.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            奔驰
                        </div>
                    </a>
                    <a href="#brand_144" class="xc-hot-brand-logo-item" @click="hotBrand(144)">
                        <img src="http://www.xieche.com/bundles/app/h5/app/chatWeb/asserts/BMW.png" alt="" class="xc-hot-brand-logo xc-brand-icon">
                        <div class="xc-hot-brand-name">
                            宝马
                        </div>
                    </a>
                </div>
            </div>

            <div class="xc-model-panel" v-if="brands.length > 0" v-for="(groupName,brands) in brandGroups">
                <div class="xc-model-panel-title xc-1px-bottom">
                    {{ groupName }}
                </div>

                <div class="xc-model-panel-body">
                    <div id="brand_{{ brandInfo.id }}" class="xc-model-panel-item xc-1px-bottom" v-for="(k,brandInfo) in brands">
                        <div class="xc-model-brand-panel"  @click="selectBrand(brandInfo)">
                            <div class="xc-panel-item-icon">
                                <img :src="brandLogo(brandInfo.logo)" class="xc-brand-icon" alt="">
                            </div>
                            <div class="xc-panel-item-title">
                                {{ brandInfo.name }}
                            </div>
                            <div class="xc-panel-item-status">
                                <i v-if="brandInfo.id == selectedBrand.id" class="iconfont">&#xe612;</i>
                            </div>
                        </div>
                        <div class="xc-model-series-panel xc-1px-top" v-if="brandInfo.id == selectedBrand.id && selectedBrand.series.length > 0">
                            <div class="xc-model-series-title xc-1px-bottom" v-for="series in selectedBrand.series" @click="selectSeries(series)">
                                <div class="xc-series-title">
                                    {{ series.name }}
                                </div>
                                <div class="xc-series-status">
                                    <i v-if="series.id == selectedSeries.id" class="iconfont">&#xe612;</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="xc-modal-background" v-show="modelListActived" @click="modelListActived = !modelListActived">
        </div>

        <div v-show="modelListActived" class="xc-model-list-container" transition="right-mask">
            <div class="xc-model-title">
                {{ selectedBrand.name }} {{ selectedSeries.name }}

                <div class="xc-model-goback" @click="modelListActived = false">
                    <i class="iconfont">&#xe614;</i> 返回
                </div>
            </div>

            <div class="xc-empty-block"></div>

            <div class="xc-model-item" v-for="(k,modelGroup) in selectedSeries.models">
                <div class="xc-model-item-title xc-1px-bottom">
                    {{ k }}
                </div>
                <div class="xc-model-item-panel">
                    <div class="xc-model-info xc-1px-bottom" v-for="modelInfo in modelGroup" @click="selectModel(modelInfo)">
                        <div class="xc-model-name">
                            {{ modelInfo.name }}
                        </div>
                        <div class="xc-model-status">
                            <i v-if="selectedModel.id == modelInfo.id" class="iconfont">&#xe612;</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    import { setUserAutoModel,popLastPath } from 'actions'
    export default {
        data() {
            return {
                brandGroups: {},
                selectedBrand: {
                    id: 0,
                    series: []
                },
                selectedSeries: {
                    id: 0,
                    models: []
                },
                selectedModel: {
                    id: 0
                },
                modelListActived: false,
                pageYsize:0,
                brands:[]
            }
        },
        ready() {
            const self = this;
            this.$http.get('/v2/auto/group/brands?_format=json').then(res => {
                self.brandGroups = res.data.data;
                for (let k in res.data.data ){
                    res.data.data[k].forEach(brand => {
                        self.brands.push(brand);
                    });
                }
            }, res => {
                console.info(res);
            });
        },
        methods: {
            hotBrand(brandId) {
                const self = this;
                let brand = {};
                self.brands.forEach(ba => {
                    if (ba.id == brandId) {
                        brand = ba;
                    }
                });
                self.selectBrand(brand);
            },
            brandLogo: logo => {
                return logo.indexOf("jpg") >= 0 ? 'http://www.xieche.com' + logo : 'http://www.xieche.com/bundles/app/common/images/car_brand_logo/baoma.jpg';
            },
            selectBrand(brand) {
                const self = this;
                this.selectedBrand = this.selectedBrand.id == brand.id ? {id:0,series:[]} : {...brand,series:[]};
                if (this.selectedBrand.id > 0) {
                    this.$resource('/v2/auto/series/brand/{id}').get({id:brand.id}).then(res => {
                        self.selectedBrand.series = res.data.data;
                    })
                }
            },
            selectSeries(series) {
                const self = this;
                self.pageYsize = document.body.scrollTop;
                this.selectedSeries = this.selectedSeries.id == series.id ? {id:0,models:[]} : {...series,models:[]};

                if (this.selectedSeries.id > 0) {
                    this.$resource('/v2/auto/series/{id}/grouped-models').get({id:series.id}).then(res => {
                        self.selectedSeries.models = res.data.data.grouped_auto_models.list;
                        self.modelListActived = true;
                    })
                }
            },
            selectModel(model) {
                const self = this;
                self.selectedModel = {
                    id: model.id,
                    name: model.name
                };

                self.setUserAutoModel({
                    auto_model_id: self.selectedModel.id,
                    brand_id: self.selectedBrand.id,
                    brand_name: self.selectedBrand.name,
                    series_id: self.selectedSeries.id,
                    series_name: self.selectedSeries.name,
                    model_name: self.selectedModel.name,
                    logo:self.selectedBrand.logo
                });

                zhuge.track('微信维修厂', {
                    'page': '车型列表',
                    'action': '选择车型'
                })
                self.$router.go(self.popLastPath());

            }
        },
        watch: {
            modelListActived: function(val) {
                if (!val) {
                    document.body.scrollTop = this.pageYsize; 
                }
            }
        },
        vuex: {
            actions: {
                setUserAutoModel,
                popLastPath
            }
        }
    }
</script>
