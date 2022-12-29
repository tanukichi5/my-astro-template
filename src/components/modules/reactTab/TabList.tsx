import React, { useRef } from 'react'
import { Context } from './TabContext'

type Props = {
  className?: string
  children?: React.ReactNode
}

const TabList = ({ className, children }: Props) => {
  const tabListElement = useRef(null)

  const childrenWithProps = React.Children.map(children, (child: any, i) => {
    // 各子要素をクローンしつつ index を渡す
    // console.log(i)
    return React.cloneElement(child, {
      tabItemIndex: i,
      tabListDOM: tabListElement,
    })
  })

  return (
    <>
      <div className={['tab-list', className].join(' ')} ref={tabListElement}>
        {childrenWithProps}
      </div>
    </>
  )
}

export default TabList
