import { type Preview, setup, VueRenderer } from '@storybook/vue3'
import { withThemeByClassName } from '@storybook/addon-themes';
import { type App } from 'vue';

// Tailwind を読み込む
import '../src/assets/main.css'

import { createPinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';

// Pinia をセットアップ
const pinia = createPinia();

// Vue Router をセットアップ
const router = createRouter({
  history: createMemoryHistory(),
  routes: []
})

setup((app: App) => {
  app.use(pinia);
  app.use(router)
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName<VueRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ]
}

export default preview
