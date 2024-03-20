'use client';

import React, { useState } from 'react';

import { SelectProps } from '@/components/ui/Select/select.type';

import cls from './style.module.scss';

const Select = ({ data = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'], callback }:SelectProps) => {
  const [result, setResult] = useState<string>('');
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const openSelectList = () => setIsOpened(true);
  const selectItem = (el: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResult(el);
    setIsOpened(false);
  };
  console.log(isOpened);
  return (
    <div className={cls.mainContainer}>
      <div className={cls.result} onClick={openSelectList}>
        {result || 'Select...'}
        {'>'}
      </div>
      {isOpened && (
        <div className={cls.list}>
          {data.map((el) => (
            <span
              key={el}
              className={cls.item}
              onClick={(e) => selectItem(el, e)}
            >
              {el}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
