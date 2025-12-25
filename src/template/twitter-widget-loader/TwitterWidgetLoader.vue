<template>
  <span class="hidden"></span>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const SCRIPT_SRC = 'https://platform.twitter.com/widgets.js'

onMounted(() => {
  // すでに読み込まれていたら二重読み込みしない
  const exists = document.querySelector<HTMLScriptElement>(
    `script[src="${SCRIPT_SRC}"]`,
  )
  if (exists) return

  const script = document.createElement('script')
  script.src = SCRIPT_SRC
  script.async = true
  script.charset = 'utf-8'

  document.head.appendChild(script)
})
</script>
