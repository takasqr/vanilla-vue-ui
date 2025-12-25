<template>
  <div
    class="
      relative max-w-sm text-white select-none
      bg-black
      transition-all duration-150 ease-out
      origin-bottom
      animate-[dialogPop_0.2s_ease-out]
    "
    @click="skip"
  >
    <span>{{ displayText }}</span>

    <a
      v-if="isFinished && link"
      :href="link"
      class="
        ml-2 inline-block text-yellow-400
        animate-[dialogBlink_1.2s_steps(2)_infinite]
        hover:underline
      "
    >
      ▶ {{ linkLabel }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  link?: string
  linkLabel?: string
  autoStart?: boolean
}>(), {
  speed: 60,
  link: '',
  linkLabel: 'つづく',
  autoStart: true,
})

const displayText = ref('')
const isFinished = ref(false)

let index = 0
let timer: number | null = null

const start = () => {
  clear()
  displayText.value = ''
  isFinished.value = false
  index = 0

  timer = window.setInterval(() => {
    displayText.value += props.text[index]
    index++

    if (index >= props.text.length) finish()
  }, props.speed)
}

const finish = () => {
  clear()
  isFinished.value = true
}

const clear = () => {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

const skip = () => {
  if (!isFinished.value) {
    displayText.value = props.text
    finish()
  }
}

onMounted(() => {
  if (props.autoStart) start()
})

watch(() => props.text, () => {
  if (props.autoStart) start()
})

defineExpose({ start, finish })
</script>

<style scoped>
@keyframes dialogPop {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dialogBlink {
  50% { opacity: 0.3 }
}
</style>
