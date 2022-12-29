import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
  portalTarget: string;
};

const ModalPortal = (props: Props) => {
  return ReactDOM.createPortal(props.children, document.querySelector(props.portalTarget) as Element);
};

export default ModalPortal;
