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
import { useState } from 'react';

// style
import styles from './Alert.module.scss';

//= ===========================各種インポートここまで

type Props = {
  /**
   * 色を値に応じて変えることができます。
   */
  alert: 'success' | 'danger' | 'warning';
  children: React.ReactNode;
};

const Alert: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <div className={`${styles['c-alert']} ${styles['-' + props.alert]}`}>
        <p className={styles['c-alert__text']}>{props.children}</p>
      </div>
    </>
  );
};

export default Alert;
