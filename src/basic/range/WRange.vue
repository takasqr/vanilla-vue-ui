<template>
  <div class="flex">
    <MinusIcon
      class="w-6 fill-current flex-none"
      :class="[
        mergedClasses.icon?.color
      ]"
      @click="decrement()"
    />
    <div
      class="flex-1 px-2 flex items-center"
    >
      <input
       id="input-range"
       type="range"
       class="w-full"
       :class="[
          mergedClasses.content?.base,
          mergedClasses.content?.backgroundColor,
          mergedClasses.content?.rounded,
          mergedClasses.content?.size,
        ]"
       :min="min"
       :max="max"
       :step="step"
       :value="modelValue"
       @input="inputValue"
       >
    </div>
    <PlusIcon
      class="w-6 fill-current flex-none"
      :class="[
        mergedClasses.icon?.color,
      ]"
      @click="increment()"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, type PropType, ref } from 'vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import type { ClassObject } from '../../types/ClassObject';
import { deepMergeClassObject } from '../../util';

const props = defineProps({
  min: {
    type: Number as PropType<number>,
    default() {
      return 0
    }
  },
  max: {
    type: Number as PropType<number>,
    default() {
      return 100
    }
  },
  step: {
    type: Number as PropType<number>,
    default() {
      return 1
    }
  },
  modelValue: {
    type: Number as PropType<number>,
    default() {
      return 0
    }
  },
  classes: {
    type: Object as PropType<ClassObject>,
  }
})

const defaultClasses: ClassObject = {
  icon: {
    color: 'text-gray-500'
  },
  content: {
    base: 'appearance-none [-webkit-appearance: none]',
    backgroundColor: 'bg-gray-300',
    rounded: 'rounded-full',
    size: 'h-2'
  }
}

const inputRangeActiveColor = '#f59e0b'
const inputRangeInactiveColor = '#d1d5db'

type SliderBackgroundOptions = {
  value: number
  max: number
  min: number
}

function updateSliderBg(sliderBackgroundOptions: SliderBackgroundOptions) {
  const inputRange = document.getElementById('input-range') as HTMLInputElement
  if (inputRange) {
    const value = sliderBackgroundOptions.value
    const min = sliderBackgroundOptions.min
    const max = sliderBackgroundOptions.max
    const ratio = ((value - min) / (max - min)) * 100

    inputRange.style.background = `linear-gradient(90deg, ${inputRangeActiveColor} ${ratio}%, ${inputRangeInactiveColor} ${ratio}%)`
  }
}

onMounted(() => {
  // つまみの前後で色を塗り分ける
  const inputRange = document.getElementById('input-range') as HTMLInputElement

  if (inputRange) {
    updateSliderBg({ value: Number(modelValue.value), max: props.max, min: props.min }) // 初期値を反映
    inputRange.addEventListener('input', function (e) {
      updateSliderBg({ value: Number(modelValue.value), max: props.max, min: props.min })
    })
  }
})

// props.classesが渡されていない場合、defaultClassesを使用する
const mergedClasses = props.classes ? deepMergeClassObject(defaultClasses, props.classes) : defaultClasses;

const modelValue = ref<string>(props.modelValue.toString())

const emit = defineEmits<{
  customInput: [value: Event],
  'update:modelValue': [value: number]
}>()

function increment() {
  if (Number(modelValue.value) < props.max) {
    const number = Number(modelValue.value)
    modelValue.value = (number + props.step).toString()
    emitCustomEvent(modelValue.value)
    emit('update:modelValue', Number(modelValue.value))

    updateSliderBg({ value: Number(modelValue.value), max: props.max, min: props.min})
  }
}

function decrement() {
  if (Number(modelValue.value) > props.min) {
    const number = Number(modelValue.value)
    modelValue.value = (number - props.step).toString()
    emitCustomEvent(modelValue.value)
    emit('update:modelValue', Number(modelValue.value))

    updateSliderBg({ value: Number(modelValue.value), max: props.max, min: props.min})
  }
}

function inputValue(e: Event) {
  const target = e.target as HTMLInputElement | null
  
  if (target) {
    emitCustomEvent(target.value)
    modelValue.value = target.value

    emit('update:modelValue', Number(target.value))
  }
}

function emitCustomEvent(value: string) {
  const event = new CustomEvent('input', {
    detail: value
  })
  emit('customInput', event)
}
</script>

<style>
input[type="range"]::-webkit-slider-thumb {
  background-color: white;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgb(251, 191, 36);
}

input[type="range"]::-moz-range-thumb {
  background-color: white;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgb(251, 191, 36);
}
</style>
