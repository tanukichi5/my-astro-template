## ユニークなスタイルを設定したい場合

※基本的にcssの数値をそのまま流し込むようなpropsは実装しない予定です。  
上記の理由はそれをやるとレスポンスシブ対応が辛いからです。  
独自のスタイルを当てたい場合は`className`propsを利用してください。

## アイコンについて

このページの上部の**External Content**タブより確認できます。  
もしくは以下のリンクからも確認できます。  
<a href='./fonts/myfont-preview/preview.html' target="_blank">プレビューリンク</a>  
**記載されているアイコン名をpropsに入力すると表示されます。**

## Props
Propsの一覧です。  
必須のPropsは`tagType`のみですが選択した値に応じて`type`や`href`を追加で設定してください。

| props | type | default | description | required |
| --- | --- | --- | --- | --- |
| tagType | 'a' \| 'button' \| 'Link' |     | ベースとなるタグを指定します | ○   |
| theme | 'basic' \| 'border' \| 'border2' \| 'sns-line' \| 'disabled' | basic | ボタンのテーマを選択します |     |
| text | string |     | ボタンに表示するテキスト |     |
| rightIcon | string |     | 右側のアイコン<br/>※アイコンはアイコンのプレビューから選択する<br/>/src/iconfont/sample.html |     |
| leftIcon | string |     | 左側のアイコン<br/>※アイコンはアイコンのプレビューから選択する<br/>/src/iconfont/sample.html |     |
| size | 'default' \| 'small' | default | ボタンのサイズを選択 |     |
| baseWidth | 'auto' |     | ボタンのベースの幅<br/>未指定 : min-width 250px<br/>auto : テキストに応じて可変する |     |
| href | string |     | href属性の値<br/>※tagTypeが'a'もしくは'Link'の場合のみ有効 |     |
| target | '_blank' |     | target属性の値<br/>※tagTypeが'a'の場合のみ有効 |     |
| type | 'button' \| 'reset' \| 'submit' |     | buttonタグのtype属性の値<br/>※tagTypeが'button'の場合のみ有効 |     |
| className | string |     | 任意のclass名を設定<br/>ユニークなスタイルはこれを使用する |     |
| attributes | object |     | 任意のHTML属性を設定<br/>主にWAI-ARIA関連属性を設定することが多いかも |     |
| onClick | function | void | クリックしたときのイベント |     |
