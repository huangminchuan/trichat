<style lang="less">
    .xc-item-line {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        min-height: 70px;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding-right: 15px;
        border-bottom: 1px solid #EAEAEA;

        &:last-of-type {
            border-bottom: none;
        }

        .xc-item-line-info {
            flex: 1;
            display: flex;
            box-sizing: border-box;

            .xc-item-line-icon {
                flex: none;
                width: 23px;

                .iconfont {
                    position: relative;
                    top: -2px;
                }
            }

            .xc-item-line-detail {
                flex: 1;

                .xc-item-line-title {
                    color: #343434;
                }

                .xc-item-line-desc {
                    color: #888888;
                    font-size: 15px;

                    .xc-item-contact {
                        margin-right: 10px;
                        display: inline-block;
                        min-width: 70px;
                    }
                }
            }
        }

        .xc-select-item-line {
            flex: none;
            width: 10%;
            text-align: right;

            .xc-right-edit {
                font-size: 18px;
            }
        }
    }

    .iconfont {
        font-size: 18px;
        color: #44A7EF;
    }


</style>

<template>
    <div class="xc-item-line" :style="{minHeight:itemHeight}">
        <div class="xc-item-line-info">
            <div class="xc-item-line-icon">
                <i v-if="selected" class="iconfont">&#xe610;</i>
                <i v-else class="iconfont" :style="{color:'#979797'}">&#xe60f;</i>
            </div>

            <div class="xc-item-line-detail">
                <div class="xc-item-line-title">
                    {{ address }}
                </div>
                <div class="xc-item-line-desc" v-if="contact && mobile">
                    <span class="xc-item-contact">{{ contact }}</span>
                    <span class="xc-item-mobile">{{ mobile }}</span>
                </div>
            </div>
        </div>
        <div class="xc-select-item-line">
            <i class="iconfont xc-right-edit" v-link="{name:'editUserAddress',params:{addressId:addressId}}">&#xe604;</i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            itemHeight: {
                type: Number,
                required: false
            },
            address: {
                type: String
            },
            contact: {
                type: String
            },
            mobile: {
                type: String
            },
            selected: {
                type: Boolean
            },
            addressId: {
                type: Number
            }

        }
    }
</script>