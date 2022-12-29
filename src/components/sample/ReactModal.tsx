/**
 *
 * reactで作ったModalのサンプルコンポーネントです
 *
 */

// reactの機能
import Modal, { useModal } from '@/components/modules/reactModal';

// style
// import styles from './Alert.module.scss';

//= ===========================各種インポートここまで

const ModalTest = () => {
  const [accountModalState, setAccountModalState, accountModalToggle] = useModal({
    init: true,
    id: 'account',
    portalTarget: 'body',
    siteContent: '.siteWrapper',
    expanded: false,
    domHide: false,
    backFixed: true,
    animationType: 'transition',
    // customClassNames: {
    //   wrapper: styles['header-account__modal-base-wrapper'],
    // },
    // applyDefaultStyles: false,
  });

  return (
    <>
      <div>
        <button
          onClick={accountModalToggle}
          data-js-modal-expanded={accountModalState.expanded}
          data-js-modal-button-clicked={accountModalState.expanded}
          data-js-modal-init={accountModalState.init}
        >
          <span>モーダルを開く</span>
        </button>
        <Modal
          {...accountModalState}
          setRootState={setAccountModalState}
        >
          <div>
            <button onClick={accountModalToggle}>
              <span>閉じる</span>
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ModalTest;
