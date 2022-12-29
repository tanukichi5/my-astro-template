import React, { useContext, useRef, useEffect } from 'react';
import { Context } from './ItemContext';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const AccordionPanel = ({ className, children }: Props) => {
  const itemContext = useContext(Context);
  const paneleElement = useRef(null);

  useEffect(() => {
    // パネルのDOMを取得
    itemContext.setItemState((itemState) => ({
      ...itemState,
      panelDOM: paneleElement,
    }));
  }, []);

  return (
    <div
      ref={paneleElement}
      className={['accordion-panel', className].join(' ')}
      style={itemContext.panelStyles}
      {...itemContext.panelAttributes}
    >
      {children}
    </div>
  );
};

export default AccordionPanel;
