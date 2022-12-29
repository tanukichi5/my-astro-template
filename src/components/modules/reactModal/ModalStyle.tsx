//モーダルに適用されているデフォルトのスタイルです。

//applyDefaultStyles propsで無効にすることが可能です。

/* モーダル全体の枠
 * ========================================================================== */
export const defaultWrapperStyle: any = {
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  opacity: 0,
  visibility: 'hidden',
  zIndex: 1000,
  overflowY: 'scroll',
  boxSizing: 'border-box',
};

//モーダルが開いてるとき
export const defaultWrapperOpenedStyle = {
  opacity: 1,
  visibility: 'visible',
};

//モーダルが閉じてるとき
export const defaultWrapperClosedStyle = {
  opacity: 0,
  visibility: 'hidden',
};

/* モーダルの内容の枠
 * ========================================================================== */
export const defaultContentStyle = {
  display: 'contents',
};

/* モーダルの背景のオーバーレイ
 * ========================================================================== */
export const defaultOverlayStyle: any = {
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: '#000',
  opacity: 0.3,
  zIndex: -1,
};
