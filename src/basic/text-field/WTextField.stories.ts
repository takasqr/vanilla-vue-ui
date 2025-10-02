// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import TextField from './WTextField.vue';

type TextFieldProps = InstanceType<typeof TextField>['$props']

const meta: Meta<typeof TextField> = {
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: TextFieldProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { TextField },
    template: `
      <div class="p-4">
        <div class="mb-2"><TextField size="xs" value="John"></TextField></div>
        <div class="mb-2"><TextField size="sm" value="John"></TextField></div>
        <div class="mb-2"><TextField size="base" value="John"></TextField></div>
        <div class="mb-2"><TextField size="lg" value="John"></TextField></div>
        <div class="mb-2"><TextField size="2xl" value="John"></TextField></div>
        <div class="mb-2"><TextField size="3xl" value="John"></TextField></div>
        <div class="mb-2"><TextField size="6xl" value="John"></TextField></div>
      </div>
    `,
  }),
  args: {
  }
};

export const WithLabel: Story = {
  render: () => ({
    components: { TextField },
    template: `
      <div class="mb-2"><TextField size="xs" label="Name"></TextField></div>
      <div class="mb-2"><TextField size="sm" label="Name"></TextField></div>
      <div class="mb-2"><TextField size="base" label="Name"></TextField></div>
      <div class="mb-2"><TextField size="lg" label="Name"></TextField></div>
      <div class="mb-2"><TextField size="2xl" label="Name"></TextField></div>
      <div class="mb-2"><TextField size="3xl" label="Name"></TextField></div>
      <div class="mb-2"><TextField size="6xl" label="Name"></TextField></div>
    `,
  }),
};

export const WithPlaceholder: Story = {
  render: () => ({
    components: { TextField },
    template: '<TextField placeholder="入力してください"></TextField>',
  }),
};

export const WithError: Story = {
  render: (args: TextFieldProps) => ({
    setup() {
      return {
        ...args,
      };
    },
    components: { TextField },
    template: '<TextField value="John Smith" :rules="rules"></TextField>',
  }),
  args: {
    rules: [
      (value: string) => value.length <= 5 || 'Max 5 characters',
    ],
  },
};