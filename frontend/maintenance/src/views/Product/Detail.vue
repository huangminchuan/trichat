<style lang="less">

</style>

<template>
<div>
    <other-product></other-product>
</div>
</template>

<script>
    import Banjin from 'views/Product/Banjin'
    import OtherProduct from 'views/Product/OtherProduct'

    export default {
        components: {
            Banjin,
            OtherProduct
        },
        data() {
            return {
                productId: 0
            };
        },
        ready() {
            const self = this;
            const state = this.$store.state;
            self.productId = self.$route.params.productId;
        }
    }
</script>
