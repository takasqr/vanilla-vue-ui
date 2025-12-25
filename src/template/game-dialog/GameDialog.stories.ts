// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import GameDialog from './GameDialog.vue';

type GameDialogProps = InstanceType<typeof GameDialog>['$props']

const meta: Meta<typeof GameDialog> = {
  component: GameDialog,
};

export default meta;
type Story = StoryObj<typeof GameDialog>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: GameDialogProps) => ({
    setup() {
      return { args }
    },
    components: { GameDialog },
    template: '<GameDialog v-bind="args" />',
  }),
  args: {
    text: 'こんにちは',
    link: '/ja/blog/tag/半年チャレンジ/',
    linkLabel: 'こちら',
    speed: 200,
    autoStart: true,
  }
};