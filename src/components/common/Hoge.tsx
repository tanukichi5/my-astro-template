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
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/modules/accordion";

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

const Hoge = () => {


  return (
    <>
      <Accordion defaultExpandedPanels={[0]}>
        <AccordionItem>
          <AccordionTrigger>ボタン1</AccordionTrigger>
          <AccordionPanel>アコーディオン内容1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>ボタン2</AccordionTrigger>
          <AccordionPanel>アコーディオン内容2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Hoge;
