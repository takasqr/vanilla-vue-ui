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
          shrink-0
          rounded-2xl overflow-hidden
          border-2 border-black
          transition-all duration-300
        "
        :style="{ width: `${slideWidth}px` }"
        :class="
          index === currentIndex
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-40 lg:opacity-80 lg:scale-100'
        "
      >
        <slot :name="name" />
      </div>
    </div>

    <!-- navigation -->
    <div class="relative max-w-3xl mx-auto">
      <button
        type="button"
        class="absolute left-6 -bottom-12 font-bold tracking-wider"
        @click="prev"
      >
        ← PREV
      </button>

      <button
        type="button"
        class="absolute right-6 -bottom-12 font-bold tracking-wider"
        @click="next"
      >
        NEXT →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useSlots } from 'vue'

/* ===== slots ===== */
const slots = useSlots()
const slideNames = Object.keys(slots).filter(key =>
  key.startsWith('slide-')
)

/* ダミー込みスライド（無限用） */
const loopSlides = [
  slideNames[slideNames.length - 1],
  ...slideNames,
  slideNames[0],
]

/* ===== state ===== */
const currentIndex = ref(1)
const isTransition = ref(true)

const slideWidth = ref(0)
const slideStep = ref(0)
const offset = ref(0)

const inner = ref<HTMLElement | null>(null)

/* ===== responsive width control ===== */
const getSlideWidthRatio = () => {
  const w = window.innerWidth

  if (w < 640) return 0.8     // スマホ：少しチラ見え
  if (w < 1024) return 0.6    // タブレット
  return 0.4                 // PC：左右フル表示
}

/* ===== auto scroll ===== */
const INTERVAL = 5000
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
  if (!inner.value) return

  const gap = 24
  const containerWidth = inner.value.clientWidth
  const ratio = getSlideWidthRatio()

  slideWidth.value = containerWidth * ratio
  slideStep.value = slideWidth.value + gap
  offset.value = (containerWidth - slideWidth.value) / 2
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
