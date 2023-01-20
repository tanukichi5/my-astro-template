/**
 * 
 * @see {@link https://qiita.com/miyawa-tarou/items/3f6166e7b617634e6a1c | Qiita}
 * 
 */

const path = require('path');
const rootPath = path.resolve(__dirname, "../src/");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  // stories: [
  //   '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  // ],
  // addons: [
  //   "@storybook/addon-links",
  //   "@storybook/addon-essentials",
  // ],
  webpackFinal: async (config) => {
    // scss を読み込む
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 1 => postcss-loader
              modules: {
                localIdentName: '[local]___[hash:base64:2]',
              },
            },
          },
          'sass-loader',
        ],
      },
    );
    /**
     * 
     * @see {@link https://github.com/storybookjs/storybook/issues/12844 | Github}
     * 
     */
    config.resolve.roots = [
      path.resolve(__dirname, '../public'),
      'node_modules',
    ];
    /**
     * 
     *  '@'をつけることで絶対パスで通るようにする
     *  scssファイルにも有効
     * 
     */
    config.resolve.alias["@"] = rootPath;
    return { ...config };
  }
}


 // インストール時の設定
 // module.exports = {
 //   "stories": [
 //     "../src/**/*.stories.mdx",
 //     "../src/**/*.stories.@(js|jsx|ts|tsx)"
 //   ],
 //   "addons": [
 //     "@storybook/addon-links",
 //     "@storybook/addon-essentials",
 //     "@storybook/addon-interactions"
 //   ],
 //   "framework": "@storybook/react",
 //   "core": {
 //     "builder": "@storybook/builder-webpack5"
 //   }
 // }