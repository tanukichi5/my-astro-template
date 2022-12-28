/**
 *
 * Property 'documentElement' does not exist on type 'never'
 * ↑のようなエラーが出たので下記を参考に修正した
 * @see {@link https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-never}
 *
 */

// 背景固定
export const backFixed = (fixed: boolean, scroll?: boolean): any => {
  // 固定するスクロール要素を取得(htmlもしくはbody)
  /**
   * @see {@link https://canonono.com/web/js/scrolling-element}
   */
  const scrollElement: any = 'scrollingElement' in document ? document.scrollingElement : document['documentElement'];

  // 現在のスクロール量をセット、すでに固定されている場合はscrollElementにセットされているtopの値を使用
  const scrollY = fixed ? getScrollY() : parseInt(scrollElement.style.top);

  // console.log(window.scrollY)

  // 固定用CSS
  const styles: any = {
    position: 'fixed',
    top: `${scrollY * -1}px`,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  // scrollElementに固定用CSSを反映
  for (const key in styles) {
    scrollElement.style[key] = fixed ? styles[key] : '';
  }

  !fixed ? scrollElement.classList.remove('is-backFixed') : scrollElement.classList.add('is-backFixed');

  // 固定解除で元の位置にスクロール
  if (scroll ?? true) {
    if (!fixed) window.scrollTo(0, scrollY * -1);
  }
};

function getScrollY() {
  if ('scrollY' in window) return window.scrollY;
  if ('pageYOffset' in window) return window['pageYOffset'];

  const doc = window['document'];

  return doc['compatMode'] === 'CSS1Compat' ? doc['documentElement']['scrollTop'] : doc['body']['scrollTop'];
}
