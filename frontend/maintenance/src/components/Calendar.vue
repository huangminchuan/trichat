<style media="screen" scoped>
    .xc-calendar {
        width: 100%;
        text-align: right;

    }

    .iconfont {
        color: #888888;
    }

    .xc-right-arrow {
        font-size: 14px;
    }
</style>

<template>
  <div class="xc-calendar" primary="content" :value="value" @click="onClick" is-link>
      <span v-if="value">{{ value }}</span>
      <span v-else><i class="iconfont xc-right-arrow">&#xe607;</i></span>
  </div>
  <popup :show.sync="show">
    <inline-calendar
    :value.sync="value"
    @on-change="onSelect"
    :render-month="renderMonth"
    :start-date="startDate",
    :end-date="endDate"
    :show-last-month="showLastMonth"
    :show-next-month="showNextMonth"
    :highlight-weekend="highlightWeekend"
    :return-six-rows="returnSixRows"
    :hide-header="hideHeader"
    :hide-week-list="true"
    :replace-text-list="replaceTextList"
    :weeks-list="weeksList"
    :custom-slot-fn="customSlotFn"
    :render-on-value-change="renderOnValueChange"
    :disable-past="disablePast"
    ></inline-calendar>
  </popup>
</template>

<script>
import InlineCalendar from 'vux-components/inline-calendar'
import Popup from 'vux-components/popup'
import Cell from 'vux-components/cell'
import props from 'vux-components/inline-calendar/props'

const Props = props()
Props.title = {
  type: String,
  required: true
}

export default {
  components: {
    InlineCalendar,
    Popup,
    Cell
  },
  props: Props,
  methods: {
    onClick () {
      this.show = true
    },
    onSelect () {
      this.show = false
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
