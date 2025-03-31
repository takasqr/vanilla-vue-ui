import type { Meta, StoryObj } from '@storybook/vue3';

import SpacerWrap from './WSpacerWrap.vue';

const meta: Meta<typeof SpacerWrap> = {
  component: SpacerWrap,
};

export default meta;
type Story = StoryObj<typeof SpacerWrap>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => ({
    components: { SpacerWrap },
    template: '<SpacerWrap><p>content</p></SpacerWrap>',
  }),
};
