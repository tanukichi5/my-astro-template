import React, { useState, useEffect, useContext } from 'react'
import { Context } from './TabContext'

type Props = {
  tabPanelIndex?: number
  className?: string
  children?: React.ReactNode
}

const styles: { [key: string]: React.CSSProperties } = {
  block: {
    display: 'block',
  },
  none: {
    display: 'none',
  },
}

const TabPanel = ({ tabPanelIndex, className, children }: Props) => {
  const tabContext = useContext(Context)

  // パネルの状態
  const [tabPanelState, setTabPanelState] = useState({
    index: tabPanelIndex,
    expanded: tabContext.tabState.expandedPanel === tabPanelIndex,
  })

  // rootのcontext（expandedPanel）に変更があった場合stateを更新
  useEffect(() => {
    setTabPanelState(tabPanelState => ({
      ...tabPanelState,
      expanded: tabContext.tabState.expandedPanel === tabPanelIndex,
    }))
  }, [tabContext.tabState.expandedPanel])

  // タブボタンの属性
  const [tabPanelAttributes, setTabPanelAttributes] = useState<{ id: string }>()

  // マウント後aria-controlsを追加する
  // ※クライアントの DOM とサーバーでレンダリングされた DOM が正確に一致しないと警告がでる
  useEffect(() => {
    setTabPanelAttributes({
      id: `tab-${tabContext.tabState.uuid}-${tabPanelState.index}`,
    })
  }, [])

  return (
    <div
      {...tabPanelAttributes}
      className={['tab-panel', className].join(' ')}
      aria-hidden={!tabPanelState.expanded}
      style={tabPanelState.expanded ? styles.block : styles.none}
    >
      {/* {tabContext.tabState.hoge} */}
      {children}
      {/* <p>
          現在開いているパネル : {tabContext.tabState.expandedPanel}
      </p> */}
    </div>
  )
}

export default TabPanel
