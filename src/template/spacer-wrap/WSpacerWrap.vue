<template>
  <div :class="classes.base">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ClassObject } from '../../types/ClassObject';
import { defineProps, type PropType } from 'vue';

defineProps({
  classes: {
    type: Object as PropType<ClassObject>,
    default() {
      return {
        base: 'm-1 p-1'
      }
    }
  }
})
</script>