<template lang="html">
  <div id="list">
    <div class="board" @click="clearBoard"></div>
    <div class="list-area">
      <div class="team" v-for="item in mobil_config.start_promotions" @click="enter($event)" :activity="item.id">
        <img class="icon-img" src="/bundles/app/crazy_img/team-icon.png"/>
        <p class="one-line clearfix">
          <span class="first-span">{{ item.nickname }}的小组</span>
          <span class="last-span"  v-if="10 - item.join_num">差{{ 10 - item.join_num }}人组团成功</span>
          <span class="last-span" v-else>组团成功</span>
        </p>
        <p class="two-line clearfix">
          <span>{{ item.created_at.substring(5) }}</span>
          <span>立即查看</span>
        </p>
      </div>
      <div class="team" v-for="item in mobil_config.join_promotions" @click="enter($event)" :activity="item.id">
        <img class="icon-img" src="/bundles/app/crazy_img/buy-icon.png"/>
        <p class="one-line clearfix">
          <span class="first-span">{{ item.nickname }}的小组</span>
          <span class="last-span" v-if="10 - item.join_num">差{{ 10 - item.join_num }}人组团成功</span>
          <span class="last-span" v-else>组团成功</span>
        </p>
        <p class="two-line clearfix">
          <span>{{ item.created_at.substring(5) }}</span>
          <span>立即查看</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      mobil_config: window.xc_mobil_config
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {
    clearBoard: function () {
      this.$parent.listShow = false;
    },
    enter: function (event) {
      var currentId = $(event.currentTarget).attr('activity');
      var currentHost = 'http://' + window.location.host;
      var random = parseInt( Math.random() * 10 );
      window.location.href = currentHost + '/wx/mobil_promotion_2/id/' + currentId + '/source?v=' + random + '#!/order';
    }
  },
  components: {}
}
</script>

<style lang="scss">
  #list {
    .list-area {
      width: 80%;
      padding: 15px;
      z-index: 11;
      box-sizing: border-box;
      background-color: #fff;
      position:fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 6px;
      .team {
        padding: 20px;
        position: relative;
        border-radius: 6px;
        margin-bottom: 15px;
        .icon-img {
          position: absolute;
          left: 0;
          top: 0;
          width: 40px;
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          border: 1px solid #dcdcdc;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 200%;
          height: 200%;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          -webkit-transform-origin: left top;
          transform-origin: left top;
        }
        &:last-child {
          margin-bottom: 0;
        }
        .one-line {
          font-size: 14px;
          position: relative;
          margin-bottom: 15px;
          .first-span {
            float: left;
            width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #343434;
          }
          .last-span {
            width: 40%;
            color: #F83F23;
            float: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
          }
        }
        .two-line {
          span {
            float: left;
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #343434;
            &:last-child {
              width: 30%;
              color: #349FEC;
              float: right;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>
