<template>
  <div class="weui_cells_title">{{title}}</div>
  <div class="weui_cells weui_cells_checkbox">
    <label class="weui_cell weui_check_label" for="checkbox_{{uuid}}_{{index}}" v-for="(index,one) in options">
      <div class="weui_cell_hd">
        <input type="checkbox" class="weui_check" value="{{one | getKey}}" v-model="value" id="checkbox_{{uuid}}_{{index}}">
        <i class="weui_icon_checked"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary xc-flex-line">
        <p class="xc-flex-item">{{one | getValue}}</p>
        <p class="xc-flex-right">¥{{ one.price }}</p>
      </div>
    </label>
  </div>
  <tip v-show="!valid && dirty"><icon type="warn" class="icon_small"></icon>{{error}}</tip>
</template>

<script>
import Base from 'vux/src/libs/base'
import Tip from 'vux/src/components/tip'
import Icon from 'vux/src/components/icon'
import { getValue, getKey } from 'vux/src/components/checklist/object-filter'
import shuffle from 'array-shuffle'

export default {
  components: {
    Tip,
    Icon
  },
  filters: {
    getValue,
    getKey
  },
  mixins: [Base],
  props: {
    title: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      twoWay: true
    },
    max: Number,
    min: Number,
    fillMode: Boolean,
    randomOrder: Boolean
  },
  ready () {
    this.handleChangeEvent = true
    if (this.randomOrder) {
      this.options = shuffle(this.options)
    }
  },
  computed: {
    _total () {
      return this.fillMode ? (this.options.length + 1) : this.options.length
    },
    _min () {
      if (!this.required) {
        return 0
      }
      if (this.min) {
        if (this.min < 0) {
          return 1
        }
        if (this.min >= this._total) {
          return this._total
        }
        return this.min
      } else {
        return 1
      }
    },
    _max () {
      if (!this.required) {
        return this._total
      }
      if (this.max) {
        if (this.max > this._total) {
          return this._total
        }
        return this.max
      } else {
        return this._total
      }
    },
    valid () {
      return this.value.length >= this._min && this.value.length <= this._max
    },
    error () {
      let err = []
      if (this.value.length < this._min) {
        err.push(this.$interpolate('最少要选择{{_min}}个哦'))
      }
      if (this.value.length > this._max) {
        err.push(this.$interpolate('最多只能选择{{_max}}个哦'))
      }
      return err
    }
  },
  watch: {
    value (newVal) {
      this.$emit('on-change', JSON.parse(JSON.stringify(newVal)))
    }
  }
}
</script>

<style scoped lang="less">
    .weui_cells_checkbox > label > * {
      pointer-events: none;
    }

    .weui_cells_checkbox .weui_check:checked+.weui_icon_checked:before {
      color: #44A7EF;
    }

    .weui_cells_title {
        margin-top: 0px;
        margin-bottom: 0px;
        height: 44px;
        font-size: 15px;
        color: #576B95;
        line-height: 50px;
    }

    .xc-flex-line {
      display: -webkit-flex;
      display: flex;  

      .xc-flex-item {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        width: 0%;
      }

      .xc-flex-right {
        flex: none;
        color: #E28207;
      }
    }
</style>
