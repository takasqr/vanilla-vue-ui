<template>
  <article class="flex h-full flex-col items-start border-2 border-black bg-white p-2 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div class="relative w-full overflow-hidden rounded-xl">
      <a
        :href="withTrailingSlash(props.article._path)"
        :aria-label="props.article.title"
      >
        <img
          loading="lazy"
          :src="props.article.cover"
          alt=""
          aria-hidden="true"
          class="
            aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]
            w-full
            rounded-2xl
            scale-105
            bg-gray-100
            object-cover
            origin-center
          "
        >
        <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </a>
    </div>
    <div class="max-w-xl">
      <div class="mt-1 flex items-center gap-x-4 text-xs">
        <time
          :datetime="props.article.createDate"
          class="text-gray-500"
        >{{ props.article.createDate }}</time>
      </div>
      <div class="group relative">
        <h3 class="mt-0 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a
            :href="withTrailingSlash(props.article._path)"
            class="line-clamp-3 md:line-clamp-3"
          >
            <span class="absolute inset-0" />
            {{ props.article.title }}
          </a>
        </h3>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

type Article = {
  _path: string
  title: string
  date: string
  description: string
  badges?: { bg: string, text: string, content: string }[]
  lang?: string
}

const props = defineProps({
  article: {
    type: Object,
    required: true,
    validator: (value: Article) => {
      if (value?._path && value.title) {
        return true
      }
      return false
    },
  },
})
</script>
