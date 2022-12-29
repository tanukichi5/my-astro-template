import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react'
import { Context } from './TabContext'

import { attachEvent } from './helpers/attachEvent'
import { moveTab } from './helpers/moveTab'
import useEffectCustom from './helpers/useEffectCustom'

type Props = {
  tabItemIndex?: number
  tabListDOM?: any
  className?: string
  children?: React.ReactNode
}

const TabListItem = ({
  tabItemIndex,
  tabListDOM,
  className,
  children,
}: Props) => {
  const tabButtonElement = useRef(null)

  const tabContext = useContext(Context)

  // アイテムの状態
  const [tabListItemState, setTabListItemState] = useState({
    index: tabItemIndex,
    expanded: tabContext.tabState.expandedPanel === tabItemIndex,
  })

  // rootのcontext（expandedPanel）に変更があった場合stateを更新
  useEffect(() => {
    setTabListItemState(tabListItemState => ({
      ...tabListItemState,
      expanded: tabContext.tabState.expandedPanel === tabItemIndex,
    }))
  }, [tabContext.tabState.expandedPanel])

  // タブボタンの属性
  const [tabItemAttributes, setTabItemAttributes] = useState({
    'aria-selected': tabListItemState.expanded,
    // "aria-controls": `tab-${tabContext.tabState.uuid}-${tabListItemState.index}`,
    tabIndex: tabListItemState.expanded ? 0 : -1,
  })

  // マウント後aria-controlsを追加する
  // ※クライアントの DOM とサーバーでレンダリングされた DOM が正確に一致しないと警告がでる
  useEffect(() => {
    setTabItemAttributes(currentState => ({
      ...currentState,
      'aria-controls': `tab-${tabContext.tabState.uuid}-${tabListItemState.index}`,
    }))
  }, [])

  useEffect(() => {
    setTabItemAttributes(currentState => ({
      ...currentState,
      'aria-selected': tabListItemState.expanded,
      tabIndex: tabListItemState.expanded ? 0 : -1,
    }))
  }, [tabListItemState.expanded])

  // タブをクリックすると自身のindexをrootのcontext（expandedPanel）にセット
  const tabSwitch = () => {
    tabContext.setTabState(tabState => ({
      ...tabState,
      expandedPanel: tabListItemState.index,
    }))
  }

  // タブボタン上での方向キーイベント
  const onKeydown = useCallback(
    (event: React.KeyboardEvent) => {
      const tabButtons = [...tabListDOM.current.querySelectorAll('button')]
      moveTab(event, tabButtons)
    },
    [tabListDOM.current]
  )

  useEffect(() => {
    const handleOnKeydown = attachEvent(
      tabButtonElement.current,
      'keydown',
      onKeydown
    )

    handleOnKeydown?.addEvent()

    // クリーンアップ関数
    return () => {
      handleOnKeydown?.removeEvent()
    }
  }, [tabListDOM.current])
  // ------------------------------

  return (
    <div className={['tab-list__item', className].join(' ')}>
      <button
        type='button'
        onClick={tabSwitch}
        ref={tabButtonElement}
        className='tab-button'
        {...tabItemAttributes}
        // aria-selected={tabListItemState.expanded}
        // aria-controls={`tab-${tabContext.tabState.uuid}-${tabListItemState.index}`}
        // tabIndex={tabListItemState.expanded ? 0 : -1}
      >
        {children}
      </button>
      {/* {tabListItemState.index} */}
      {/* {tabContext.tabState.hoge} */}
    </div>
  )
}

export default TabListItem
