<style lang="less">
    .xc-item-line {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        min-height: 81px;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding-right: 10px;

        .xc-item-line-info {
            flex: 1;
            display: flex;
            box-sizing: border-box;
            padding-left: 15px;

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
                }
            }
        }

        .xc-select-item-line {
            flex: none;
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
                <i class="iconfont">&#xe610;</i>
            </div>

            <div class="xc-item-line-detail">
                <div class="xc-item-line-title">
                    上海市徐汇区桂箐路15号
                </div>
                <div class="xc-item-line-desc">
                    丁俊斌是大帅哥 15921712969
                </div>
            </div>
        </div>
        <div class="xc-select-item-line">
            <i class="iconfont ">&#xe604;</i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            itemHeight: {
                type: Number,
                required: false
            }
        }
    }
</script>