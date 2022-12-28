/**
 *
 * Modalモジュール
 *
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import ModalPortal from './ModalPortal';

import { attachEvent } from './helpers/attachEvent';
import { backFixed } from './helpers/backFixed';
import { retainFocus } from './helpers/retainFocus';
import uuid from './helpers/uuid';

//デフォルトのスタイル
import * as styles from './ModalStyle';

type InjectedModalState = {
  children?: React.ReactNode;
  init?: boolean;
  id: string;
  portalTarget?: string;
  siteContent?: string;
  setRootState?: any;
  expanded: boolean;
  backFixed?: boolean;
  clickOutsideClose?: boolean;
  modalDOM?: React.RefObject<HTMLInputElement> | null;
  'aria-hidden'?: boolean;
  tabindex?: number;
  domHide?: boolean;
  animationType?: 'animation' | 'transition' | '';
  modalSource?: boolean;
  customClassNames?: {
    wrapper?: string;
    content?: string;
    overlay?: string;
  };
  applyDefaultStyles?: boolean;
  onOpen?: () => void;
  onClose?: (v: any) => void;
  openButton?: HTMLButtonElement | HTMLAnchorElement | null | undefined;
  watchParameter?: any;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type CustomModalProps = Omit<InjectedModalState, 'setRootState' | 'modalSource' | 'aria-hidden'>;

/* モーダルを使うためのカスタムフック
 * ========================================================================== */
export const useModal = (props: CustomModalProps) => {
  const [modalState, setModalState] = useState(props);

  // 開くボタンをクリックしたときの関数
  const modalToggle = (v?: any) => {
    setModalState((currentState) => ({
      ...currentState,
      openButton: !modalState.expanded && v ? v.currentTarget : modalState.openButton,
      expanded: !modalState.expanded,
    }));
  };

  return [modalState, setModalState, modalToggle] as const;
};
// ==========================================================================

const Modal: React.FC<InjectedModalState> = (props) => {
  // is mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  //= ===========is mounted

  const modalElement = useRef<HTMLDivElement>(null);

  const [modalState, setModalState] = useState({
    //初期状態化どうか
    init: !(props.init === undefined) ? props.init : true,
    //ユニークID
    id: `${props.id}-${uuid()}`,
    //レンダリングする場所
    portalTarget: !(props.portalTarget === undefined) ? props.portalTarget : undefined,
    //指定した場所がモーダルを開いたときにスクリーンリーダーの対象外になる
    siteContent: !(props.siteContent === undefined) ? props.siteContent : undefined,
    //モーダルの開閉状態
    expanded: props.expanded,
    //モーダルオープン時にスクロールを固定する
    backFixed: false,
    //モーダルの外側をクリックでモーダルを閉じる
    clickOutsideClose: !(props.clickOutsideClose === undefined) ? props.clickOutsideClose : true,
    'aria-hidden': !props.expanded,
    tabindex: -1,
    animationType: !(props.animationType === undefined) ? props.animationType : 'animation', //初期値を空文字列にしないと意図せずモーダルが閉じるときがある
    //wrapper, content, overlay要素に任意のclassNameを設定可能
    customClassNames: !(props.customClassNames === undefined) ? props.customClassNames : undefined,
    //デフォルトのスタイルを使用するかどうか
    applyDefaultStyles: !(props.applyDefaultStyles === undefined) ? props.applyDefaultStyles : true,
    domHide: !(props.domHide === undefined) ? props.domHide : true,
    modalSource: true,
    modalDOM: modalElement,
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
    watchParameter: props.watchParameter,
    openButton: props.openButton,
  });

  // propsが変更された場合
  useEffect(() => {
    setModalState((currentState) => ({
      ...currentState,
      init: false,
      expanded: props.expanded,
      backFixed: props.backFixed ?? false,
      openButton: props.openButton,
      modalDOM: modalElement,
      customClassNames: props.customClassNames,
      watchParameter: props.watchParameter,
      // onClose: props.onClose ? props.onClose : () => {},
      'aria-hidden': !props.expanded,
    }));

    // console.log(modalState.modalDOM.current)
  }, [props]);

  /* ページ遷移した時に背景固定をやめる
   * ========================================================================== */
  useEffect(() => {
    backFixed(false, false);
    setModalState((currentState) => ({
      ...currentState,
      expanded: false,
    }));
  }, [mounted && window.location.href]);

  /* modalStateの開閉状態が変更されたときの処理
   * ========================================================================== */
  useEffect(() => {
    // 親要素のstateを変更
    props.setRootState((c: any) => ({
      ...c,
      init: modalState.init,
      expanded: modalState.expanded,
    }));

    const siteContent: Element | undefined = modalState.siteContent
      ? (document.querySelector(modalState.siteContent) as Element)
      : undefined;

    if (modalState.expanded) {
      // モーダル開いた時

      // tabやescキーでのイベントを付与
      if (!(handleOnKeydown === undefined) && mounted) {
        handleOnKeydown.addEvent();
      }

      // モーダルの外側をクリックで閉じるイベントを付与
      // if (modalState.clickOutsideClose && !(handleOnClickOutSide === undefined)) {
      //   handleOnClickOutSide.addEvent()
      // }

      // "transition"や"animation"終了時にDOMを非表示にするイベントを削除
      // if(!(domHideEvent === undefined))
      //   domHideEvent.removeEvent()

      // サイトのメイン部分をスクリーンリーダーなどから除外する
      if (siteContent) {
        siteContent.setAttribute('aria-hidden', 'true');
      }

      // モーダルオープン時に実行する任意の関数
      if (modalState.onOpen !== undefined) {
        modalState.onOpen();
      }

      setModalState((currentState) => ({
        ...currentState,
        modalSource: false,
      }));
    } else {
      // モーダルが閉じた時

      // tabやescキーでのイベントを削除
      if (!(handleOnKeydown === undefined)) {
        handleOnKeydown.removeEvent();
      }

      // モーダルの外側をクリックで閉じるイベントを削除
      // if (modalState.clickOutsideClose && !(handleOnClickOutSide === undefined)) {
      //   handleOnClickOutSide.removeEvent()
      // }

      // "transition"や"animation"終了時にDOMを非表示にするイベントを付与
      if (!(domHideEvent === undefined)) {
        domHideEvent.addEvent();
      }

      // モーダルクローズ時に実行する任意の関数
      if (modalState.onClose !== undefined) {
        modalState.onClose(modalState.watchParameter);
      }

      // サイトのメイン部分をスクリーンリーダーなどを有効にする
      if (siteContent) {
        siteContent?.removeAttribute('aria-hidden');
      }

      // モーダルを開いたボタンにフォーカスを当てる
      focusOpenButton(modalState.openButton);
    }

    // 背景固定
    if (modalState.backFixed) backFixed(modalState.expanded);
  }, [modalState.expanded]);
  // ==========================================================================

  /* Escキー : モーダル閉じる, Tabキー : モーダル内フォーカス移動
   * ========================================================================== */
  const onKeydown = useCallback((event: React.KeyboardEvent) => {
    // Escキー
    if (event.code === 'Escape') {
      // console.log('Esc Key is pressed!')
      closeModal();
    }
    // Tabキー
    if (event.code === 'Tab') {
      // console.log('Tab Key is pressed!')
      retainFocus(event, modalState.modalDOM.current);
    }
  }, []);

  const handleOnKeydown = mounted ? attachEvent(document, 'keydown', onKeydown) : undefined;
  // ==========================================================================

  // モーダルの外側クリックで閉じる
  // const clickOutsideClose = useCallback(event => {
  //   // .modal-contentの外側
  //   if (!event.target.closest(`.modal-content`)) {
  //     closeModal()
  //   }
  // }, [])

  // const handleOnClickOutSide = mounted
  //   ? attachEvent(document, 'click', clickOutsideClose)
  //   : undefined

  /* モーダルの外側をクリックで閉じる
   * ========================================================================== */
  useEffect(() => {
    if (!modalState.clickOutsideClose) return;

    //対象の要素を取得
    const el = modalState.modalDOM.current;
    const modalContent = el?.querySelector('.modal-content');

    //対象の要素がなければ何もしない
    if (!modalContent) return;

    //クリックした時に実行する関数
    const hundleClickOutside = (e: MouseEvent) => {
      if (!modalContent?.contains(e.target as Node)) {
        //ここに外側をクリックしたときの処理
        closeModal();
      } else {
        //ここに内側をクリックしたときの処理
      }
    };

    if (modalState.expanded) {
      //クリックイベントを設定
      document.addEventListener('click', hundleClickOutside);
    }

    //クリーンアップ関数
    return () => {
      //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
      document.removeEventListener('click', hundleClickOutside);
    };
  }, [modalState.modalDOM, modalState.expanded]);
  // ==========================================================================

  /* cssアニメーション終了時にモーダルのDOMを非表示
   * ========================================================================== */
  const animationEndDomHide = useCallback(() => {
    setModalState((currentState) => ({
      ...currentState,
      expanded: false,
      modalSource: true,
    }));

    // "transition"や"animation"終了時にDOMを非表示にするイベントを削除
    if (!(domHideEvent === undefined)) domHideEvent.removeEvent();
  }, [modalState.expanded]);

  const animationType = (v: string) => {
    let type;
    switch (v) {
      case 'transition':
        type = 'transitionend';
        break;
      case 'animation':
        type = 'animationend';
        break;
      default:
        type = '';
    }
    return type;
  };

  const domHideEvent = attachEvent(
    modalState.modalDOM.current,
    animationType(modalState.animationType),
    animationEndDomHide
  );
  // ==========================================================================

  /* モーダルを閉じる関数
   * ========================================================================== */
  const closeModal = useCallback(() => {
    setModalState((currentState) => ({
      ...currentState,
      expanded: false,
      modalSource: false,
    }));
    props.setRootState((c: any) => ({
      ...c,
      expanded: false,
    }));
    // focusOpenButton()
  }, [props]);
  // ==========================================================================

  /* 開くボタンにフォーカスを当てる
   * ========================================================================== */
  const focusOpenButton = useCallback((buttonEl: HTMLButtonElement | HTMLAnchorElement | null | undefined) => {
    if (buttonEl) {
      buttonEl.focus();
    }
  }, []);
  // ==========================================================================

  /* デフォルトのスタイルを設定
   * ========================================================================== */
  const [defaultStyles, setDefaultStyles] = useState({
    wrapper: styles.defaultWrapperStyle,
    content: styles.defaultContentStyle,
    overlay: styles.defaultOverlayStyle,
  });
  useEffect(() => {
    if (modalState.expanded) {
      setDefaultStyles((currentState) => ({
        ...currentState,
        wrapper: { ...styles.defaultWrapperStyle, ...styles.defaultWrapperOpenedStyle },
        content: styles.defaultContentStyle,
      }));
    } else {
      setDefaultStyles((currentState) => ({
        ...currentState,
        wrapper: { ...styles.defaultWrapperStyle, ...styles.defaultWrapperClosedStyle },
        content: styles.defaultContentStyle,
      }));
    }
  }, [modalState.expanded]);
  // ==========================================================================

  if (!mounted) return null;

  if (modalState.domHide && modalState.modalSource) return null;

  return (
    // portalTargetを未指定の場合はその場にレンダリングする
    <>
      {modalState.portalTarget ? (
        <ModalPortal portalTarget={modalState.portalTarget}>
          <div
            id={modalState.id}
            className={['modal', modalState.customClassNames?.wrapper ? modalState.customClassNames.wrapper : ''].join(
              ' '
            )}
            {...(modalState.applyDefaultStyles && { style: defaultStyles.wrapper })}
            tabIndex={modalState.tabindex}
            aria-hidden={!modalState.expanded}
            ref={modalElement}
          >
            <div
              className={[
                'modal-content',
                modalState.customClassNames?.content ? modalState.customClassNames.content : '',
              ].join(' ')}
              {...(modalState.applyDefaultStyles && { style: defaultStyles.content })}
            >
              {props.children}
            </div>
            <div
              className={[
                'modal-overlay',
                modalState.customClassNames?.overlay ? modalState.customClassNames.overlay : '',
              ].join(' ')}
              {...(modalState.applyDefaultStyles && { style: defaultStyles.overlay })}
            ></div>
          </div>
        </ModalPortal>
      ) : (
        <div
          id={modalState.id}
          className={['modal', modalState.customClassNames?.wrapper ? modalState.customClassNames.wrapper : ''].join(
            ' '
          )}
          {...(modalState.applyDefaultStyles && { style: defaultStyles.wrapper })}
          tabIndex={modalState.tabindex}
          aria-hidden={!modalState.expanded}
          ref={modalElement}
        >
          <div
            className={[
              'modal-content',
              modalState.customClassNames?.content ? modalState.customClassNames.content : '',
            ].join(' ')}
            {...(modalState.applyDefaultStyles && { style: defaultStyles.content })}
          >
            {props.children}
          </div>
          <div
            className={[
              'modal-overlay',
              modalState.customClassNames?.overlay ? modalState.customClassNames.overlay : '',
            ].join(' ')}
            {...(modalState.applyDefaultStyles && { style: defaultStyles.overlay })}
          ></div>
        </div>
      )}
    </>
  );
};
export default Modal;
