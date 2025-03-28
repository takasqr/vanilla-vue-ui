<template>
  <ul role="list" class="flex flex-1 flex-col gap-y-7">
    <li>
      <ul role="list" class="-mx-2 space-y-1">
        <li v-for="item in navigationItems" :key="item.name">

          <SecondaryButton v-if="item.onClick" block @click="clickNavigation(item.onClick)">
            <component :is="item.icon" :class="[item.current ? 'text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark group-hover:text-primary dark:group-hover:text-primary-dark', 'h-6 w-6 shrink-0 inline mx-2']" aria-hidden="true" />
            {{ item.name }}
          </SecondaryButton>

          <!-- メインアイテム -->
          <div v-else class="flex hover:bg-surfaceHover dark:hover:bg-surfaceHover-dark text-onSurface dark:text-onSurface-dark hover:text-primary dark:hover:text-primary-dark rounded-xl">

            <!-- メインアイテム（リンク） -->
            <a
              v-if="item.subItems === undefined"
              :href="item.href"
              :class="[
                item.current ? 'bg-surfaceHover dark:bg-surfaceHover-dark text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark hover:text-primary dark:hover:text-primary-dark hover:bg-surfaceHover dark:hover:bg-surfaceHover-dark',
                'group flex-auto flex gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current ? 'text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark group-hover:text-primary dark:group-hover:text-primary-dark',
                  'h-6 w-6 shrink-0'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>

            <!-- メインアイテム（矢印） -->
            <span
              v-else
              :class="[
                item.current ? 'bg-surfaceHover dark:bg-surfaceHover-dark text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark hover:text-primary dark:hover:text-primary-dark hover:bg-surfaceHover dark:hover:bg-surfaceHover-dark',
                'group flex-auto flex gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold'
              ]"
              @click="toggleSubItems(item)">

              <!-- <div class="text-onSurface dark:text-onSurface-dark"> -->
                <component
                  :is="ChevronRightIcon"
                  v-if="item.isOpen === false"
                  :class="[
                    'text-onSurface dark:text-onSurface-dark',
                    'h-6 w-6 shrink-0 inline'
                  ]"
                />
                <component
                  :is="ChevronDownIcon"
                  v-if="item.isOpen === true"
                  :class="[
                    'text-onSurface dark:text-onSurface-dark',
                    'h-6 w-6 shrink-0 inline'
                  ]"
                />
              <!-- </div> -->

              <!-- ここまで -->
              <component
                :is="item.icon"
                :class="[
                  item.current ? 'text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark group-hover:text-primary dark:group-hover:text-primary-dark',
                  'h-6 w-6 shrink-0'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </span>
          </div>

          <!-- サブアイテム -->
          <template v-if="item.subItems && item.isOpen === true">
            <ul role="list" class="ml-4 space-y-1">
              <li v-for="subItem in item.subItems" :key="subItem.name">
                <SecondaryButton v-if="subItem.onClick" block @click="clickNavigation(subItem.onClick)">
                  <component :is="subItem.icon" :class="[subItem.current ? 'text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark group-hover:text-primary dark:group-hover:text-primary-dark', 'h-6 w-6 shrink-0 inline mx-2']" aria-hidden="true" />
                  {{ subItem.name }}
                </SecondaryButton>

                <a
                  v-else
                  :href="subItem.href"
                  :class="[
                    subItem.current ? 'bg-surfaceHover dark:bg-surfaceHover-dark text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark hover:text-primary dark:hover:text-primary-dark hover:bg-surfaceHover dark:hover:bg-surfaceHover-dark',
                    'group flex gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold'
                  ]"
                >
                  <component
                    :is="subItem.icon"
                    :class="[
                      subItem.current ? 'text-primary dark:text-primary-dark' : 'text-onSurface dark:text-onSurface-dark group-hover:text-primary dark:group-hover:text-primary-dark',
                      'h-6 w-6 shrink-0'
                    ]"
                    aria-hidden="true"
                  />
                  {{ subItem.name }}
                </a>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TreeMenuContent } from './TreeMenuContent'
import { ref, type PropType } from 'vue'
import {
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'
import SecondaryButton from '../secondary-button/WSecondaryButton.vue'

const props = defineProps({
  navigationItems: {
    type: Array as PropType<TreeMenuContent[]>,
    required: true
  }
})

const navigationItems = ref(props.navigationItems)

function clickNavigation(func: (() => void) | null | undefined) {
  if (func) {
    func();
  } else {
    console.error("func is null or undefined");
  }
}

function toggleSubItems(item: TreeMenuContent) {
  navigationItems.value = navigationItems.value.map((currentItem: TreeMenuContent) => {
    if (currentItem.name === item.name) {

      if (currentItem.isOpen === true) {
        currentItem.isOpen = false
      } else {
        currentItem.isOpen = true
      }
      
    }
    return currentItem
  })
}
</script>