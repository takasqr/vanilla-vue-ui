<template>
  <div class="border rounded-xl border-gray-300 p-4 animate-pulse space-y-4">
    <!-- タイトルっぽいバー -->
    <WSkeletonBar widthClass="w-3/4" :height="24" />

    <!-- テキストっぽいバーたち -->
    <div class="space-y-2">
      <WSkeletonBar widthClass="w-full" :height="16" />
      <WSkeletonBar widthClass="w-5/6" :height="16" />
      <WSkeletonBar widthClass="w-4/6" :height="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WSkeletonBar from './WSkeletonBar.vue'
</script>
