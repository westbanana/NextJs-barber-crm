import React from 'react';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { classNames } from '@lib/classNames/classNames';

import cls from './style.module.scss';

export type AccordionProps = {
  callback: () => void,
  className?: string,
  opened: boolean,
}

const Accordion = ({ callback, className, opened }: AccordionProps) => {
  const onClickHandler = () => {
    callback();
  };
  return (
    <div
      className={classNames(cls.accordion, {}, [className])}
      onClick={onClickHandler}
    >
      {opened
        ? <ChevronsDownUp />
        : <ChevronsUpDown />}
    </div>
  );
};

export default Accordion;
