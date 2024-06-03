'use client';

import React, {
  ComponentPropsWithoutRef, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';

import { classNames, Mods } from '@lib/classNames/classNames';
import Accordion from '@components/ui/Accordion/Accordion';
import Label from '@components/Label/Label';
import useInFocus from '@lib/hooks/useInFocus';

import cls from './style.module.scss';

interface ExpandableContainerProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode[] | ReactNode
  controlPanel?: ReactNode[] | ReactNode
  label: string
}

const ExpandableContainer = ({
  children, controlPanel, label,
}: ExpandableContainerProps) => {
  const { focusedRef, setFocused, focused } = useInFocus();
  const [showAccordion, setShowAccordion] = useState<boolean>(false);
  const [listOpened, setListOpened] = useState<boolean>(focused);
  const listRef = useRef<HTMLDivElement>(null);
  const toggleList = () => {
    setListOpened((prev) => !prev);
    setFocused((prev) => !prev);
  };

  useEffect(() => {
    if (!focused && listOpened) {
      setListOpened(false);
    }
  }, [listOpened, focused]);

  const resizeHandler = useCallback(() => {
    if (focusedRef.current && listRef.current) {
      if (listRef.current.scrollHeight <= focusedRef.current.clientHeight) {
        setShowAccordion(false);
      } else {
        setShowAccordion(true);
      }
    }
  }, [focusedRef]);

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  const listMods: Mods = {
    [cls.emptyList]: Array.isArray(children) ? !children.length : children,
    [cls.openedList]: listOpened,
  };

  return (
    <div
      ref={focusedRef}
      className={classNames(cls.mainContainer, {}, ['afterLoading'])}
    >
      <Label label={label} alwaysOnBorder />
      <div className={cls.controlPanel}>
        {showAccordion && (
          <Accordion
            dependencyState={listOpened}
            callback={toggleList}
            className={cls.todayEntriesAccordion}
          />
        )}
        {Array.isArray(controlPanel)
          // eslint-disable-next-line react/no-array-index-key
          ? controlPanel.map((element, idx) => <React.Fragment key={idx}>{element}</React.Fragment>)
          : controlPanel}
      </div>
      <div
        ref={listRef}
        className={classNames(cls.list, listMods, [])}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandableContainer;
