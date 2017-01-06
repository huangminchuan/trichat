<style lang="less"  scoped>
    .xc-reservations-model {
        display: flex;
        padding-left: 15px;
        width: 100%;
        align-items: center;
        min-height: 63px;
        background-color: #FFFFFF;
        border-bottom: 1px solid #EAEAEA;

        .xc-reservations-model-icon {
            flex: none;
            width: 40px;
            height: 32px;
            text-align: left;

            img {
                width: 32px;
            }
        }

        .xc-reservation-model-info {
            flex: 1;

            .xc-reservation-series-name {
                font-size: 14px;
                color: #343434;
                line-height: 20px;
            }

            .xc-reservation-model-name {
                font-size: 10px;
                color: #343434;
            }
        }
    }
</style>

<template>
    <div class="xc-reservations-model">
        <div class="xc-reservations-model-icon">
            <img :src="logo" alt="">
        </div>

        <div class="xc-reservation-model-info">
            <div class="xc-reservation-series-name">
                {{ seriesName }}
            </div>
            <div class="xc-reservation-model-name">
                {{ modelName }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            logo: String,
            seriesName: String,
            modelName: String
        }
    }
</script>