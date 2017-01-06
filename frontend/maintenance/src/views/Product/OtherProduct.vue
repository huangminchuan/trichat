<style lang="less" scoped>
    .xc-container {
        position: relative;
        background: #FFFFFF;
        width: 100%;
    }

    .xc-item {
        margin-bottom: 10px;
    }

    .xc-last-item {
        margin-bottom: 65px;
    }

    .xc-item-img {
        width: 100%;
    }

    .xc-footer-tel {
        position: fixed;
        bottom: 0px;
        left: 0px;
        box-sizing: border-box;
        width: 100%;
        height: 62px;
        background-color: #FFFFFF;
        text-align: center;
        padding: 10px 15px;
        line-height: 62px;
    }

    .xc-tel {
        display: block;
        width: 100%;
        height: 100%;
        line-height:42px;
        background-color: #44A7EF;
        color: #FFFFFF;
        border-radius: 4px;
        text-decoration: none;
    }
</style>

<template>
    <div class="xc-container">
        <div class="xc-item">
            <img class="xc-item-img" src="/bundles/app/img/maintenance_products/1.jpg" alt="">
        </div>

        <div class="xc-item">
            <img class="xc-item-img" src="/bundles/app/img/maintenance_products/2.jpg" alt="">
        </div>

        <div class="xc-item">
            <img class="xc-item-img" src="/bundles/app/img/maintenance_products/3.jpg" alt="">
        </div>

        <div class="xc-item">
            <img class="xc-item-img" src="/bundles/app/img/maintenance_products/4.jpg" alt="">
        </div>

        <div class="xc-item">
            <img class="xc-item-img" src="/bundles/app/img/maintenance_products/5.jpg" alt="">
        </div>

        <div class="xc-item">
            <img class="xc-item-img" src="/bundles/app/img/maintenance_products/6.jpg" alt="">
        </div>

        <div class="xc-item xc-last-item">
            <img class="xc-item-img" src="/bundles/app/img/maintenance_products/7.jpg" alt="">
        </div>

        <div class="xc-footer-tel">
            <a class="xc-tel" href="tel:02164023587">立即预约</a>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>