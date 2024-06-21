import './globals.css';

import Page from '@components/ui/Page/Page';
import TodayEmployees from '@components/Employee/TodayEmployees';
import TodayEntries from '@components/Entry/TodayEntries';
import TopEmployees from '@components/Employee/TopEmployees';

import cls from './style.module.scss';

import TodoList from '../../components/TodoList';

export const revalidate = 0;
const Home = async () => (
  <Page className={cls.homePage} id="home-page">
    <TodayEntries />
    <div className={cls.employeesContainer}>
      <TopEmployees />
      <TodayEmployees />
    </div>
    <TodoList />
  </Page>
);
export default Home;
