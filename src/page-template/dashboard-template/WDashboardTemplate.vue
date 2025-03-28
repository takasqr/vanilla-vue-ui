<template>
  <NavigationDrawer
    :title="props.title"
    :navigation-top="navigationTop"
    :navigation-bottom="navigationBottom"
  >
    <Banner />

    <div class="mt-4 lg:mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <Breadcrumb />

        <div class="mt-4 lg:mt-10">
          <slot />
        </div>
      </div>
    </div>

    <FooterSimple :text="props.footerText" />
  </NavigationDrawer>
</template>

<script setup lang="ts">
import type { NavigationDrawerContent } from '../../template/navigation-drawer/NavigationDrawerContent'
import NavigationDrawer from '../../template/navigation-drawer/NavigationDrawer.vue'
import FooterSimple from '../../template/footer-simple/WFooterSimple.vue'
import Breadcrumb from '../../basic/breadcrumb/WBreadcrumb.vue'
import Banner from '../../basic/banner/WBanner.vue'
import type { PropType } from 'vue'

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: "Dashboard"
  },
  navigationTop: {
    type: Array as PropType<NavigationDrawerContent[]>,
    required: true
  },
  navigationBottom: {
    type: Array as PropType<NavigationDrawerContent[]>,
    required: false,
    default: []
  },
  footerText: {
    type: String as PropType<string>,
    required: false,
    default: `© 2020 Your Company, Inc. All rights reserved.`
  }
})
</script>
