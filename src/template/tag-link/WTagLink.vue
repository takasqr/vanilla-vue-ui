<template>
  <a
    :href="to"
    class="
      inline-flex items-center
      h-8 pr-2 p-0
      gap-2
      rounded-full
      bg-white
      box-border border-2 border-black
      shadow-sm
      hover:shadow-md
      hover:-translate-y-0.5
      transition-all duration-150
      relative
    "
  >
    <span
      class="
        flex items-center justify-center
        h-8 w-8
        rounded-full
        bg-orange-400
        text-white
        text-2xl
        shrink-0
        absolute -top-0.5 -left-1
        border-2 border-black
      "
    >
      #
    </span>

    <span
      class="
        text-gray-800
        text-sm
        font-medium
        truncate
        pl-8
      "
    >
      <slot />
    </span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
