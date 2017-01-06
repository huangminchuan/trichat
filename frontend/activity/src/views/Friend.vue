<template>
  <div id="friend">
    <div class="frend-header">快来看看有哪些好友给你加油了</div>
    <div class="friend-line" v-for="userData in addUserList">
      <img :src="userData.avatar"/>
      <span class="user-name">{{ userData.nickname }}</span>
      <span>为你注入100ml</span>
      <span>{{ userData.created_at }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      xcMobilConfig : window.xc_mobil_config,
      addUserList:""
    }
  },
  computed: {},
  ready: function () {
    $('html').addClass('bg-none');
    this.$http.get('/v2/mobil_promotion/add_user_list', {params:  {user_promotion_id	: this.xcMobilConfig.id}}).then(
      function(response){

        let responseData = response.data;
        if (typeof responseData === 'string') {
          responseData = JSON.parse(responseData);
        }

        this.addUserList=responseData.data;
      },
      function(response){
      }
    );
    zhuge.track('美孚机油活动-查看好友页面');
  },
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss">
  #friend {
    background-color: #fff;
    .frend-header {
      height:40px;
      line-height: 40px;
      background-color: #7DC8FF;
      font-size: 15px;
      color: #fff;
      text-align: center;
    }
    .friend-line {
      height: 70px;
      line-height: 70px;
      padding: 0 15px;
      position: relative;
      img {
        width: 10%;
        margin-right: 10px;
        vertical-align: -10px;
        border-radius: 17px;
      }
      span {
        font-size: 15px;
        color: #888;
        &:last-child {
          float: right;
        }
      }
      .user-name {
        display: inline-block;
        width: 70px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        height: 20px;
        line-height: 25px;
        margin-right: 25px;
        color: #343434;
      }
      &:after {
        position: absolute;
        content: '';
        bottom:0;
        left: 14%;
        width: 170%;
        height: 1px;
        background: #EAEAEA;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        opacity: .5;
      }
    }
  }
</style>
