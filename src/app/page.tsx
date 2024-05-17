import './globals.css';
import Page from '@/components/ui/Page/Page';
import EmployeeStatistics from '@components/Employee/EmployeesStatistic';

import cls from './style.module.scss';

import TopEmployees from '../components/Employee/TopEmployees';
import TodayEntries from '../components/Entry/TodayEntries';

const Home = () => (
  <Page className={cls.homePage}>
    <TodayEntries />
    <TopEmployees />
    <EmployeeStatistics />
  </Page>
);
export default Home;
