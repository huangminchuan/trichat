<style lang="less">
    .xc-item-group {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background-color: #FFFFFF;
        font-size: 16px;

        .xc-item-group-title {
            position: relative;
            width: 100%;
            height: 44px;
            line-height: 44px;
            padding-left: 15px;
            color: #343434;
        }
    }

    .xc-group-items {
        padding-left: 15px;
    }

    .xc-no-group-title {
      margin-top:15px;
    }
</style>

<template>
    <div class="xc-item-group xc-1px-bottom">
        <div class="xc-item-group-title xc-1px-bottom" v-if="title" :style="{color:titleColor}" v-html="title">
            
        </div>

        <div class="xc-group-items xc-1px-bottom" :class="{'xc-no-group-title':!title}">
          <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: false
            },
            titleColor: {
                type: String,
                required: false
            }
        }
    }
</script>

