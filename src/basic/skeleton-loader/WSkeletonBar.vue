<template>
  <div
    class="animate-pulse bg-gray-200 rounded"
    :class="widthClass"
    :style="{ height: height + 'px' }"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

// Props の定義とデフォルト値
withDefaults(defineProps<{
  /** 幅を指定する Tailwind クラス */
  widthClass?: string
  /** 高さ(px) */
  height?: number
}>(), {
  // 幅はデフォルトで w-full
  widthClass: 'w-full',
  // 高さはデフォルトで 16px (1rem相当)
  height: 16,
})
</script>
