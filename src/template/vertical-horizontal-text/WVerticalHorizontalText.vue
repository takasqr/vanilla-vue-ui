<template>
  <div>
    <div
      v-if="isVertical"
      class="vertical-container"
    >
      <div
        class="vertical-column"
        :style="verticalColumnStyle"
      >
        <span
          v-for="(char, index) in resultArray"
          :key="index"
          class="vertical-char"
        >
          {{ char }}
        </span>
      </div>
    </div>

    <div
      v-else
      class="horizontal-container"
    >
      <div class="horizontal-scroll">
        <p :style="computedStyle">
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  fontSize: {
    type: Number,
    default: 4,
  },
  isVertical: {
    type: Boolean,
    default: false,
  },
})

const resultArray = computed(() => props.text.split(''))

const verticalColumnStyle = computed(() => ({
  fontSize: `${props.fontSize}rem`,
  lineHeight: '1.2',
}))

const computedStyle = computed(() => ({
  fontSize: `${props.fontSize}rem`,
  lineHeight: `${props.fontSize + 0.5}rem`,
}))
</script>

<style scoped>
.serif__app--result p {
  line-height: 3.5rem;
  font-size: 3rem;
}

.vertical-container {
  writing-mode: initial !important;
  display: flex;            /* 中央寄せのために flex 化 */
  justify-content: center;  /* 左右中央 */
  align-items: center;      /* 上下中央 */
  width: 100%;              /* 全幅に広げる */
}

.vertical-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1em;
}

.vertical-char {
  font-size: inherit;
  line-height: 1.2;
  display: block;
}

.horizontal-container {
  width: 100%;
  overflow: hidden; /* 親は隠すだけ。スクロールは子が担当 */
}

.horizontal-scroll {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  /* このコードをリリースする時にWebのCursiveとフォントチェッカーのコードを消す */
  padding: 25px 15px;
  scrollbar-width: thin;
}
</style>
