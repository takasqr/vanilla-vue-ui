// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import WRange from './WRange.vue';
import { ref, watchEffect } from 'vue';

type WRangeProps = InstanceType<typeof WRange>['$props']

const meta: Meta<typeof WRange> = {
  component: WRange,
};

export default meta;
type Story = StoryObj<typeof WRange>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => ({
    components: { WRange },
    template: '<w-range @customInput="(value) => console.log(`Received customInput event with value:`, value)"></w-range>',
  }),
};

export const PrimaryDataBinding: Story = {
  render: (args: WRangeProps) => ({
    setup() {
      const modelValue = ref(args.modelValue)

      // `update:modelValue`イベントをリッスンして、内部状態を更新
      watchEffect(() => {
        modelValue.value = args.modelValue;
      });

      return {
        ...args,
        modelValue,
        updateModelValue: (newValue: number) => {
          modelValue.value = newValue;
        },
      }
    },
    components: { WRange },
    template: `
              <w-range
                :max="max"
                :min="min"
                :step="step"
                v-model="modelValue"
              ></w-range>
              `,
  }),
  args: {
    max: 100,
    min: 0,
    step: 10,
    modelValue: 0
  }
};