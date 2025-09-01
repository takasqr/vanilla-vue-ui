<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    /** fieldset のタイトル */
    title?: string
  }>(),
  {
    title: 'オプション', // デフォルト値
  }
)
</script>

<template>
  <div>
    <fieldset class="border-dashed border-2 border-gray-300 rounded-lg p-4">

      <legend class="px-1 text-onSurface dark:text-onSurface-dark">{{ props.title }}</legend>

      <slot />
    </fieldset>
  </div>
</template>
