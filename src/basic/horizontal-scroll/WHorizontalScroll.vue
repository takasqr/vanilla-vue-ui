<template>
  <div
    class="flex overflow-x-scroll custom-scrollbar"
    :class="{ 'no-scrollbar': scrollbarWidth === 'none' }"
    :style="cssVars"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ScrollbarWidth = 'auto' | 'thin' | 'none'

const props = withDefaults(defineProps<{
  /** Firefox の scrollbar-width に渡す（auto | thin | none） */
  scrollbarWidth?: ScrollbarWidth
}>(), {
  scrollbarWidth: 'thin',
})

/**
 * CSS 変数を使って各ブラウザに反映
 * - Firefox: scrollbar-width（キーワードのみ）
 * - WebKit系: ::-webkit-scrollbar の width/height をサイズ対応
 */
const cssVars = computed(() => {
  // WebKit のサイズをキーワードに合わせてだいたいの幅にマッピング
  const webkitSize =
    props.scrollbarWidth === 'thin' ? '8px'
    : props.scrollbarWidth === 'none' ? '0px'
    : '16px' // auto 相当

  return {
    '--scrollbar-width': props.scrollbarWidth,   // Firefox 向け（auto/thin/none）
    '--webkit-scrollbar-size': webkitSize,       // Chromium/Safari 向け
  } as Record<string, string>
})

const scrollbarWidth = props.scrollbarWidth
</script>

<style scoped>
.custom-scrollbar {
  /* Firefox */
  scrollbar-width: var(--scrollbar-width);
}

/* Chromium / Safari */
.custom-scrollbar::-webkit-scrollbar {
  width: var(--webkit-scrollbar-size);
  height: var(--webkit-scrollbar-size);
}

/* 完全に非表示（スクロール自体は可能） */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
