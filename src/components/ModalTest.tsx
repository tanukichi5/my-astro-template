/**
 * errorやsuccessメッセージを表示するコンポーネントです
 *
 * @see
 * bootstrapのAlertsを参考にしてます
 * https://getbootstrap.com/docs/5.0/components/alerts/
 *
 * @usage
 * import Alert from 'components/common/Alert'
 * <Alert alert='success'>
 *    メッセージをここに記入
 * </Alert>
 *
 */

// reactの機能
import Modal, { useModal } from '@/components/modules/modal'

// style
// import styles from './Alert.module.scss';

//= ===========================各種インポートここまで

type Props = {
  /**
   * 色を値に応じて変えることができます。
   */
  alert: 'success' | 'danger' | 'warning';
  children: React.ReactNode;
};

const ModalTest = () => {

  const [accountModalState, setAccountModalState, accountModalToggle] = useModal({
    init: true,
    id: 'account',
    portalTarget: 'body',
    siteContent: '.siteWrapper', // TODO: これは対象がおかしいのでモーダルを修正する必要がある（モーダル内もスクーンリーダーの対象外になっている）
    expanded: false,
    domHide: false,
    backFixed: false,
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

            <button
              onClick={accountModalToggle}
            >
              <span>閉じる</span>
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ModalTest;
