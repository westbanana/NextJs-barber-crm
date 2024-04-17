import React from 'react';

import cls from './style.module.scss';

import EntryCard from '../../components/Entry/EntryCard';

const TestPage = async () => (
  <div
    className={cls.test}
  >
    <div className={cls.test2} />
  </div>
);

export default TestPage;
