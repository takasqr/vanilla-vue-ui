<template>
  <input
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
</template>

<script setup lang="ts">
import { defineProps, type PropType, ref } from 'vue'
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
    backgroundColor: 'bg-gray-400',
    rounded: 'rounded-full',
    size: 'h-2'
  }
}

// props.classesが渡されていない場合、defaultClassesを使用する
const mergedClasses = props.classes ? deepMergeClassObject(defaultClasses, props.classes) : defaultClasses;

const modelValue = ref<string>(props.modelValue.toString())

const emit = defineEmits<{
  customInput: [value: Event],
  'update:modelValue': [value: number]
}>()

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
