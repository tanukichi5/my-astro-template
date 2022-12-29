import React, { useState, useEffect, useCallback, createContext } from 'react';
import { useDebounceFn } from './helpers/useDebounceFn';
import { attachEvent } from './helpers/attachEvent';

interface Props {
  children?: React.ReactNode;
  defaultExpandedPanels?: number[];
  multipleExpanded?: boolean;
  easing?: string;
  duration?: string;
  notTransition?: boolean;
  onOpen?: (panel: React.RefObject<HTMLInputElement> | null) => void;
  onClose?: (panel: React.RefObject<HTMLInputElement> | null) => void;
}
// accordionStateのインターフェース
export interface InjectedAccordionState {
  children?: React.ReactNode;
  expandedPanels?: Set<unknown>;
  defaultExpandedPanels?: number[];
  easing?: string;
  duration?: string;
  notTransition?: boolean;
  multipleExpanded?: boolean | undefined;
  checkWindowResize?: number;
  onOpen?: (panel: React.RefObject<HTMLInputElement> | null) => void;
  onClose?: (panel: React.RefObject<HTMLInputElement> | null) => void;
  customStyles?: any;
  className?: string;
}

export const Context = createContext(
  {} as {
    accordionState: InjectedAccordionState;
    setAccordionState: React.Dispatch<React.SetStateAction<InjectedAccordionState>>;
  }
);

const Provider: React.FC<Props> = (props) => {
  // is mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  //= ===========is mounted

  const [accordionState, setAccordionState] = useState<InjectedAccordionState>({
    expandedPanels: new Set(),
    defaultExpandedPanels: props.defaultExpandedPanels ? props.defaultExpandedPanels : [],
    easing: props.easing ? props.easing : 'ease-out',
    duration: props.duration ? props.duration : '.3s',
    notTransition: props.notTransition ? props.notTransition : false,
    multipleExpanded: !(props.multipleExpanded === undefined) ? props.multipleExpanded : true,
    checkWindowResize: 0,
    onOpen: props.onOpen
      ? props.onOpen
      : () => {
          // 何もしない。
        },
    onClose: props.onClose
      ? props.onClose
      : () => {
          // 何もしない。
        },
    customStyles: {
      root: undefined,
      item: undefined,
      trigger: undefined,
      panel: undefined,
    },
  });

  useEffect(() => {
    setAccordionState((accordionState) => ({
      ...accordionState,
      easing: props.easing ? props.easing : 'ease-out',
      duration: props.duration ? props.duration : '.3s',
      notTransition: props.notTransition ? props.notTransition : false,
      multipleExpanded: !(props.multipleExpanded === undefined) ? props.multipleExpanded : true,
      checkWindowResize: window.innerWidth,
    }));
  }, [props.multipleExpanded, props.notTransition, props.easing, props.duration, props.onClose, props.onOpen]);

  // パネルの高さを揃えるリサイズイベント
  const windowResizePanelHeightRecalculation = () => {
    // console.log('関数生成')
    setAccordionState((accordionState) => ({
      ...accordionState,
      checkWindowResize: window.innerWidth,
    }));
  };
  // リサイズイベントを間引く処理
  const [onResizeHandler] = useDebounceFn(windowResizePanelHeightRecalculation, 500);
  // リサイズイベントを登録
  const panelHeightRemoveEvent = mounted ? attachEvent(window, 'resize', onResizeHandler.bind(this)) : undefined;

  useEffect(() => {
    if (!(panelHeightRemoveEvent === undefined) && mounted) {
      panelHeightRemoveEvent.addEvent();
    }
    // クリーンアップ関数
    return () => {
      // console.log('リサイズイベントを削除')
      panelHeightRemoveEvent?.removeEvent();
    };
  }, [panelHeightRemoveEvent]);

  return (
    <Context.Provider
      value={{
        accordionState,
        setAccordionState,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
