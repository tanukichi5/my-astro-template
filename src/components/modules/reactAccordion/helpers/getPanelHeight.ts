export const getPanelHeight3 = (panel: React.RefObject<HTMLInputElement> | null): string => {
  if (panel === null) return '';
  // console.log(panel.current?.clientHeight)
  const panelHeight = !(panel.current === null) ? panel.current?.children[0]?.clientHeight : '';
  return `${panelHeight}px`;
};

export const getPanelHeight = (panel: React.RefObject<HTMLInputElement> | null): string => {
  if (panel === null) return '';
  if (panel.current === null) return '';

  const targetPanel = panel.current;

  // パネルのコピーを作る
  const ghostPanel = targetPanel.cloneNode(true) as HTMLElement;
  // パネルの親ノードに挿入
  targetPanel.parentNode?.appendChild(ghostPanel);
  // ひとまずみえなくする
  ghostPanel.style.cssText = 'display:block; height:auto; visibility:hidden;';
  // コピーの高さを調べる
  const ghostPanelHeight = ghostPanel.offsetHeight;
  // コピーした要素を削除する
  targetPanel.parentNode?.removeChild(ghostPanel);
  // console.log(ghostPanelHeight)
  return `${ghostPanelHeight}px`;
};
