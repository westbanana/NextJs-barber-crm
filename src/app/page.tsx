import './globals.css';

import Page from '@/components/ui/Page/Page';
import EmployeeStatistics from '@components/Employee/EmployeesStatistic';
import TodayEmployees from '@components/Employee/TodayEmployees';
import TodayEntries from '@components/Entry/TodayEntries';
import TopEmployees from '@components/Employee/TopEmployees';
import Calendar from '@components/Calendar/Calendar';
import { fetchCalendarInfo } from '@components/Calendar/services/fetchCalendarInfo';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';

import cls from './style.module.scss';

export const revalidate = 0;
const Home = async () => {
  const { entries } = await fetchCalendarInfo();
  return (
    <Page className={cls.homePage} id="home-page">
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
      <Calendar entries={entries as IEntry[]} />
    </Page>
  );
};
export default Home;
