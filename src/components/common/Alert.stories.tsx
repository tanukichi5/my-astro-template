import React from 'react'

// Storybook
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import {
  Title,
  Subtitle,
  Source,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs' // docsページをカスタムできるアドオン

// component
import Alert from './Alert'

// README
import Readme from './Alert.md'
const doc = Readme as any



//= ===========================各種インポートここまで

export default {
  title: 'components/common/Alert', // storybookで表示される階層構造 /（スラッシュ）で階層を作る
  component: Alert,
  /**
   * 各種propsの詳細を記述
   * More on argTypes
   * @see {@link https://storybook.js.org/docs/react/api/argtypes | 公式}
   *
   */
  argTypes: {
    alert: {
      description: 'メッセージの種類を選択(色が変わるだけ)',
      type: { name: 'string', required: true },
      control: {
        type: 'radio',
        options: ['success', 'danger', 'warning'],
      },
    },
  },
  parameters: {
    /**
     * docsページの設定
     * 下記URLの「Remixing DocsPage using doc blocks」を参照
     * @see {@link https://storybook.js.org/docs/react/writing-docs/docs-page | 公式}
     */
    docs: {
      page: () => (
        <>
          <Title>Alert</Title>
          <Subtitle>
            error や success メッセージを表示するコンポーネントです
          </Subtitle>
          <Source code={`import Alert from 'components/common/Alert'`} />
          <Description markdown={doc} />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Alert>

/**
 * ベースとなるテンプレートを作る
 * More on component templates
 * @see {@link https://storybook.js.org/docs/react/writing-stories/introduction#using-args | 公式}
 */
const Template: ComponentStory<typeof Alert> = args => {
  return (
    <>
      <Alert {...args} />
    </>
  )
}

export const Basic = Template.bind({})
/**
 * テンプレートをベースとして色々差分を作成する
 * More on args
 * @see {@link https://storybook.js.org/docs/react/writing-stories/args | 公式}
 */
Basic.args = {
  alert: 'success',
  children: '求人を登録しました。',
}

// export const Secondary = Template.bind({});
// Secondary.args = {
//   tagType: 'button',
//   text: 'サンプルてきすと2',
// };
