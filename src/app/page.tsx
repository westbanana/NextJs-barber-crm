import EmployeeStatistics from '@components/Employee/EmployeesStatistic';

import cls from './style.module.scss';

import './globals.css';
import TopEmployees from '../components/Employee/TopEmployees';
import TodayEntries from '../components/Entry/TodayEntries';

import Page from '@/components/ui/Page/Page';

const Home = () => (
  <Page className={cls.homePage}>
    <TodayEntries />
    <TopEmployees />
    <EmployeeStatistics />
  </Page>
);
export default Home;
