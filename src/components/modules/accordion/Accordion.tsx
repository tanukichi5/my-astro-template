import React, { useState, useEffect } from 'react'
import Provider, { Context, InjectedAccordionState } from './AccordionContext'

const Accordion: React.FC<InjectedAccordionState> = props => {
  // // is mounted
  // const [mounted, setMounted] = useState(false)
  // useEffect(() => {
  //   setMounted(true)
  // }, [])
  // //= ===========is mounted
  // if (!mounted) return null

  const childrenWithProps = React.Children.map(
    props.children,
    (child: any, i) => {
      // 各子要素をクローンしつつ index を渡す
      // console.log(i)
      return React.cloneElement(child, { panelIndex: i })
    }
  )

  return (
    <Provider
      defaultExpandedPanels={props.defaultExpandedPanels}
      multipleExpanded={props.multipleExpanded}
      easing={props.easing}
      duration={props.duration}
      notTransition={props.notTransition}
      onOpen={props.onOpen}
      onClose={props.onClose}
    >
      <Context.Consumer>
        {value => {
          return (
            <>
              <div
                className={`accordion ${
                  props.className ? props.className : ''
                }`}
              >
                {childrenWithProps}
              </div>
            </>
          )
        }}
      </Context.Consumer>
    </Provider>
  )
}

export default Accordion
