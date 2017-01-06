<style lang="less" scoped>
    .xc-footer-models {
        width: 100%;
        background-color: #FFFFFF;
        
        .xc-footer-models-title {
            padding-left: 15px;
            height: 44px;  
            line-height: 44px;
            color: #576B95;
            font-size: 16px;
            border-bottom: 1px solid #EAEAEA;
        }

        .xc-footer-models-panel {;
            padding-left: 15px;
            width: 100%;
            border-bottom: 1px solid #EAEAEA;

            .xc-footer-models-item {
                display: flex;
                height: 62px;
                flex-direction: row;
                align-items: center;
                font-size: 14px;
                border-bottom: 1px solid #EAEAEA;

                &:last-of-type {
                    border-bottom: none;
                }

                .xc-footer-model-icon {
                    flex: none;
                    display: flex;
                    align-items: center;
                    width: 45px;
                    height: 62px;
                    text-align: left;

                    img {
                        flex: none;
                        width: 32px;
                        height: 32px;
                    }
                }

                .xc-footer-model-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: #343434;

                    .xc-footer-brand-series {
                        font-size: 14px;

                    }

                    .xc-footer-model-year {
                        font-size: 10px;

                    }

                }
                .xc-footer-model-edit {
                    flex: none;
                    width: 16px;
                    margin-right: 15px;
                }
            }
            
        }

        .xc-footer-models-new {
            height: 64px;
            padding: 12px 15px;

            .xc-footer-btn {
                display: block;
                color: #FFFFFF;
                background-color: #44A7EF;
                font-size: 16px;
                text-align: center;
                border-radius: 4px;
                height: 42px;
                line-height: 42px;
                width: 100%;
                
            }
        }
    }

</style>

<template>

    <div class="xc-footer-models">
        <div class="xc-footer-models-title">
            选择历史车型
        </div>
        <div class="xc-footer-models-panel">
            <div class="xc-footer-models-item" v-for="userAutoModel in userAutoModels">
                <div class="xc-footer-model-icon" @click="selectUserModel(userAutoModel)">
                     <img v-bind:src="userAutoModel.logo" alt="">
                </div>
                <div class="xc-footer-model-info" @click="selectUserModel(userAutoModel)">
                    <div class="xc-footer-brand-series">
                        {{ userAutoModel.auto_model.auto_series.auto_brand.name }} {{ userAutoModel.auto_model.auto_series.name }}
                    </div>
                    <div class="xc-footer-model-year">
                        {{ userAutoModel.auto_model.name }}
                    </div>
                </div>
                <div class="xc-footer-model-edit" @click="editUserModel(userAutoModel)">
                    <i class="iconfont">&#xe604;</i>
                </div>
            </div>
        </div>
        <div class="xc-footer-models-new">
            <a @click="createModelInfo" class="xc-footer-btn">
                <i class="iconfont tianjia"></i> 添加新车型
            </a>
        </div>
    </div>
</template>

<script>
    import { setUserAutoModel,pushLastPath,setOrderInfo,setUserAutoModels } from 'actions'
    import moment from 'moment'

    export default {
        data: () => {
            return {
                selectedUserAutoModel: 0
            }
        },
        methods: {
            selectUserModel(userAutoModel) {
                this.setUserAutoModel({
                    user_auto_model_id: userAutoModel.id,
                    auto_model_id: userAutoModel.auto_model.id,
                    reg_time: moment(userAutoModel.reg_time,'YYYY.MM.DD').format('YYYY-MM-DD'),
                    province_id:userAutoModel.province ? userAutoModel.province.id : 10,
                    vin: userAutoModel.vin_num,
                    license: userAutoModel.license,
                    mileage: userAutoModel.mileage,
                    brand_id: userAutoModel.auto_model.auto_series.auto_brand.id,
                    series_id: userAutoModel.auto_model.auto_series.id,
                    brand_name: userAutoModel.auto_model.auto_series.auto_brand.name,
                    model_name: userAutoModel.auto_model.name,
                    series_name: userAutoModel.auto_model.auto_series.name,
                    logo: userAutoModel.logo
                });
                this.show = false;
                this.setOrderInfo({
                    user_auto_model_id: userAutoModel.id
                });
                zhuge.track('微信维修厂', {
                    'action': '用户选择历史用户车型列表'
                })
                this.$dispatch('select-user-auto-model');
            },
            editUserModel(userAutoModel) {
                this.pushLastPath(this.$route.path);
                this.setUserAutoModel({
                    user_auto_model_id: userAutoModel.id,
                    auto_model_id: userAutoModel.auto_model.id,
                    reg_time: userAutoModel.reg_time 
                        ? moment(userAutoModel.reg_time,'YYYY.MM.DD').format('YYYY-MM-DD')
                        : "",
                    province_id:userAutoModel.province ? userAutoModel.province.id : 10,
                    vin: userAutoModel.vin_num,
                    license: userAutoModel.license,
                    mileage: userAutoModel.mileage,
                    brand_id: userAutoModel.auto_model.auto_series.auto_brand.id,
                    series_id: userAutoModel.auto_model.auto_series.id,
                    brand_name: userAutoModel.auto_model.auto_series.auto_brand.name,
                    model_name: userAutoModel.auto_model.name,
                    series_name: userAutoModel.auto_model.auto_series.name,
                    logo: userAutoModel.logo
                });
                this.$router.go({name: 'userAutoModelEdit', params: {userAutoModelId:userAutoModel.id}});
            },
            createModelInfo() {
                this.pushLastPath(this.$route.path);
                this.$router.go({name: 'userAutoModelNew'});
            }
        },
        props: {
            show: Boolean
        },
        vuex: {
            actions: {
                setUserAutoModel,
                pushLastPath,
                setOrderInfo,
                setUserAutoModels
            },
            getters: {
                userAutoModels: state => state.userAutoModels
            }
        }
    
    }
</script>