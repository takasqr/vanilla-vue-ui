// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';

import WHorizontalScroll from './WHorizontalScroll.vue';

const meta: Meta<typeof WHorizontalScroll> = {
  component: WHorizontalScroll,
};

export default meta;
type Story = StoryObj<typeof WHorizontalScroll>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => ({
    components: { WHorizontalScroll },
    template: `
      <WHorizontalScroll>
        <img src="/carousel-0.webp" alt="Slide 1">
        <img src="/carousel-1.webp" alt="Slide 2">
        <img src="/carousel-2.webp" alt="Slide 3">
      </WHorizontalScroll>
    `,
  }),
};

export const None: Story = {
  render: () => ({
    components: { WHorizontalScroll },
    template: `
      <WHorizontalScroll :scrollbar-width="'none'">
        <img src="/carousel-0.webp" alt="Slide 1">
        <img src="/carousel-1.webp" alt="Slide 2">
        <img src="/carousel-2.webp" alt="Slide 3">
      </WHorizontalScroll>
    `,
  }),
};
