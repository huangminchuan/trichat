<style lang="less" scoped>
    .xc-footer-total-price {
        position: fixed;
        display: flex;
        width: 100%;
        bottom: 0px;
        left: 0px;
        height: 64px;
        background-color: #ffffff;

        .xc-flex-item {
            flex: 1;
            text-align: right;
            padding-right: 10px;

            .xc-market-price {
                color: #9B9B9B;
                font-size: 12px;
                line-height: 18px;
            }

            .xc-origin-price {
                margin-top: 10px;
                font-size:  16px;
                height: 26px;
                color: #363636;

                .xc-price-info {
                    color: #FF5151;
                }
            }
        }

        .xc-flex-right {
            flex: none;
            width: 100px;
            background-color: #44A7EF;
            color: #FFFFFF;
            text-align: center;
            line-height: 64px;
        }
    }
</style>

<template>
    <div class="xc-footer-total-price xc-1px-top">
        <div class="xc-flex-item">
            <div class="xc-origin-price">
                合计: <span class="xc-price-info">¥{{ currentPrice || '0.00' }}</span>
            </div>
            <div class="xc-market-price">
                <span v-if="noticeText">{{ noticeText }}</span>
                <span v-else>
                    原价: {{ marketPrice || '0.00' }}元
                    <span v-if="discountPrice != '0.00'">, 已优惠{{ discountPrice || '0.00' }}元</span>
                </span>
            </div>
        </div>
        <div class="xc-flex-right" @click="submit">
            {{ nextStep }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            currentPrice: {
                type: String,
                required: true
            },
            marketPrice: String,
            nextStep: String,
            noticeText:String
        },
        methods: {
            submit() {
                this.$dispatch('go-next');
            }
        },
        computed: {
            discountPrice() {
                let price = parseFloat(this.marketPrice) - parseFloat(this.currentPrice);
                price =  isNaN(price) || price < 0 ? 0.00 : price;
                return price.toFixed(2);
            }
        }
    }
</script>