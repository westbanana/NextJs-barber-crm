'use client';

import React, {
  ComponentPropsWithoutRef, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';

import { classNames, Mods } from '@lib/classNames/classNames';
import Accordion from '@components/ui/Accordion/Accordion';
import Label from '@components/Label/Label';
import useInFocus from '@lib/hooks/useInFocus';
import Skeleton from '@components/ui/Skeleton/Skeleton';

import cls from './style.module.scss';

interface ExpandableContainerProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode[] | ReactNode
  controlPanel?: ReactNode[] | ReactNode
  label: string
  loading?: boolean
  adaptiveListHeight?: boolean
}

const ExpandableContainer = ({
  children, controlPanel, label, loading = false, adaptiveListHeight = false,
}: ExpandableContainerProps) => {
  const { focusedRef, setFocused, focused } = useInFocus();
  const [showAccordion, setShowAccordion] = useState<boolean>(false);
  const [listOpened, setListOpened] = useState<boolean>(focused);
  const listRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState<number>();
  const toggleList = () => {
    setListOpened((prev) => !prev);
    setFocused((prev) => !prev);
  };

  useEffect(() => {
    if (!focused && listOpened) {
      setListOpened(false);
    }
  }, [listOpened, focused]);

  const resizeHandler = () => {
    if (focusedRef.current && listRef.current) {
      if (listRef.current.scrollHeight <= focusedRef.current.clientHeight) {
        setShowAccordion(false);
      } else {
        setShowAccordion(true);
      }
    }
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [focusedRef, showAccordion]);

  const listMods: Mods = {
    [cls.emptyList]: Array.isArray(children) ? !children.length : children,
    [cls.openedList]: listOpened,
  };

  // TestFunction
  useEffect(() => {
    if (!adaptiveListHeight) return;
    const adaptiveListHeightHandler = () => {
      const containerWidth = listRef.current?.clientWidth;
      const containerHeight = focusedRef.current?.clientHeight;
      const childrenLength = Array.isArray(children) ? children.length + 1 : 1;
      const childrenWidth = childrenLength * 170;
      const rows = childrenWidth / containerWidth!!;
      return Math.ceil(rows) * containerHeight!!;
    };
    const height = adaptiveListHeightHandler();
    setListHeight(height);
  }, [listOpened, adaptiveListHeight, focusedRef, children]);

  return (loading
    ? <Skeleton rounded height={135} />
    : (
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
            ? controlPanel.map((element, idx) => <React.Fragment key={idx}>{element}</React.Fragment>)
            : controlPanel}
        </div>
        <div
          ref={listRef}
          style={{
            height: listOpened && adaptiveListHeight ? listHeight : '',
          }}
          className={classNames(cls.list, listMods, [])}
        >
          {children}
        </div>
      </div>
    )
  );
};

export default ExpandableContainer;
