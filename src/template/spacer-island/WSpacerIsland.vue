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
        base: 'my-4 md:my-6 lg:my-10 xl:my-16'
      }
    }
  }
})
</script>