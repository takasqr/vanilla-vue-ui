<template>
  <div
    :class="[
      mergedClasses.outline?.base,
      mergedClasses.outline?.backgroundColor,
    ]"
  >
    <label :for="name" :class="mergedClasses.label?.base">{{ label }}</label>
    <div class="relative flex">
      <div class="flex-1">
        <input
          :id="id"
          :name="name"
          :value="value"
          :placeholder="placeholder"
          :required="required"
          :autocomplete="autocomplete"
          :class="[
            textSize,
            mergedClasses.content?.input?.base,
            mergedClasses.content?.input?.backgroundColor,
            mergedClasses.content?.input?.color,
          ]"
          :type="type"
          @change="changeValue($event)"
          @input="inputValue($event)"
        >
      </div>
      
      <div class="flex-shrink-0">
        <slot name="trailing" />
      </div>
    </div>
  </div>
  <p v-if="errorMassage.length > 0" :class="mergedClasses.errorMessage?.base">{{ errorMassage }}</p>
</template>

<script setup lang="ts">
import { ref, defineProps, type PropType, defineExpose } from 'vue'
import type { ClassObject } from '../../types/ClassObject';
import { deepMergeClassObject } from '../../util';
// @ts-ignore
import type { TextFieldSize } from './TextFieldSize'

const props = defineProps({
  value: {
    type: String as PropType<string>
  },
  label: {
    type: String as PropType<string>
  },
  placeholder: {
    type: String as PropType<string>
  },
  type: {
    type: String as PropType<string>
  },
  autocomplete: {
    type: String as PropType<string>
  },
  required: {
    type: Boolean as PropType<boolean>
  },
  rules: {
    type: Array as PropType<ValidationRule[]>
  },
  size: {
    type: String as PropType<TextFieldSize>,
    default: 'base',
  },
  name: {
    type: String as PropType<string>
  },
  id: {
    type: String as PropType<string>
  },
  classes: {
    type: Object as PropType<ClassObject>,
  }
});


const defaultClasses: ClassObject = {
  content: {
    input: {
      base: "block w-full border-0 p-0 placeholder:text-gray-400 sm:leading-6 focus:outline-none focus:ring-0",
      backgroundColor: 'bg-surface dark:bg-surface-dark',
      color: 'text-onSurface dark:text-onSurface-dark'
    },
  },
  outline: {
    base: "rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-primary dark:focus-within:ring-primary-dark",
    backgroundColor: 'bg-surface dark:bg-surface-dark',
  },
  label: {
    base: "block text-xs font-medium text-onSurface dark:text-onSurface-dark"
  },
  errorMessage: {
    base: "mt-1 ml-1 text-sm text-red-600"
  }
}

// props.classesが渡されていない場合、defaultClassesを使用する
const mergedClasses = props.classes ? deepMergeClassObject(defaultClasses, props.classes) : defaultClasses;


const textSize = ref('text-' + props.size)

// emit を定義
const emit = defineEmits<{
  input: [value: Event],
  change: [value: Event]
}>()

const errorMassage = ref("")

type ValidationRule = (value: string) => boolean | string

//
// Sample
//
// let rules: ValidationRule[] = [
//   value => !!value || 'Required.', // required
//   value => value.length <= 20 || 'Max 20 characters', // max
//   value => {
//     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return pattern.test(value) || 'Invalid e-mail.'
//   }, // email
// ]

// 初回バリデーション
// undefined じゃなかったら
if (typeof props.value === "string") {
  const setupErrorMessage = validate(props.value)
  if (setupErrorMessage) {
    errorMassage.value = setupErrorMessage as string
  }
}

// input の変更を受け取る
function changeValue(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (target) {
    const validationResult = validate(target.value)
    if (validationResult === true) {
      // バリデーションに通ったら
      emit('change', event)
      errorMassage.value = ""; // エラーメッセージをクリア
    } else {
      errorMassage.value = validationResult as string; // エラーメッセージを設定
    }
  }
}

function inputValue(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (target) {
    const validationResult = validate(target.value)
    if (validationResult === true) {
      // バリデーションに通ったら
      errorMassage.value = ""; // エラーメッセージをクリア
    } else {
      errorMassage.value = validationResult as string; // エラーメッセージを設定
    }
  }

  emit('input', event)
}

// バリデーション
function validate(value: string): boolean | string {
  if (props.rules) {
    for (const rule of props.rules) {
      const result = rule(value);
      if (result !== true) {
        // ルールが文字列（エラーメッセージ）を返した場合、バリデーション失敗
        return result;
      }
    }
  }
  return true; // ルールが設定されてない or すべてのルールが成功
}

// 外部からも呼び出せるようにする
defineExpose({
  validate
});
</script>