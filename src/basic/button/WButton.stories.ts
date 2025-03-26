// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import WButton from './WButton.vue';

type WButtonProps = InstanceType<typeof WButton>['$props']

const meta: Meta<typeof WButton> = {
  component: WButton,
};

export default meta;
type Story = StoryObj<typeof WButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: WButtonProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { WButton },
    template: `
      <div><w-button>OK</w-button></div>
      <div><w-button href="/">OK</w-button></div>
    `,
  }),
  args: {
    classes: {
      color: 'text-onSurface dark:text-onSurface-dark',
      backgroundColor: '',
      border: 'border border-outline dark:border-outline-dark'
    }
  }
};

export const Block: Story = {
  render: () => ({
    components: { WButton },
    template: '<w-button block>OK</w-button>',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { WButton },
    template: '<w-button :disabled="true">OK</w-button>',
  }),
};

export const Size: Story = {
  render: () => ({
    components: { WButton },
    template: `
      <div><w-button size="xs">xs</w-button></div>
      <div><w-button size="sm">sm</w-button></div>
      <div><w-button>OK</w-button></div>
      <div><w-button size="lg">lg</w-button></div>
      <div><w-button size="2xl">2xl</w-button></div>
      <div><w-button size="3xl">3xl</w-button></div>
      <div><w-button size="6xl">6xl</w-button></div>
    `,
  }),
};