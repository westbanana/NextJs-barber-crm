import TodayEntries from '@/components/TodayEntries';
import Page from '@/components/ui/Page/Page';

import cls from './style.module.scss';

const Home = () => (
  <Page className={cls.mainPage}>
    <TodayEntries />
  </Page>
);
export default Home;
