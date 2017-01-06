<style lang="less">
    .vux-toast {
        .weui_toast {
            min-height: 1em !important;
        }
        
        .weui_toast_text {
            height: 45px !important;
        }
    }
</style>

<template>
    <div class="xc-app">
        <router-view></router-view>
        <loading :show="loading" text="正在加载"></loading>
        <toast :type="toast.type" :show="toast.show" :width="toast.width" >
            <span>{{ toast.msg }}</span>
        </toast>

    </div>
</template>

<script>
    import store from './vuex/store.js'
    import Loading from 'vux-components/loading'
    import Toast from 'vux-components/Toast'
    export default {
        store,
        vuex: {
            getters: {
                loading: state => state.loading,
                toast: state => state.toast
            }
        },
        components: {
            Loading,
            Toast
        }
    }
    
</script>