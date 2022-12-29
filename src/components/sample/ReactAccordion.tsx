/**
 *
 * reactで作ったAccordionのサンプルコンポーネントです
 * 
 * メモ)
 * .astroファイルに直接Accordionをインポートすると動かなかったのでreactコンポーネント内で実行すると動いたのでこのような実装になった
 *
 */

// reactの機能
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/modules/reactAccordion";


//= ===========================各種インポートここまで

const SampleReactAccordion = () => {
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

export default SampleReactAccordion;
