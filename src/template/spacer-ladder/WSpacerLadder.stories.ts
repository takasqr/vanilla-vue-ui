import type { Meta, StoryObj } from '@storybook/vue3';

import SpacerLadder from './WSpacerLadder.vue';

const meta: Meta<typeof SpacerLadder> = {
  component: SpacerLadder,
};

export default meta;
type Story = StoryObj<typeof SpacerLadder>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => ({
    components: { SpacerLadder },
    template: '<SpacerLadder><p>content</p></SpacerLadder>',
  }),
};
