# Astroベースの静的サイトの制作環境です

- node v16.19.0
- npm v8.1.3

## 環境セットアップ（初回のみ）

```
$ npm i
```

## ローカルサーバー起動（開発環境立ち上げ）

```
$ npm run dev
```

その後、[http://localhost:3000](http://localhost:3000)にアクセス。 

## ディレクトリ構成
```
.
├ public //静的ファイルを配置
└ src
　 ├ components //コンポーネント
　 ├ iconfont //アイコンフォント
　 ├ libs //ライブラリなどを使用した固有のロジック
　 ├ pages //Astroでルーティングされるページコンポーネント
　 └ styles //スタイルを配置
```

## importのエイリアス

下記のように`@`を付けることでsrcディレクトリ内を絶対パスで指定可能

```
import Button from '@/components/common/Button'
```

## アイコンフォントについて

```
$ npm run iconfont
```

上記コマンドでアイコンフォントを作成するgulpがWatch状態になります。  
この状態で`/iconfont/svg/`ディレクトリにsvgファイルを配置するとアイコンフォントが作成されます。

### アイコンフォントの使用方法

アイコンフォント用のコンポーネントを用意しているのでそれを使用します。  
`/components/common/IconFont.tsx`

### アイコンフォントのプレビュー

`/iconfont/sample.html`をブラウザで開くだけで使用可能なアイコンフォント一覧を確認できます。


## Lint & Prettier

以下コマンドでLintエラー検出・自動補完
```
npm run lint:fix
```

以降は最初からあったREADME


# Welcome to [Astro](https://astro.build)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/s/github/withastro/astro/tree/latest/examples/basics)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)


## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
