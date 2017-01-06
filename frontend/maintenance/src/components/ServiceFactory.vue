<style lang="less" scoped>
    .xc-service-factory {
        width: 100%;
        height: 140px;
        box-sizing: border-box;
        padding-left: 15px;
        background-color: #FFFFFF;

        .service-title {
            height: 52px;
            line-height: 52px;
            font-size: 15px;
            color: #343434;
            text-align: left;
        }

        .factory-item-list {
            height: 88px;
            list-style: none;

            .factory-item {
                position: relative;
                list-style: none;
                width: 100%;
                padding-top: 10px;;

                .factory-item-info {
                    height: 36px;
                    line-height: 36px;
                    font-size: 16px;
                    color: #343434;

                    .xc-factory-icon {
                        margin-right: 6px;
                        font-size: 18px;
                        color: #44A7EF;
                    }

                    .contact-us {
                        color: #FFFFFF;
                        background-color: #44A7EF;
                        border-radius: 4px;
                        padding: 2px 7px;
                        font-size: 14px;;
                    }
                }

                .factory-item-address {
                    height: 32px;
                    line-height: 32px;
                    color: #888888;
                }
            }
        }
    }
</style>

<template>
    <div class="xc-service-factory">
        <div class="service-title">
            服务门店
        </div>
        <ul class="factory-item-list">
            <li class="factory-item xc-1px-top">
                <div class="factory-item-info">
                    <i class="iconfont xc-factory-icon">&#xe600;</i>双柏路店(上海) <a class="contact-us" href="tel:02164023587">联系门店
                    </a>
                </div> 
                <div class="factory-item-address">
                    上海市闵行区双柏路1299号
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {

    }
</script>