<style lang="less">
    .xc-group-footer {
        box-sizing: border-box;
        position: fixed;
        padding: 0 15px;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 62px;
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        justify-content: center;
        
        .xc-group-footer-btn {
            margin-right: 15px;
            box-sizing: border-box;
            line-height: 42px;
            height: 42px;
            flex: 1;
            width: 50%;
            color: #FFFFFF;
            background-color: #44A7EF;
            text-align: center;
            border-radius: 3px;

            &:last-of-type {
                margin-right: 0;
            }
        }
    }
</style>

<template>
    <div class="xc-group-footer">
        <a class="xc-group-footer-btn xc-group-footer-confirm" @click="confirm">{{ confirmText || '确认' }}</a>
        <a class="xc-group-footer-btn xc-group-footer-addnew" @click="new">{{ addnewText || '添加新地址' }}</a>
    </div>
</template>

<script>
    export default {
        props: {
            confirmText: {
                type: String,
                required: false
            },
            addnewText: {
                type: String,
                required: false
            },
            confirmRoute: {
                type: String            
            },
            addnewRoute: {
                type: String
            }
        },
        methods: {
            confirm() {
                this.$dispatch('footer-confirm');
            },
            new() {
                this.$dispatch('footer-new');
            }
        }
    }
</script>