import type { Meta, StoryObj } from '@storybook/vue3';

import WTagLink from './WTagLink.vue';

const meta: Meta<typeof WTagLink> = {
  component: WTagLink,
};

export default meta;
type Story = StoryObj<typeof WTagLink>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => ({
    components: { WTagLink },
    template: '<WTagLink to="/to">content</WTagLink>',
  }),
};
