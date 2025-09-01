// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';

import WOptionsArea from './WOptionsArea.vue';

const meta: Meta<typeof WOptionsArea> = {
  component: WOptionsArea,
};

export default meta;
type Story = StoryObj<typeof WOptionsArea>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: any) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { WOptionsArea },
    template: `
    <WOptionsArea>
      <label class="mr-2">
        数字
        <input id="p-generator-numbers-checkbox" type="checkbox">
      </label>

      <label>
        記号
        <input id="p-generator-symbols-checkbox" type="checkbox">
      </label>
    </WOptionsArea>`,
  }),
  args: {
  }
};