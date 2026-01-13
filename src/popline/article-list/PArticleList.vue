<template>
  <div class="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:gap-x-4">
    <div
      v-for="article in articles"
      :key="article.title"
      class="relative"
    >
      <p-article-list-item :article="article" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import PArticleListItem from '../article-list-item/PArticleListItem.vue'

type Article = {
  _path: string
  title: string
  createDate: string
  description: string
  cover: string
  category: string
  badges?: { bg: string, text: string, content: string }[]
  lang?: string
}

defineProps({
  articles: {
    type: Array as PropType<Article[]>,
    required: true,
  },
})
</script>
