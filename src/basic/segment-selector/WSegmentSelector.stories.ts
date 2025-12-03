// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import WSegmentSelector from './WSegmentSelector.vue';
import Button from '../button/WButton.vue'
import { ref, watch } from 'vue';

type WSegmentSelectorProps = InstanceType<typeof WSegmentSelector>['$props']

const meta: Meta<typeof WSegmentSelector> = {
  component: WSegmentSelector,
};

export default meta;
type Story = StoryObj<typeof WSegmentSelector>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  render: (args: WSegmentSelectorProps) => ({
    setup() {
      const value = ref(args.modelValue)

      return {
        args,
        value,
      }
    },
    components: { WSegmentSelector, Button },
    template: `
      <div class="space-y-4">
        <WSegmentSelector
          v-bind="args"
          v-model="value"
        />

        <div class="text-sm">
          selected: {{ value }}
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 'life',
    options: [
      { label: '暮らし', value: 'life' },
      { label: 'プログラミング', value: 'programming' },
    ],
  },
};
