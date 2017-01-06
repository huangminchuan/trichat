<template>
    <div>
        <div class="mask_panel" :style="{display: show ? 'block' :'none'}" @click="show=false"></div>
        <div class="white_panel" :style="{display: show ? 'block' :'none'}" @click="show=false">
          <slot></slot>
        </div>
    </div>
</template>
<style lang="less">
    .mask_panel{
      width:100%;
      height:100%;
      background: rgba(0,0,0,.6);
      position:fixed;
      top:0;
      z-index:10;
    }
    .white_panel{
      width:100%;
      position:absolute;
      bottom:0;
      left:0;
      min-height:150px;
      height:auto;
      max-height:400px;
      background-color:#fff;
      z-index:20;
    }
</style>
<script>
    export default{
      props: {
        show: {
          type: Boolean,
          required:true
        },
      }

    }
</script>
