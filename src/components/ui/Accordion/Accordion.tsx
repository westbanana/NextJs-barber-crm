import React, { ComponentProps, useEffect, useState } from 'react';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';

import { classNames, Mods } from '@lib/classNames/classNames';

import cls from './style.module.scss';

export interface AccordionProps extends ComponentProps<'button'> {
  callback?: () => void,
  className?: string,
  defaultState?: boolean,
  dependencyState?: boolean | null
}

const Accordion = ({
  callback, className, defaultState = false, disabled, dependencyState,
}: AccordionProps) => {
  const [opened, setOpened] = useState<boolean>(defaultState);

  useEffect(() => {
    if (dependencyState !== null) {
      setOpened(dependencyState!!);
    }
  }, [dependencyState]);

  const onClickHandler = () => {
    if (disabled) return;
    setOpened((prev) => !prev);
    callback?.();
  };
  const mods: Mods = {
    [cls.disabled]: disabled,
  };

  return (
    <div
      className={classNames(cls.accordion, mods, [className])}
      onClick={onClickHandler}
    >
      {opened
        ? <ChevronsDownUp />
        : <ChevronsUpDown />}
    </div>
  );
};

export default Accordion;
