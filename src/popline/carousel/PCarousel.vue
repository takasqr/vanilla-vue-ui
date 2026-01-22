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
        :key="name"
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
import { ref, computed, onMounted, onUnmounted, useSlots } from 'vue'

/* ===== slots ===== */
const slots = useSlots()

const slideNames = computed(() =>
  Object.keys(slots)
    .filter((k) => k.startsWith('slide-'))
    .sort((a, b) => {
      const na = Number(a.replace('slide-', ''))
      const nb = Number(b.replace('slide-', ''))
      return na - nb
    })
)

/* ダミー込みスライド（無限用） */
const loopSlides = computed(() => {
  const names = slideNames.value
  if (names.length === 0) return []
  return [names[names.length - 1], ...names, names[0]]
})

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
  if (w < 640) return 0.8     // スマホ
  if (w < 1024) return 0.6    // タブレット
  return 0.4                 // PC
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
const normalizeIndex = () => {
  if (currentIndex.value <= 0) {
    jumpTo(loopSlides.value.length - 2)
  }
  if (currentIndex.value >= loopSlides.value.length - 1) {
    jumpTo(1)
  }
}

const onTransitionEnd = () => {
  normalizeIndex()
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
  const container = inner.value.parentElement
  if (!container) return

  const containerWidth = container.clientWidth
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

/* ===== visibility handling ===== */
const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAuto()
  } else {
    normalizeIndex()
    calculateLayout()
    startAuto()
  }
}

/* ===== lifecycle ===== */
onMounted(() => {
  calculateLayout()
  startAuto()
  window.addEventListener('resize', calculateLayout)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  stopAuto()
  window.removeEventListener('resize', calculateLayout)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>
