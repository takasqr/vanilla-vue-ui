<template>
  <div
    class="
      relative overflow-hidden
      bg-white
      py-6 pb-20
    "
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
    @focusin="stopAuto"
    @focusout="startAuto"
  >
    <!-- slides -->
    <div
      ref="inner"
      class="
        flex gap-6
        transition-transform duration-500 ease-out
      "
      :style="{
        transform: `translateX(${offset - currentIndex * slideStep}px)`
      }"
    >
      <div
        v-for="(_, index) in slides"
        :key="index"
        class="
          shrink-0 w-[75%]
          rounded-2xl overflow-hidden
          transition-all duration-300
          border-2 border-black
        "
        :class="
          index === currentIndex
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-40'
        "
      >
        <slot :name="`slide-${index}`" />
      </div>
    </div>

    <!-- navigation -->
    <button
      type="button"
      class="
        absolute left-6 bottom-6
        font-bold tracking-wider
        cursor-pointer
        group
      "
      @click="prev"
    >
      ← PREV
      <span
        class="
          block mt-1 h-0.5 w-full
          bg-gray-200
          group-hover:bg-gray-400
          transition-colors
        "
      />
    </button>

    <button
      type="button"
      class="
        absolute right-6 bottom-6
        font-bold tracking-wider
        cursor-pointer
        group
      "
      @click="next"
    >
      NEXT →
      <span
        class="
          block mt-1 h-0.5 w-full
          bg-gray-200
          group-hover:bg-gray-400
          transition-colors
        "
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useSlots } from 'vue'

/* ===== state ===== */
const currentIndex = ref(0)
const slideWidth = ref(0)
const slideStep = ref(0)
const offset = ref(0)

const inner = ref<HTMLElement | null>(null)
const slots = useSlots()

/* ===== slides ===== */
const slides = Object.keys(slots).filter(key =>
  key.startsWith('slide-')
)

/* ===== auto scroll ===== */
const INTERVAL = 5000 // 5秒
let timer: number | null = null

/* ===== lifecycle ===== */
onMounted(() => {
  const firstSlide = inner.value?.children[0] as HTMLElement
  if (!firstSlide || !inner.value) return

  const gap = 24 // gap-6 (px)
  slideWidth.value = firstSlide.offsetWidth
  slideStep.value = slideWidth.value + gap

  // 初期状態で中央に配置
  offset.value = (inner.value.clientWidth - slideWidth.value) / 2

  startAuto()
})

onUnmounted(() => {
  stopAuto()
})

/* ===== navigation ===== */
const next = () => {
  currentIndex.value =
    (currentIndex.value + 1) % slides.length
}

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + slides.length) % slides.length
}

/* ===== auto control ===== */
const startAuto = () => {
  if (timer !== null) return
  timer = window.setInterval(() => {
    next()
  }, INTERVAL)
}

const stopAuto = () => {
  if (timer === null) return
  clearInterval(timer)
  timer = null
}
</script>
