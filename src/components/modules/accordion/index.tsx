/**
 *
 * Accordionモジュール
 *
 * @usage
 * import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from 'components/modules/accordion';
 *
 * <Accordion>
 *   <AccordionItem>
 *     <AccordionTrigger>
 *       ボタン1
 *     </AccordionTrigger>
 *     <AccordionPanel>
 *       アコーディオン内容1
 *     </AccordionPanel>
 *   </AccordionItem>
 *   <AccordionItem>
 *     <AccordionTrigger>
 *       ボタン2
 *     </AccordionTrigger>
 *     <AccordionPanel>
 *       アコーディオン内容2
 *     </AccordionPanel>
 *   </AccordionItem>
 * </Accordion>
 *
 * AccordionItemコンポーネントのchildrenは以下のコンポーネントが含まれていれば構造は自由です。
 * - AccordionTrigger
 * - AccordionPanel
 *
 */

import Accordion from './Accordion'
import AccordionItem from './AccordionItem'
import AccordionTrigger from './AccordionTrigger'
import AccordionPanel from './AccordionPanel'

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel }

// export { default as Accordion } from './Accordion'
// export { default as AccordionItem } from './AccordionItem'
// export { default as AccordionTrigger } from './AccordionTrigger'
// export { default as AccordionPanel } from './AccordionPanel'
