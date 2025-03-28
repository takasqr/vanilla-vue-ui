<template>
  <footer class="fixed bottom-0">
    <div class="mb-4 ml-4">
      <p class="text-center text-xs leading-5 text-gray-500">{{ props.text }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'

const props = defineProps({
  text: {
    type: String as PropType<string>,
    required: false,
    default: `© 2020 Your Company, Inc. All rights reserved.`
  }
})

</script>