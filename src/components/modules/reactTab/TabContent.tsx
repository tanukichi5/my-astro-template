import React, { useContext } from 'react';
import { Context } from './TabContext';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const TabContent = ({ className, children }: Props) => {
  // console.log(props.defo )

  const childrenWithProps = React.Children.map(children, (child: any, i) => {
    // 各子要素をクローンしつつ index を渡す
    // console.log(i)
    return React.cloneElement(child, { tabPanelIndex: i });
  });

  return (
    <>
      <div className={['tab-content', className].join(' ')}>{childrenWithProps}</div>
    </>
  );
};

export default TabContent;
