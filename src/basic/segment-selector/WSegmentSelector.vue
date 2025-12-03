<template>
  <div
    class="inline-flex items-center rounded-full bg-white p-1 border-2 border-black"
  >
    <button
      v-for="option in options"
      :key="option.value"
      @click="update(option.value)"
      :class="[
        'px-5 py-2 rounded-full text-sm font-bold transition-all duration-200',
        modelValue === option.value
          ? activeClass
          : inactiveClass
      ]"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
type Option = {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  modelValue: string
  options: Option[]
  activeClass?: string
  inactiveClass?: string
}>(), {
  activeClass: 'bg-orange-200 text-black',
  inactiveClass: 'text-black hover:bg-black/10',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const update = (value: string) => {
  emit('update:modelValue', value)
}
</script>
