import './globals.css';
import Page from '@/components/ui/Page/Page';
import EmployeeStatistics from '@components/Employee/EmployeesStatistic';
import TodayEmployees from '@components/Employee/TodayEmployees';
import TodayEntries from '@components/Entry/TodayEntries';
import TopEmployees from '@components/Employee/TopEmployees';
import Calendar from '@components/Calendar/Calendar';

import cls from './style.module.scss';

const Home = () => (
  <Page className={cls.homePage}>
    <TodayEntries />
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
    }}
    >
      <TopEmployees />
      <TodayEmployees />
    </div>
    <EmployeeStatistics />
    {/* <Calendar /> */}
  </Page>
);
export default Home;
