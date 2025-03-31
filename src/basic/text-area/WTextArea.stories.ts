// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import TextArea from './WTextArea.vue';

type TextAreaProps = InstanceType<typeof TextArea>['$props']

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

/*
 *👇 Render functions are a fSamework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: TextAreaProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { TextArea },
    template: `
      <div class="p-4">
        <div class="mb-2"><TextArea size="xs"></TextArea></div>
        <div class="mb-2"><TextArea size="sm"></TextArea></div>
        <div class="mb-2"><TextArea size="base"></TextArea></div>
        <div class="mb-2"><TextArea size="lg"></TextArea></div>
        <div class="mb-2"><TextArea size="2xl"></TextArea></div>
        <div class="mb-2"><TextArea size="3xl"></TextArea></div>
        <div class="mb-2"><TextArea size="6xl"></TextArea></div>
      </div>
    `,
  }),
  args: {
  }
};