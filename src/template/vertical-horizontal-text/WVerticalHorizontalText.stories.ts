// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import WVerticalHorizontalText from './WVerticalHorizontalText.vue';
import {
  HomeIcon,
  BellAlertIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  CurrencyYenIcon,
  CubeIcon,
  BookOpenIcon,
  MinusIcon
} from '@heroicons/vue/24/outline'

type WVerticalHorizontalTextProps = InstanceType<typeof WVerticalHorizontalText>['$props']

const meta: Meta<typeof WVerticalHorizontalText> = {
  component: WVerticalHorizontalText,
};

export default meta;
type Story = StoryObj<typeof WVerticalHorizontalText>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Horizontal: Story = {
  render: (args: WVerticalHorizontalTextProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { WVerticalHorizontalText },
    template: '<WVerticalHorizontalText :text="text" :fontSize="fontSize" :isVertical="isVertical"></WVerticalHorizontalText>',
  }),
  args: {
    text: 'Horizontal',
    fontSize: 5,
    isVertical: false,
  }
};

export const Vertical: Story = {
  render: (args: WVerticalHorizontalTextProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { WVerticalHorizontalText },
    template: '<WVerticalHorizontalText :text="text" :fontSize="fontSize" :isVertical="isVertical"></WVerticalHorizontalText>',
  }),
  args: {
    text: 'Vertical',
    fontSize: 5,
    isVertical: true,
  }
};