<template>
  <div>
    <slot name="header" />

    <w-page-container-wide>
      <div class="bg-white mt-6 p-4 border-2 border-black rounded-2xl">
        <w-spacer-island>
          <slot name="ad" />
        </w-spacer-island>

        <w-spacer-island>
          <slot name="title" />
        </w-spacer-island>

        <slot name="meta" />

        <div class="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-4">
          <main class="min-w-0">
            <slot />
          </main>

          <aside>
            <div class="sticky top-4 w-full">
              <slot name="sidebar" />
            </div>
          </aside>
        </div>
      </div>

      <w-spacer-island>
        <slot name="bottom" />
      </w-spacer-island>
    </w-page-container-wide>

    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import WSpacerIsland from '../spacer-island/WSpacerIsland.vue'
import WPageContainerWide from '../page-container-wide/WPageContainerWide.vue'
</script>
