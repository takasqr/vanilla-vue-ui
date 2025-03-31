import type { Meta, StoryObj } from '@storybook/vue3';

import SpacerIsland from './WSpacerIsland.vue';

const meta: Meta<typeof SpacerIsland> = {
  component: SpacerIsland,
};

export default meta;
type Story = StoryObj<typeof SpacerIsland>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => ({
    components: { SpacerIsland },
    template: '<SpacerIsland><p>content</p></SpacerIsland>',
  }),
};
