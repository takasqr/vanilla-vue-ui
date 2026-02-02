// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import WDropdown from './WDropdown.vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

type WDropdownProps = InstanceType<typeof WDropdown>['$props']

const meta: Meta<typeof WDropdown> = {
  component: WDropdown,
};

export default meta;
type Story = StoryObj<typeof WDropdown>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: WDropdownProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { WDropdown, ChevronDownIcon },
    template: `
      <div class="text-center w-full">
        <WDropdown WDropdownClass="right-0" :classes="classes">
          <template #trigger>
            <span>Solutions</span>
            <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
          </template>

          <template #content>
            <span>Content</span>
          </template>
        </WDropdown>
      </div>`,
  }),
  args: {
    classes: {
      title: {
        text: {
          color: 'text-onSurface dark:text-onSurface-dark'
        }
      }
    }
  }
};