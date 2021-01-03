<template>
  <label :class="className" tabindex="0" role="checkbox" @keydown.space.prevent="keyToggle">
    <input type="checkbox" class="md-toggle-input" :name="name" :checked="modelValue" :disabled="disabled" tabindex="-1"
      @change.stop="toggle" />
    <div class="md-toggle-core" :style="coreStyle">
      <div class="md-toggle-switch-button" :style="buttonStyle" />
    </div>
    <template v-if="labels">
      <span class="md-toggle-label v-left" :style="labelStyle" v-if="toggled">
        <slot name="checked">
          {{ labels.checked }}
        </slot>
      </span>
      <span class="md-toggle-label v-right" :style="labelStyle" v-else>
        <slot name="unchecked">
          {{ labels.unchecked }}
        </slot>
      </span>
    </template>
  </label>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch
} from 'vue'

import {
  px,
  translate
} from './Utils'

export default defineComponent({
  name: 'MdToggleButton',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String
    },
    sync: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 300
    },
    color: {
      type: Object,
      default: () => {
        return {
          checked: '#00FF00',
          unchecked: '#FF0000',
          disabled: '#CCCCCC'
        }
      }
    },
    switchColor: {
      type: [String, Object]

    },
    cssColors: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Object,
      default: () => {
        return {
          checked: 'Evet',
          unchecked: 'Hayır'
        }
      }
    },
    height: {
      type: Number,
      default: 22
    },
    width: {
      type: Number,
      default: 50
    },
    margin: {
      type: Number,
      default: 3
    },
    fontSize: {
      type: Number
    }
  },

  setup (props, {
    emit
  }) {
    const toggled = ref(!!props.modelValue)

    const className = computed(() => {
      return [
        'md-toggle-button',
        {
          toggled: toggled.value,
          disabled: props.disabled
        }
      ]
    })

    const colorCurrent = computed(() => {
      return toggled.value ? props.color.checked : props.color.unchecked
    })

    const coreStyle = computed(() => {
      return {
        width: px(props.width),
        height: px(props.height),
        backgroundColor: props.cssColors
          ? null : props.disabled
            ? props.color.disabled : colorCurrent.value,
        borderRadius: px(Math.round(props.height / 2))
      }
    })

    const distance = computed(() => {
      return px(props.width - props.height + props.margin)
    })

    const switchColorCurrent = computed(() => {
      return toggled.value ? props.color.checked : props.color.unchecked
    })

    const buttonRadius = computed(() => {
      return props.height - props.margin * 2
    })

    const buttonStyle = computed(() => {
      const transition = `transform ${props.speed}ms`
      const margin = px(props.margin)

      const transform = toggled.value
        ? translate(distance.value, margin)
        : translate(margin, margin)

      const background = props.switchColor ? switchColorCurrent.value : null

      return {
        width: px(buttonRadius.value),
        height: px(buttonRadius.value),
        transition,
        transform,
        background
      }
    })

    const labelStyle = computed(() => {
      return {
        lineHeight: px(props.height),
        fontSize: props.fontSize ? px(props.fontSize) : null
      }
    })

    const toggle = (event: Event) => {
      toggled.value = !toggled.value
      emit('update:modelValue', toggled.value)
      emit('change', {
        value: toggled,
        tag: props.tag,
        srcEvent: event
      })
    }

    watch(() => props.modelValue, () => {
      toggled.value = props.modelValue
    })

    return {
      toggled,
      className,
      coreStyle,
      buttonStyle,
      labelStyle,
      toggle
    }
  }
})

</script>

<style lang="scss" scoped>
  .md-toggle-button {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    user-select: none;

    cursor: pointer;

    &:focus {
      outline: none;
      border: none;
    }

    .md-toggle-input {
      opacity: 0;
      position: absolute;
      width: 1px;
      height: 1px;

      &:focus {
        outline: none;
        border: none;
      }
    }

    .md-toggle-label {
      position: absolute;
      top: 0;
      color: white;
      z-index: 1;
      font-weight: 700;

      &.v-left {
        left: 10px;
      }

      &.v-right {
        right: 10px;
      }
    }

    .md-toggle-core {
      display: block;
      position: relative;
      box-sizing: border-box;

      outline: 0;
      margin: 0;

      transition: border-color 0.3s, background-color 0.3s;
      user-select: none;

      .md-toggle-switch-button {
        display: block;
        position: absolute;
        overflow: hidden;

        top: 0;
        left: 0;

        border-radius: 100%;
        background-color: #fff;
        z-index: 2;
      }
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  }

</style>
