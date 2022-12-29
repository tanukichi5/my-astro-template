import React, { useState, createContext, useEffect, useRef, useContext } from 'react';
// import * as CSS from 'csstype';
import { Context as accordionContext } from './AccordionContext';

import { getPanelHeight } from './helpers/getPanelHeight';

export interface Props {
  children?: React.ReactNode;
  panelIndex: number;
}

// itemStateのインターフェース
export interface InjectedItemState {
  isExpanded: boolean;
  index: number | null;
  panelDOM: React.RefObject<HTMLInputElement> | null;
}

// triggerAttributesのインターフェース
interface InjectedTriggerAttributes {
  'aria-expanded': boolean;
  'aria-controls'?: string | undefined;
}

// panelAttributesのインターフェース
interface InjectedPanelAttributes {
  id?: string | undefined;
  'aria-hidden': boolean;
}

// panelStylesのインターフェース
interface InjectedPanelStyles {
  height: any;
  visibility: any;
  boxSizing: any;
  overflow: any;
  transition: any;
}

export const Context = createContext(
  {} as {
    itemState: InjectedItemState;
    setItemState: React.Dispatch<React.SetStateAction<InjectedItemState>>;
    triggerAttributes: InjectedTriggerAttributes;
    setTriggerAttributes: React.Dispatch<React.SetStateAction<InjectedTriggerAttributes>>;
    panelAttributes: InjectedPanelAttributes;
    setPanelAttributes: React.Dispatch<React.SetStateAction<InjectedPanelAttributes>>;
    panelStyles: InjectedPanelStyles;
    setPanelStyles: React.Dispatch<React.SetStateAction<InjectedPanelStyles>>;
  }
  // setPanelStyles: () => {},
);

let isInitialExpanded: boolean;

export const Provider: React.FC<Props> = (props) => {
  // is mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  //= ===========is mounted

  const renderFlgRef = useRef(false);
  const renderFlgRefResize = useRef(false);
  const renderFlgRefRoot = useRef(false);

  const rootContext = useContext(accordionContext);

  // 初期化時にパネルを開くかフラグ
  const isInitialExpanded =
    rootContext.accordionState.defaultExpandedPanels === undefined
      ? false
      : rootContext.accordionState.defaultExpandedPanels.includes(props.panelIndex);

  // ランダムなIDを生成
  const randomID = Math.random().toString(36).slice(2);

  // アイテムの状態
  const [itemState, setItemState] = useState<InjectedItemState>({
    isExpanded: isInitialExpanded,
    index: props.panelIndex,
    panelDOM: null,
  });

  // 開閉時のコールバック関数をセット
  const onOpen = rootContext.accordionState.onOpen;
  const onClose = rootContext.accordionState.onClose;

  // トリガーの状態管理
  const [triggerAttributes, setTriggerAttributes] = useState<InjectedTriggerAttributes>({
    'aria-expanded': !!itemState.isExpanded,
    // "aria-controls": `accordion-${itemState['index']}-${randomID}`,
  });

  useEffect(() => {
    setTriggerAttributes((currentState) => ({
      ...currentState,
      'aria-controls': `accordion-${itemState.index}-${randomID}`,
    }));
  }, []);

  // パネルの状態管理
  const [panelAttributes, setPanelAttributes] = useState<InjectedPanelAttributes>({
    // id: `accordion-${itemState['index']}-${randomID}`,
    'aria-hidden': itemState.isExpanded,
  });

  useEffect(() => {
    setPanelAttributes((currentState) => ({
      ...currentState,
      id: `accordion-${itemState.index}-${randomID}`,
    }));
  }, []);

  // パネルのスタイル
  // const panelInitialStyles:any = {
  //     height: itemState["isExpanded"] ? getPanelHeight(itemState.panelDOM) : 0,
  //     visibility: itemState["isExpanded"] ? "visible" : "hidden",
  //     box-sizing: 'border-box',
  //     overflow: 'hidden',
  //     transition: rootContext.accordionState.notTransition
  //       ? ""
  //       : "height " + rootContext.accordionState.duration + " " + rootContext.accordionState.easing + ", visibility " + rootContext.accordionState.duration;
  //     }

  const [panelStyles, setPanelStyles] = useState({
    height: itemState.isExpanded ? getPanelHeight(itemState.panelDOM) : 0,
    visibility: itemState.isExpanded ? 'visible' : 'hidden',
    boxSizing: 'border-box',
    overflow: 'hidden',
    transition: rootContext.accordionState.notTransition
      ? ''
      : 'height ' +
        rootContext.accordionState.duration +
        ' ' +
        rootContext.accordionState.easing +
        ', visibility ' +
        rootContext.accordionState.duration,
  });

  // duration, easing, notTransition状態が変更されたら更新
  useEffect(() => {
    setPanelStyles((panelStyles) => ({
      ...panelStyles,
      transition: rootContext.accordionState.notTransition
        ? ''
        : 'height ' +
          rootContext.accordionState.duration +
          ' ' +
          rootContext.accordionState.easing +
          ', visibility ' +
          rootContext.accordionState.duration,
    }));
  }, [
    rootContext.accordionState.duration,
    rootContext.accordionState.easing,
    rootContext.accordionState.notTransition,
  ]);

  // アコーディオンの開閉状態が変更されたら発火
  useEffect(() => {
    if (renderFlgRef.current) {
      // トリガー
      setTriggerAttributes((triggerAttributes) => ({
        ...triggerAttributes,
        'aria-expanded': !!itemState.isExpanded,
      }));

      // パネル
      setPanelAttributes((panelAttributes) => ({
        ...panelAttributes,
        'aria-hidden': !itemState.isExpanded,
      }));
      setPanelStyles((panelStyles) => ({
        ...panelStyles,
        height: itemState.isExpanded ? getPanelHeight(itemState.panelDOM) : 0,
        visibility: itemState.isExpanded ? 'visible' : 'hidden',
      }));

      // 開閉時のコールバック関数実行
      if (itemState.isExpanded) {
        if (onOpen !== undefined) onOpen(itemState.panelDOM);
      } else {
        if (onClose !== undefined) onClose(itemState.panelDOM);
      }
    } else {
      renderFlgRef.current = true;
    }
  }, [itemState.isExpanded]);

  // パネルDOM取得時に高さ調整
  useEffect(() => {
    // console.log(itemState.panelDOM)
    setPanelStyles((panelStyles) => ({
      ...panelStyles,
      height: itemState.isExpanded ? getPanelHeight(itemState.panelDOM) : 0,
      visibility: itemState.isExpanded ? 'visible' : 'hidden',
    }));
  }, [itemState.panelDOM]);

  // multipleExpandedの処理
  // falseは自分以外閉じる
  useEffect(() => {
    if (renderFlgRefRoot.current) {
      if (rootContext.accordionState.expandedPanels !== undefined)
        if (rootContext.accordionState.expandedPanels.has(itemState.index)) {
          setItemState((itemState) => ({
            ...itemState,
            isExpanded: true,
          }));
        } else {
          setItemState((itemState) => ({
            ...itemState,
            isExpanded: false,
          }));
        }
    } else {
      renderFlgRefRoot.current = true;
    }
  }, [rootContext.accordionState.expandedPanels]);

  // 開いているパネルの高さをwindowresize時に調整
  useEffect(() => {
    if (renderFlgRefResize.current) {
      if (itemState.isExpanded) {
        setPanelStyles((panelStyles) => ({
          ...panelStyles,
          height: itemState.isExpanded ? getPanelHeight(itemState.panelDOM) : 0,
          visibility: itemState.isExpanded ? 'visible' : 'hidden',
        }));
      }
    } else {
      renderFlgRefResize.current = true;
    }
  }, [rootContext.accordionState.checkWindowResize]);

  return (
    <Context.Provider
      value={{
        itemState,
        setItemState,
        triggerAttributes,
        setTriggerAttributes,
        panelAttributes,
        setPanelAttributes,
        panelStyles,
        setPanelStyles,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
