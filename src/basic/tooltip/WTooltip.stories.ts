// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import WTooltip from './WTooltip.vue';
import Button from '../button/WButton.vue'
import { ref, watch } from 'vue';

type WTooltipProps = InstanceType<typeof WTooltip>['$props']

const meta: Meta<typeof WTooltip> = {
  component: WTooltip,
};

export default meta;
type Story = StoryObj<typeof WTooltip>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  render: (args: WTooltipProps) => ({
    setup() {
      return {
        ...args,
      };
    },
    components: { WTooltip, Button },
    template: `
      <w-tooltip hoverText="ホバー" reactiveText="text" :isReact="isReact">
        <Button>Text</Button>
      </w-tooltip>
    `,
  }),
  args: {
    isReact: false
  },
};

export const isReact: Story = {
  render: (args) => ({
    setup() {
      // isReact を ref 化
      const isReact = ref(args.isReact);

      watch(() => args.isReact, (val) => {
        isReact.value = val;
      });

      return {
        isReact,
      };
    },
    components: { WTooltip, Button },
    template: `
      <w-tooltip
        reactiveText="Clicked."
        :isReact="isReact"
      >
        <Button @click="isReact = true">Text</Button>
      </w-tooltip>
    `,
  }),
  args: {
    isReact: false,
  },
};

export const init: Story = {
  render: (args: WTooltipProps) => ({
    setup() {
      return {
        ...args,
      };
    },
    components: { WTooltip, Button },
    template: `
      <w-tooltip hoverText="ホバー" :showHoverOnMount="true">
        <Button>Text</Button>
      </w-tooltip>
    `,
  }),
  args: {
    isReact: false
  },
};