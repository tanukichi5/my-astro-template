# モーダルコンポーネント

アクセシブルなモーダルコンポーネントです。

- モーダルオープン時にスクリーンリーダーから除外する要素を指定できます
- モーダルオープン時にフォーカスをモーダル内に固定します
- ESCキーでモーダルを閉じることができます

## インポート

モーダルのコンポーネントをインポート

```ts
import Modal, { useModal } from 'path/to/modal'
```

## 基本の使い方

モーダルの基本的な使い方の流れは以下の通りです

- 任意の開くボタンを作成
- stateとボタンのクリックアクションを設定
- モーダルコンポーネントにstateをpropsで渡す

### 1, モーダル開くボタンを作成

まずはモーダルを開くボタンを作成します。

```tsx
import React from "react";
const Sample: React.FC = () => {
  return (
    <button>モーダルを開くボタン</button>
  );
}
export default Sample;
```

ここでは普通のbuttonタグを使用していますが、タグは何でもOKです。

### 2, 開くボタンをクリックしたときのアクションを設定

1で定義したボタンにクリックイベントを作成します。

- 以下をuseModalというカスタムフックで定義しています
  - `useModal`でstateを定義します
    - `siteContent ` : サイトの全体を囲っている要素を指定（bodyやhtml以外）
      ※ここで指定した要素はモーダルオープン時にスクリーンリーダーの対象から除外されます
    - `expanded` : モーダルの開閉状態を現します。最初は閉じているので`false`でOK
  - `modalToggle`はボタンをクリックしたときに開閉状態を反転します。（モーダルが閉じているなら開く、開いているなら閉じる）

```tsx
import React from "react";
import Modal, { useModal } from './components/Modal';
//useModalを読み込み↑↑↑↑
const Sample: React.FC = () => {
  //=======追加=========↓↓↓↓
  //モーダル用のhooks
  const [modalState, setModalState, modalToggle] = useModal({
    init: true,
    id: 'reactModal',
    siteContent: '#root',
    expanded: false,
  })
  //=======追加=========↑↑↑↑
  return (
    //onClickイベントを追加↓↓↓↓
    <button onClick={modalToggle}>モーダルを開くボタン</button>
  );
}
export default Sample;
```

### 3, モーダル本体を作成

- モーダルをインポートします
- `<Modal>`に**2**で作成したstateをpropsで渡します
  - `{...modalState}` : スプレッド構文で全て渡す
  - `setRootState={setModalState}` : setRootStateという名前のpropsに`setModalState`を渡す

```tsx
import React, { useState } from "react";
import Modal, { useModal } from './components/Modal'; //←モーダルコンポーネントを読み込み
const Sample: React.FC = () => {
  const [modalState, setModalState, modalToggle] = useModal({
    init: true,
    id: 'reactModal',
    siteContent: '#root',
    expanded: false,
  })
  return (
    <button onClick={modalToggle}>モーダルを開くボタン</button>
    //=======追加=========↓↓↓↓
    <Modal {...modalState} setRootState={setModalState}>
      //ここにモーダルの内容を好きに記述
      <p>モーダルです</p>
      <button onClick={modalToggle}>モーダルを閉じる</button>
    </Modal>
    //=======追加=========↑↑↑↑
  );
}
export default Sample;
```

#### 閉じるボタンについて

モーダルを閉じるボタンは開くボタンと同じでも大丈夫です。

クリックで`modalToggle`を実行することができればOK！

以上で基本的な使い方は終わりです

## Options

その他propsを渡すことで挙動を変更できます
大半が初期設定で大丈夫です。

| props              | type                                                         | default     | description                                                  | required |
| ------------------ | ------------------------------------------------------------ | ----------- | ------------------------------------------------------------ | -------- |
| init               | boolean                                                      | true        | 初期化された状態かどうか。一度でもモーダルを開く操作をするとfalseになります。 |          |
| id                 | string                                                       | null        | モーダルに任意のid属性を付与できます。                       | ○        |
| portalTarget       | string                                                       | undefined   | モーダルをレンダリングする場所。<br />未指定の場合はその場にレンダリングします。 |          |
| siteContent        | string                                                       | undefined   | モーダルオープン時にスクリーンリーダーから除外する要素を指定できます。<br />cssセレクター形式で指定してください。 |          |
| expanded           | boolean                                                      | false       | モーダル開閉状態を指定します。                               | ○        |
| backFixed          | boolean                                                      | false       | モーダルオープン時に背景を固定する。※モーダルの裏がスクロールしないようにする |          |
| clickOutsideClose  | boolean                                                      | true        | モーダルの外側をクリックしたときにモーダルを閉じる。         |          |
| domHide            | boolean                                                      | true        | モーダルが開いている時以外にソースコードから消す。           |          |
| cssAnimationType   | string \| null                                               | "animation" | "animation"もしくは"transition"<br />モーダルに適用するcssに応じて切り替えてください。 |          |
| customClassNames   | {<br/>    wrapper?: string<br/>    content?: string<br/>    overlay?: string<br/>  } |             | wrapper, content, overlay要素に任意のclassNameを設定できます |          |
| applyDefaultStyles | boolean                                                      | true        | デフォルトのスタイルを適用するかどうか。                     |          |

propsの渡し方は「基本の使い方」の2で作成したstateに入れるだけです

```tsx
const [modalState, setModalState, modalToggle] = useModal({
  id: 'reactModal',
  siteContent: '#root',
  expanded: false,
  backFixed: false,
  clickOutsideClose: false
})
```

### customClassNamesを使った独自スタイルの設定方法

`customClassNames`で独自スタイルを設定することができます。

いくつかの例を紹介します。

#### CSS Modules

```css
.modalWrapper {
  //ここにwrapper用のスタイル
}
.modalContent {
  //ここにwrapper用のスタイル
}
.modalOverlay {
  //ここにwrapper用のスタイル
}
```

```ts
import styles from './style.module.scss'
import Modal, { useModal } from 'path/to/modal'
const [modalState, setModalState, modalToggle] = useModal({
  ...
  customClassNames: {
    wrapper: styles.modalWrapper,
    content: styles.modalContent,
    overlay: styles.modalOverlay
  },
  ...
})
```

#### Linaria

```ts
import { css } from 'linaria'
import Modal, { useModal } from 'path/to/modal'
const modalWrapper = css`
  //ここにwrapper用のスタイル
`
const [modalState, setModalState, modalToggle] = useModal({
  ...
  customClassNames: {
    wrapper: styles.modalWrapper,
    ...
  },
  ...
})
```

#### Emotion

Emotionの場合は少し特殊でEmotionのClassNamesを使ってEmotionが自動生成するclass名を渡す必要があります。

```ts
import { css, ClassNames } from '@emotion/react'
import Modal, { useModal } from 'path/to/modal'
const [modalState, setModalState, modalToggle] = useModal({
  ...
})
<ClassNames>
  {({ css, cx }) => (
    <Modal
      {...modalState}
      {...modalState.customClassNames = {
        wrapper: css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          z-index: 100;
          transition: all .3s;
          &[aria-hidden="true"] {
            opacity: 0;
            visibility: hidden;
          }
          &[aria-hidden="false"] {
            opacity: 1;
            visibility: visible;
          }
        `,
        overlay: css`
          //ここにoverlayのスタイル
        `
      }}
      setRootState={setModalState}
    >
      //モーダルの中身
    </Modal>
  )}
</ClassNames>
```





### cssAnimationTypeについて

`customStyles`で`container`のアニメーション設定を変更する場合は以下の対応する設定にしてください。

#### containerをanimation（css）でアニメーションする場合（デフォルト）

`cssAnimationType : "animation"`としてください。

#### containerをtransition（css）でアニメーションする場合

`cssAnimationType : "transition"`としてください。
※cssの仕様上transitionアニメーションは`domHide`オプションが`false`でないとアニメーションしません。

#### cssでアニメーションをしない場合

`cssAnimationType :null `としてください。