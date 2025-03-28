// Replace vue3 with vue if you are using Storybook for Vue 2
import type { Meta, StoryObj } from '@storybook/vue3';
import DashboardTemplate from './WDashboardTemplate.vue';
import { HomeIcon } from '@heroicons/vue/24/outline'

type DashboardTemplateProps = InstanceType<typeof DashboardTemplate>['$props']

const meta: Meta<typeof DashboardTemplate> = {
  component: DashboardTemplate,
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: DashboardTemplateProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { DashboardTemplate },
    template: `
      <DashboardTemplate :navigationTop="navigationTop">
        <div class="prose">
          <h1>Menu</h1>
        </div>
      </DashboardTemplate>
    `,
  }),
  args: {
    navigationTop: [{ name: 'メニュー', href: '/ja', onClick: undefined, icon: HomeIcon, current: false }]
  }
};

export const WithBottom: Story = {
  render: (args: DashboardTemplateProps) => ({
    setup() {
      return {
        ...args
      }
    },
    components: { DashboardTemplate },
    template: `
      <DashboardTemplate :title="title" :navigationTop="navigationTop" :navigationBottom="navigationBottom">
        <div class="prose">
          <h1>Menu</h1>
        </div>
      </DashboardTemplate>
    `,
  }),
  args: {
    title: '管理ページ',
    navigationTop: [{ name: 'メニュー', href: '/ja', onClick: undefined, icon: HomeIcon, current: false }],
    navigationBottom: [{ name: 'ログアウト', href: undefined, onClick: () => console.log('ログアウトボタンが押されました。'), icon: undefined, current: undefined }]
  }
};