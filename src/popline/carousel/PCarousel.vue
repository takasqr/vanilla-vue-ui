<template>
  <div
    class="relative overflow-hidden bg-white py-6 pb-20"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
    @focusin="stopAuto"
    @focusout="startAuto"
  >
    <!-- slides -->
    <div
      ref="inner"
      class="flex gap-6"
      :class="{
        'transition-transform duration-500 ease-out': isTransition
      }"
      :style="{
        transform: `translateX(${offset - currentIndex * slideStep}px)`
      }"
      @transitionend="onTransitionEnd"
    >
      <div
        v-for="(name, index) in loopSlides"
        :key="index"
        class="
          shrink-0 w-[75%]
          rounded-2xl overflow-hidden
          border-2 border-black
          transition-all duration-300
        "
        :class="
          index === currentIndex
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-40'
        "
      >
        <slot :name="name" />
      </div>
    </div>

    <!-- navigation -->
    <button
      type="button"
      class="absolute left-6 bottom-6 font-bold tracking-wider"
      @click="prev"
    >
      ← PREV
    </button>

    <button
      type="button"
      class="absolute right-6 bottom-6 font-bold tracking-wider"
      @click="next"
    >
      NEXT →
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useSlots } from 'vue'

/* ===== slots ===== */
const slots = useSlots()
const slideNames = Object.keys(slots).filter(k =>
  k.startsWith('slide-')
)

/* ダミー込みスライド */
const loopSlides = [
  slideNames[slideNames.length - 1],
  ...slideNames,
  slideNames[0],
]

/* ===== state ===== */
const currentIndex = ref(1) // ← 最初は「本物の1枚目」
const isTransition = ref(true)

const slideWidth = ref(0)
const slideStep = ref(0)
const offset = ref(0)

const inner = ref<HTMLElement | null>(null)

/* ===== auto scroll ===== */
const INTERVAL = 2000
let timer: number | null = null

const next = () => {
  currentIndex.value++
}

const prev = () => {
  currentIndex.value--
}

/* ===== infinite loop core ===== */
const onTransitionEnd = () => {
  // 末尾ダミー → 本物の先頭
  if (currentIndex.value === loopSlides.length - 1) {
    jumpTo(1)
  }

  // 先頭ダミー → 本物の末尾
  if (currentIndex.value === 0) {
    jumpTo(loopSlides.length - 2)
  }
}

const jumpTo = (index: number) => {
  isTransition.value = false
  currentIndex.value = index
  requestAnimationFrame(() => {
    isTransition.value = true
  })
}

/* ===== layout ===== */
const calculateLayout = () => {
  const firstSlide = inner.value?.children[0] as HTMLElement
  if (!firstSlide || !inner.value) return

  const gap = 24
  slideWidth.value = firstSlide.offsetWidth
  slideStep.value = slideWidth.value + gap
  offset.value = (inner.value.clientWidth - slideWidth.value) / 2
}

/* ===== auto control ===== */
const startAuto = () => {
  if (timer !== null) return
  timer = window.setInterval(next, INTERVAL)
}

const stopAuto = () => {
  if (timer === null) return
  clearInterval(timer)
  timer = null
}

/* ===== lifecycle ===== */
onMounted(() => {
  calculateLayout()
  startAuto()
  window.addEventListener('resize', calculateLayout)
})

onUnmounted(() => {
  stopAuto()
  window.removeEventListener('resize', calculateLayout)
})
</script>
