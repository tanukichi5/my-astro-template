/**
 *
 * tabモジュール
 *
 * @usage
 * import { Tab, TabContent, TabList, TabListItem, TabPanel } from '@/components/modules/reactTab';
 *
 * <Tab>
 *   <TabList>
 *     <TabListItem>
 *       タブボタン1
 *     </TabListItem>
 *     <TabListItem>
 *       タブボタン2
 *     </TabListItem>
 *   </TabList>
 *   <TabContent>
 *     <TabPanel>
 *       タブ内容1
 *     </TabPanel>
 *     <TabPanel>
 *       タブ内容2
 *     </TabPanel>
 *   </TabContent>
 * </Tab>
 *
 */

import Tab from './Tab'
import TabList from './TabList'
import TabListItem from './TabListItem'
import TabContent from './TabContent'
import TabPanel from './TabPanel'

export { Tab, TabList, TabListItem, TabContent, TabPanel }
// export { default as Tab } from './Tab'
// export { default as TabList } from './TabList'
// export { default as TabListItem } from './TabListItem'
// export { default as TabContent } from './TabContent'
// export { default as TabPanel } from './TabPanel'
