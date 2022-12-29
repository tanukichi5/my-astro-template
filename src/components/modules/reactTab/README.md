アクセシブルなタブコンポーネントです。

- 開いているパネルのみスクリーンリーダーが読み上げます
- タブボタン上でキーボードの上下左右キーで移動（フォーカス）できます。

## インポート

タブのコンポーネントをインポート

```ts
import { Tab, TabContent, TabList, TabListItem, TabPanel } from '@/components/modules/tab';
```

## 使い方

`Tab`コンポーネントの children に以下の 4 つのコンポーネントを配置するだけです。

`TabList`  
`TabListItem`  
`TabContent`  
`TabPanel`

```tsx
<Tab>
  <TabList>
    <TabListItem>タブボタン1</TabListItem>
    <TabListItem>タブボタン2</TabListItem>
    <TabListItem>タブボタン3</TabListItem>
  </TabList>
  <TabContent>
    <TabPanel>タブの内容1</TabPanel>
    <TabPanel>タブの内容2</TabPanel>
    <TabPanel>タブの内容3</TabPanel>
  </TabContent>
</Tab>
```

## Props

`Tab`コンポーネントに props を渡すことで挙動を変更できます

| props         | type   | default | description                                 |
| ------------- | ------ | ------- | ------------------------------------------- |
| expandedPanel | number | 0       | 最初から開くパネル。パネルの index を指定。 |

### 例

```jsx
<Tab expandedPanel={1}>
  <TabList>
    <TabListItem>タブボタン1</TabListItem>
    <TabListItem>タブボタン2</TabListItem>
    <TabListItem>タブボタン3</TabListItem>
  </TabList>
  <TabContent>
    <TabPanel>タブの内容1</TabPanel>
    <TabPanel>タブの内容2</TabPanel>
    <TabPanel>タブの内容3</TabPanel>
  </TabContent>
</Tab>
```

上記の例は

- 最初から 1 番と 2 番のパネルをオープン

## スタイル（css）について

基本的に css は設定していませんので、自分でデザインに沿った css を記述してください。

以下のように`TabListItem`と`TabPanel`の children に className を使用して独自スタイルを当てるのが基本的な方法になります。

```tsx
<TabListItem>
  <span className={triggerText}>
    ボタン1
  <span>
</TabListItem>
```

`TabListItem`をdivでラップして横並びのスタイルを当てるなどしてもOK

```tsx
const itemWrapper = css`
  display: flex;
`
<Tab expandedPanel={1}>
  <TabList>
    <div className={itemWrapper}>
      <TabListItem>タブボタン1</TabListItem>
      <TabListItem>タブボタン2</TabListItem>
      <TabListItem>タブボタン3</TabListItem>
    </div> 
  </TabList>
  <TabContent>
    <TabPanel>タブの内容1</TabPanel>
    <TabPanel>タブの内容2</TabPanel>
    <TabPanel>タブの内容3</TabPanel>
  </TabContent>
</Tab>
```

### コンポーネント本体にスタイルを適用したい場合は className props を使う

`TabList`や`TabListItem`などコンポーネント本体に直接スタイルを当てたい場合はすべてのコンポーネントに className props を用意しているので、そこに css modules や linaria でスタイルを当ててください。

```tsx
<Tab expandedPanel={1} className={tab}>
  <TabList className={tabList}>
    <TabListItem className={tabListItem}>タブボタン1</TabListItem>
    <TabListItem>タブボタン2</TabListItem>
    <TabListItem>タブボタン3</TabListItem>
  </TabList>
  <TabContent className={tabContent}>
    <TabPanel className={tabPanel}>タブの内容1</TabPanel>
    <TabPanel>タブの内容2</TabPanel>
    <TabPanel>タブの内容3</TabPanel>
  </TabContent>
</Tab>
```
