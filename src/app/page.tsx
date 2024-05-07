import cls from './style.module.scss';

import TopEmployees from '../components/Employee/TopEmployees';
import TodayEntries from '../components/Entry/TodayEntries';

import Page from '@/components/ui/Page/Page';

const Home = async () => (
  <Page className={cls.homePage}>
    <TodayEntries />
    <TopEmployees />
  </Page>
);
export default Home;
