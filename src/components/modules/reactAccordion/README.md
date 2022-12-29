## 使い方

`Accordion`コンポーネントのchildrenに以下の3つのコンポーネントを配置するだけです。

`AccordionItem`  
`AccordionTrigger`  
`AccordionPanel`  


```jsx
<Accordion>
  <AccordionItem>
    <AccordionTrigger>
      ボタン1
    </AccordionTrigger>
    <AccordionPanel>
      アコーディオン内容1
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>
      ボタン2
    </AccordionTrigger>
    <AccordionPanel>
      アコーディオン内容2
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```

### AccordionItemコンポーネントについて

`AccordionItem`のchildrenに`AccordionTrigger`と`AccordionPanel`を必ず含むこと。  
※配置する順番は好きな順番でOK



## Props

`Accordion`コンポーネントにpropsを渡すことで挙動を変更できます

| props                 | type             | default    | description                                                  |
| --------------------- | ---------------- | ---------- | ------------------------------------------------------------ |
| defaultExpandedPanels | number[]            | []         | 最初から開いた状態にしたいパネル。パネルのindexを指定。                    |
| easing                | string           | "ease-out" | イージング。CSSのプロパティを指定                            |
| duration              | string           | ".3s"      | パネルの開閉速度。CSSのプロパティを指定                      |
| notTransition         | boolean          | false      | transitionアニメーションを無効にできます。                   |
| multipleExpanded      | boolean          | true       | パネルを複数開くかどうか                                     |
| onOpen                | function         |            | パネルを開いたときのコールバック                             |
| onClose               | function         |            | パネルを閉じたときのコールバック                             |
| customStyles          | SerializedStyles |            | カスタムスタイルを適用できます。※emotionのインストールが必須 |

### 例

```jsx
<Accordion 
  defaultExpandedPanels={[0,1]}
  duration={".6s"}
  onOpen={open}
  onClose={close}
>
  <AccordionItem>
    <AccordionTrigger>
      ボタン1
    </AccordionTrigger>
    <AccordionPanel>
      アコーディオン内容1
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>
      ボタン2
    </AccordionTrigger>
    <AccordionPanel>
      アコーディオン内容2
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```

上記の例は

- 最初から1番と2番のパネルをオープン
- パネル開閉速度を0.6秒
- パネルを開いたときにopen関数を実行
- パネルを閉じたときにclose関数を実行


## スタイル（css）について

基本的にcssは設定していませんので、自分でデザインに沿ったcssを記述してください。  

以下のように`AccordionTrigger`と`AccordionPanel`のchildrenにclassNameを使用して独自スタイルを当てるのが基本的な方法になります。

```tsx
<AccordionTrigger>
  <span className={triggerText}>
    ボタン1
  <span>
</AccordionTrigger>
<AccordionPanel>
  <div className={content}>
    アコーディオンの内容
  <div>
</AccordionPanel>
```

### 開閉状態毎のスタイルを当てる方法

アコーディオンなので開閉状態に応じたスタイルを当てたい場合があるかと思います。  
このコンポーネントの開閉状態は**WAI-AREA**で管理しているので、その状態毎にスタイルを記述するとOK。  

以下はcss modulesの例

```scss
スタイル（scss）

// AccordionTriggerの状態によってスタイルを切り替え
.triggerText {
  color: red;
  @include state(':global(.accordion-button)', '[aria-expanded="false"]') {
    color: blue;
  }
}

// AccordionPanelの状態によってスタイルを切り替え
.content {
  background: black;
  @include state(':global(.accordion-panel)', '[aria-hidden="true"]') {
    background: white;
  }
}
```

```tsx
import styles from 'path/to/style.module.scss'

<AccordionTrigger>
  <span className={styles['triggerText']}>
    ボタン1
  <span>
</AccordionTrigger>
<AccordionPanel>
  <div className={styles['content']}>
    アコーディオンの内容
  <div>
</AccordionPanel>
```



### コンポーネント本体にスタイルを適用したい場合はclassName propsを使う

`AccordionItem`や`AccordionTrigger`などコンポーネント本体に直接スタイルを当てたい場合はすべてのコンポーネントにclassName propsを用意しているので、そこにcss modulesやlinariaでスタイルを当ててください。

```tsx
<Accordion 
  className={accordionCustomStyle}
>
  <AccordionItem className={itemCustomStyle}>
    <AccordionTrigger className={triggerCustomStyle}>
      ボタン1
    </AccordionTrigger>
    <AccordionPanel className={panelCustomStyle}>
      アコーディオン内容1
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```



