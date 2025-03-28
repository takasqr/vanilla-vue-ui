<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Tooltip from './basic/tooltip/WTooltip.vue';
import { ref } from 'vue';

const isReact = ref(false)

</script>

<template>
  <!-- 3) :isReact="isReact" で子コンポーネントに受け渡す -->
  <Tooltip
    reactiveText="Clicked."
    :isReact="isReact"
  >
    <!-- 4) クリックで isReact.value = true と書いてリアクティブに変更する -->
    <Button @click="isReact = true">Text</Button>
  </Tooltip>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
