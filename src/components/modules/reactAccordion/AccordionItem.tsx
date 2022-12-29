import React, { useContext } from 'react'
import { Provider, Context } from './ItemContext'
import { Context as accordionContext } from './AccordionContext'

type Props = {
  panelIndex?: any
  className?: string
  children?: React.ReactNode
}

const AccordionItem = ({ panelIndex, className, children }: Props) => {
  const rootContext = useContext(accordionContext)
  return (
    <Provider panelIndex={panelIndex}>
      <Context.Consumer>
        {() => {
          return (
            <>
              <div className={['accordion-item', className].join(' ')}>
                {children}
              </div>
            </>
          )
        }}
      </Context.Consumer>
    </Provider>
  )
}

export default AccordionItem
