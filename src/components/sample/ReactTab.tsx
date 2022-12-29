/**
 *
 * reactで作ったtabのサンプルコンポーネントです
 *
 */

import { Tab, TabContent, TabList, TabListItem, TabPanel } from '@/components/modules/reactTab';

//= ===========================各種インポートここまで

const SampleReactTab = () => {
  return (
    <>
      <Tab>
        <TabList>
          <TabListItem>タブボタン1</TabListItem>
          <TabListItem>タブボタン2</TabListItem>
          <TabListItem>タブボタン3</TabListItem>
        </TabList>
        <TabContent>
          <TabPanel>タブの内容1</TabPanel>
          <TabPanel>タブの内容2</TabPanel>
          <TabPanel>タブの内容3</TabPanel>
        </TabContent>
      </Tab>
    </>
  );
};

export default SampleReactTab;
