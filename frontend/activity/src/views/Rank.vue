<template>
  <div id="rank">
    <div class="rank-header">看看你离大奖的距离</div>
    <div class="rank-line" v-for="userData in userDataList">
      <div class="rank-number">
        <img :src="'/bundles/app/activity_mobil/rank_' + userData.rank + '.png'" v-if="$key > 3 ? false : true" width="8%">
        <span class="rank-amount" v-if="$key <= 3 ? true : false">{{ userData.rank }}</span>
        <span class="rank-amount other-amount" v-else>{{ userData.rank }}</span>
      </div>
      <img class="rank-user-icon" :src="userData.avatar"  style="border-radius:15px;"/>
      <span class="rank-user-name">{{ userData.nickname }}</span>
      <div class="rank-ml">{{ userData.count }}00<i>ml</i></div>
    </div>
    <div v-for="userData in userDataList" v-if="!ifFriend">
      <div class="one-people-my" v-if="userData.is_self">
        <div class="rank-number">
          <span class="rank-amount">{{ userData.rank }}</span>
        </div>
        <img class="rank-user-icon" :src="userData.avatar"  style="border-radius:15px;"/>
        <span class="rank-user-name">{{ userData.nickname }}</span>
        <div class="rank-ml">{{ userData.count }}00<i>ml</i></div>
      </div>
    </div>

    <div class="one-people" v-if="ifFriend">
      <img src="../assets/platform.png"/>
      <span>没有对手的世界是孤独的再多的第一也毫无意义</span>
    </div>
    <div class="one-people-button" v-if="ifFriend" @click="shareOther">
      <div class="inner-button">快邀请好友来比拼吧</div>
    </div>
    <invite v-if="invShow"></invite>
  </div>
</template>

<script>
import invite from '../components/invite.vue';
export default {
  components: {
    invite
  },
  data: function () {
    return {
      xcMobilConfig : window.xc_mobil_config,
      ifFriend: false,
      userDataList:"",
      invShow: false
    }
  },
  methods: {
    shareOther () {
      this.invShow = true;
    }
  },
  ready:function() {
    $('html').addClass('bg-none');
    this.$http.get('/v2/mobil_promotion/ranking_list').then(
      function (response) {

        let responseData = response.data;
        if (typeof responseData === 'string') {
          responseData = JSON.parse(responseData);
        }

      this.userDataList=responseData.data;
      if ( !this.userDataList['2'] ) {
        this.ifFriend = true;
      }
    }, function (response) {
      console.log(response);
    });
    zhuge.track('美孚机油活动-排行榜页面');
  },
  computed:{
  }
}
</script>

<style lang="scss" scoped>
  #rank {
    padding-bottom: 70px;
     .rank-header {
       height:40px;
       line-height: 40px;
       background-color: #7DC8FF;
       font-size: 15px;
       color: #fff;
       text-align: center;
     }
     .rank-line {
       background-color: #fff;
       padding-left: 15px;
       padding-right: 15px;
       display: flex;
       height: 70px;
       align-items: center;
       position: relative;
       &:last-child {
         margin-bottom: 70px;
       }
       &:after {
         position: absolute;
         content: '';
         bottom:0;
         left: 16%;
         width: 168%;
         height: 1px;
         background: #EAEAEA;
         -webkit-transform: scaleX(0.5);
         transform: scaleX(0.5);
         -webkit-transform-origin: 0 0;
         transform-origin: 0 0;
         opacity: .5;
       }
       .rank-number {
         width: 8%;
         margin-right: 15px;
         margin-top: 4px;
         position: relative;
         .rank-amount {
           position: absolute;
           top: 50%;
           margin-top: -10px;
           left: 50%;
           margin-left: -4px;
           color: #fff;
         }
         .other-amount {
           font-size: 16px;
           color: #44A7EF;
         }
         img {
           width: 100%;
         }
       }
       .rank-user-icon {
         width: 30px;
         margin-right: 10px;
       }
       .rank-user-name {
         display: inline-block;
         width: 150px;
         white-space:nowrap;
         overflow:hidden;
         text-overflow:ellipsis;
         height: 25px;
         line-height: 27px;
         font-size: 16px;
         color: #343434;
       }
       .rank-ml {
         position: absolute;
         right: 15px;
         font-size: 20px;
         top: 50%;
         margin-top: -10px;
         i {
           font-size: 15px;
         }
       }
     }
     .one-people-my {
       position: fixed;
       width: 100%;
       bottom: 0;
       left: 0;
       background-color: #44A7EF;
       color: #fff;
       box-sizing: border-box;
       padding-left: 15px;
       padding-right: 15px;
       display: flex;
       height: 70px;
       align-items: center;
       &:after {
         position: absolute;
         content: '';
         bottom:0;
         left: 16%;
         width: 168%;
         height: 1px;
         background: #EAEAEA;
         -webkit-transform: scaleX(0.5);
         transform: scaleX(0.5);
         -webkit-transform-origin: 0 0;
         transform-origin: 0 0;
         opacity: .5;
       }
       .rank-number {
         width: 8%;
         margin-right: 15px;
         margin-top: 4px;
         position: relative;
         .rank-amount {
           position: absolute;
           top: 50%;
           margin-top: -10px;
           left: 50%;
           margin-left: -4px;
           color: #fff;
         }
         .other-amount {
           font-size: 16px;
           color: #44A7EF;
         }
         img {
           width: 100%;
         }
       }
       .rank-user-icon {
         width: 30px;
         margin-right: 10px;
       }
       .rank-user-name {
         display: inline-block;
         width: 150px;
         white-space:nowrap;
         overflow:hidden;
         text-overflow:ellipsis;
         height: 20px;
         line-height: 25px;
         font-size: 16px;
         color: #343434;
       }
       .rank-ml {
         position: absolute;
         right: 15px;
         font-size: 20px;
         top: 50%;
         margin-top: -10px;
         i {
           font-size: 15px;
         }
       }
       span {
         color: #fff!important;
       }
     }
     .one-people {
       position: fixed;
       left: 22%;
       width: 56%;
       text-align: center;
       top: 50%;
       margin-top: -65px;
       img {
         width: 100%;
         margin-bottom: 15px;
       }
       span {
         color: #90A9BB;
         font-size: 16px;
         line-height: 28px;
       }
     }
     .one-people-button {
       display: flex;
       width: 100%;
       justify-content: center;
       position: fixed;
       bottom: 30px;
       left: 0px;
       .inner-button {
         width: 73%;
         height: 50px;
         line-height: 50px;
         text-align: center;
         background-color: #44A7EF;
         border-radius: 6px;
         font-size: 16px;
         color: #fff;
       }
     }
  }
</style>
