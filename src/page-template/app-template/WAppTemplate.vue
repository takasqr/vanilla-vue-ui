<template>
  <slot name="header"></slot>

  <w-container>
    <w-spacer-island>
      <slot name="ad" />
    </w-spacer-island>

    <main>
      <w-spacer-island>
        <slot name="title"></slot>
      </w-spacer-island>

      <slot></slot>
    </main>

    <w-spacer-island>
      <slot name="bottom"></slot>
    </w-spacer-island>
  </w-container>

  <slot name="footer"></slot>
</template>

<script setup lang="ts">
import WContainer from '../../basic/container/WContainer.vue';
import WSpacerIsland from '../../template/spacer-island/WSpacerIsland.vue'
import WSpacerLadder from '../../template/spacer-ladder/WSpacerLadder.vue';
</script>
