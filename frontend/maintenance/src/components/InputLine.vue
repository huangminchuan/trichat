<style lang="less">
    .xc-input-line {
        position: relative;
        display: flex;
        width: 100%;
        height: 60px;
        background-color: #ffffff;
        align-items: center;

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

        &:last-of-type:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            background: #EAEAEA;
            width: 100%;
            height: 0px;
            -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
            -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
        }

        .xc-input-icon {
            position: relative;
            left: -2px;
            margin-right: 2px;
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;

            .iconfont {
                font-size: 18px;
                color: #0F8AD9;
            }
        }

        .xc-input-block {
            flex: 1;
            height: 22px;
            line-height: 22px;
            font-size: 16px;
            color: #343434;
            align-items: center;

            .xc-input-field {
                padding-right: 15px;
                width: 100%;
                height: 22px;
                border: 0;
                outline: 0;
                -webkit-appearance: none;
                background-color: transparent;
                font-size: inherit;
                color: inherit;
                height: 1.41176471em;
                line-height: 1.41176471;
            }
        }
    }
</style>

<template>
    <div class="xc-input-line" :style="{borderTop:borderTop}">
        <div class="xc-input-icon">
            <i class="iconfont">{{ icon }}</i>
        </div>
        <div class="xc-input-block">
            <input type="text" name="option" v-model="option" :placeholder="placeholder" class="xc-input-field">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            option: {
                required: false
            },
            placeholder: {
                type: String,
                required: false
            },
            icon: {
                type: String,
                required: false
            },
            borderTop: {
                type: String,
                required: false
            }
        }
    }
</script>