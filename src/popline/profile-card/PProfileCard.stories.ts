// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import PProfileCard from './PProfileCard.vue';

type PProfileCardProps = InstanceType<typeof PProfileCard>['$props']

const meta: Meta<typeof PProfileCard> = {
  component: PProfileCard,
};

export default meta;
type Story = StoryObj<typeof PProfileCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: PProfileCardProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { PProfileCard },
    template: '<div class="w-64"><PProfileCard :name="name" :role="role" :imageUrl="imageUrl" :xUrl="xUrl" :linkedinUrl="linkedinUrl"></PProfileCard></div>',
  }),
  args: {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    xUrl: '#',
    linkedinUrl: '#'
  }
};

export const WithoutLinkedin: Story = {
  render: (args: PProfileCardProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { PProfileCard },
    template: '<div class="w-64"><PProfileCard :name="name" :role="role" :imageUrl="imageUrl" :xUrl="xUrl"></PProfileCard></div>',
  }),
  args: {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    xUrl: '#',
  }
};