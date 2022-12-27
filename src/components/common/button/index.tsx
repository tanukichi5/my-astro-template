/**
 *
 * 汎用的なボタンを表示するコンポーネントです。
 *
 * ※基本的にcssの数値をそのまま流し込むようなpropsは実装しない予定です。
 * 上記の理由はそれをやるとレスポンスシブ対応が辛いからです。
 * 独自のスタイルを当てたい場合はclassName propsを利用してください。
 *
 *
 * @usage
 * import Button from "@/components/common/button
 *
 * <Button
 *   tagType="button"
 *   theme="basic"
 *   text="サンプルてきすと"
 *   leftIcon="mail"
 *   type="button"
 * />
 *
 */

// reactの機能
// import React, { Children } from 'react';

// next.jsの機能
// import Link from 'next/link';

// components
import IconFont from '../IconFont'; // storybookでエラーになるので仕方なく相対パスで指定

import type { IconProps } from '@/components/common/IconFontType';

// style
import styles from './style/index.module.scss';

//= ===========================各種インポートここまで

type Props = {
  /**
   * ベースとなるタグを指定します
   */
  tagType: 'a' | 'button';
  /**
   * ボタンのテーマを選択します
   */
  theme?: 'basic' | 'border' | 'border2' | 'disabled';
  /**
   * ボタンのテキスト
   */
  text?: string;
  /**
   * 右側のアイコン
   */
  rightIcon?: IconProps;
  /**
   * 左側のアイコン
   */
  leftIcon?: IconProps;
  /**
   * ボタンのサイズを選択
   */
  size?: 'default' | 'small';
  /**
   * ボタンのベースの幅
   */
  baseWidth?: 'default' | 'auto';
  /**
   * aタグ、Linkタグのときのhref属性の値
   */
  href?: string;
  /**
   * target='_blank'を有効にするかどうか（aタグのみ）
   */
  target?: '_blank';
  /**
   * buttonタグのtype属性の値
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * 任意のclass名を設定
   */
  className?: string;
  /**
   * 任意の属性を設定
   */
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLAnchorElement>;
  /**
   * クリックしたときのイベント
   */
  onClick?: () => void;
  children?: React.ReactNode;
};

type BaseTag = Pick<
  Props,
  'theme' | 'size' | 'baseWidth' | 'onClick' | 'href' | 'target' | 'type' | 'className' | 'attributes' | 'children'
>;
type Content = Pick<Props, 'text' | 'rightIcon' | 'leftIcon'>;

const Button = ({
  tagType,
  text,
  theme,
  leftIcon,
  rightIcon,
  size,
  baseWidth,
  href,
  target,
  type,
  className,
  attributes,
  onClick,
}: Props) => {
  switch (tagType) {
    case 'a':
      return (
        <>
          <ATag
            href={href}
            theme={theme}
            size={size}
            baseWidth={baseWidth}
            className={className}
            attributes={attributes}
            target={target}
            onClick={onClick}
          >
            <Content
              text={text}
              rightIcon={rightIcon}
              leftIcon={leftIcon}
            />
          </ATag>
        </>
      );
    // case 'Link':
    //   return (
    //     <>
    //       <LinkTag
    //         href={href}
    //         theme={theme}
    //         size={size}
    //         baseWidth={baseWidth}
    //         className={className}
    //         attributes={attributes}
    //         onClick={onClick}
    //       >
    //         <Content
    //           text={text}
    //           rightIcon={rightIcon}
    //           leftIcon={leftIcon}
    //         />
    //       </LinkTag>
    //     </>
    //   );
    default:
      return (
        <>
          <ButtonTag
            type={type}
            theme={theme}
            size={size}
            baseWidth={baseWidth}
            className={className}
            attributes={attributes}
            onClick={onClick}
          >
            <Content
              text={text}
              rightIcon={rightIcon}
              leftIcon={leftIcon}
            />
          </ButtonTag>
        </>
      );
  }
};

export default Button;

// buttonタグ
const ButtonTag = ({ theme, size, baseWidth, type, className, attributes, onClick, children }: BaseTag) => {
  return (
    <>
      <button
        type={type || 'button'}
        className={[
          styles.button,
          theme ? styles[`-theme-${theme}`] : styles['-theme-basic'],
          size && styles[`-size-${size}`],
          baseWidth && styles[`-baseWidth-${baseWidth}`],
          'button',
          className,
        ].join(' ')}
        {...attributes}
        {...(onClick && { onClick: onClick })}
      >
        {children}
      </button>
    </>
  );
};

// Linkタグ
// const LinkTag = ({ theme, size, baseWidth, href, className, attributes, onClick, children }: BaseTag) => {
//   return (
//     <>
//       <Link href={href || '#'}>
//         <a
//           className={[
//             styles.button,
//             theme ? styles[`-theme-${theme}`] : styles['-theme-basic'],
//             size && styles[`-size-${size}`],
//             baseWidth && styles[`-baseWidth-${baseWidth}`],
//             'button',
//             className,
//           ].join(' ')}
//           {...attributes}
//           {...(onClick && { onClick: onClick })}
//         >
//           {children}
//         </a>
//       </Link>
//     </>
//   );
// };

// aタグ
const ATag = ({ theme, size, baseWidth, href, target, className, attributes, onClick, children }: BaseTag) => {
  return (
    <>
      <a
        href={href || '#'}
        {...(target && { target: target })}
        {...(target && { rel: 'noopener noreferrer' })}
        className={[
          styles.button,
          theme ? styles[`-theme-${theme}`] : styles['-theme-basic'],
          size && styles[`-size-${size}`],
          baseWidth && styles[`-baseWidth-${baseWidth}`],
          'button',
          className,
        ].join(' ')}
        {...attributes}
        {...(onClick && { onClick: onClick })}
      >
        {children}
      </a>
    </>
  );
};

// ボタンの中身
const Content = ({ text, leftIcon, rightIcon }: Content) => {
  return (
    <>
      {leftIcon && (
        <IconFont
          icon={leftIcon}
          className={[styles.button__icon, 'button__icon', '-left'].join(' ')}
        />
      )}
      {text && <span className={[styles.button__text, 'button__text'].join(' ')}>{text}</span>}
      {rightIcon && (
        <IconFont
          icon={rightIcon}
          className={[styles.button__icon, 'button__icon', '-right'].join(' ')}
        />
      )}
    </>
  );
};
