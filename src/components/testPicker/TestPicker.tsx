import React from 'react';

import cls from './style.module.scss';

const TestPicker = () => {
  const leftData = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const rightData = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  return (
    <div className={cls.mainContainer}>
      <span>TITLE</span>
      <div className={cls.selects}>
        <div className={cls.leftSide}>
          {leftData.map((item) => (
            <div className={cls.item}>{item}</div>
          ))}
        </div>
        <div className={cls.rightSide}>
          {rightData.map((item) => (
            <div className={cls.item}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPicker;
