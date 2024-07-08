'use client';

import React, {
  ComponentPropsWithoutRef, ReactNode, useEffect, useRef, useState,
} from 'react';
import { useTranslations } from 'next-intl';

import { classNames, Mods } from '@lib/classNames/classNames';
import Accordion from '@components/ui/Accordion/Accordion';
import Label from '@components/ui/Label/Label';
import useInFocus from '@lib/hooks/useInFocus';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import Tooltip from '@components/ui/Tooltip/Tooltip';

import cls from './style.module.scss';

interface ControlPanelElement {
  element: ReactNode,
  tooltip: string
}
interface ExpandableContainerProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode[] | ReactNode
  controlPanel?: ControlPanelElement[] | ControlPanelElement
  label: string
  loading?: boolean
  adaptiveListHeight?: boolean
  staticHeight?: boolean
  className?: string
}

const ExpandableContainer = ({
  children, controlPanel, label, loading = false, adaptiveListHeight = false, className, staticHeight = false,
}: ExpandableContainerProps) => {
  const t = useTranslations();
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

  useEffect(() => {
    const resizeHandler = () => {
      if (staticHeight) return;
      if (focusedRef.current && listRef.current) {
        if (listRef.current.scrollHeight <= focusedRef.current.clientHeight) {
          setShowAccordion(false);
        } else {
          setShowAccordion(true);
        }
      }
    };
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [focusedRef, showAccordion, loading, staticHeight]);
  const listMods: Mods = {
    [cls.emptyList]: Array.isArray(children) ? !children.length : children,
    [cls.openedList]: listOpened,
  };

  useEffect(() => {
    if (!adaptiveListHeight || staticHeight) return;
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
  }, [listOpened, adaptiveListHeight, focusedRef, children, staticHeight]);
  return (
    <div
      ref={focusedRef}
      className={classNames(cls.mainContainer, {}, ['afterLoading', className])}
    >
      <Label label={label} alwaysOnBorder />
      <div className={cls.controlPanel}>
        {showAccordion && (
          <div data-tooltip-id={`accordion-${label}`}>
            <Accordion
              dependencyState={listOpened}
              callback={toggleList}
              className={cls.todayEntriesAccordion}
            />
          </div>
        )}
        <Tooltip
          withPortal={false}
          id={`accordion-${label}`}
        >
          {listOpened ? t('accordion.collapse ') : t('accordion.expand')}
        </Tooltip>
        {Array.isArray(controlPanel)
          ? controlPanel.map((control, idx) => (
            <div
              data-tooltip-id={`panel-control-${control?.tooltip}${idx}`}
              key={`${control}`}
            >
              {control.element}
              <Tooltip
                id={`panel-control-${control?.tooltip}${idx}`}
              >
                {control.tooltip}
              </Tooltip>
            </div>
          ))
          : (
            <div
              data-tooltip-id={`panel-control-${controlPanel?.tooltip}`}
            >
              {controlPanel?.element}
              <Tooltip
                id={`panel-control-${controlPanel?.tooltip}`}
              >
                {controlPanel?.tooltip}
              </Tooltip>
            </div>
          )}
      </div>
      {loading
        ? (<Skeleton rounded height="135px" width="100%" />)
        : (
          <div
            ref={listRef}
            style={{
              height: listOpened && adaptiveListHeight ? listHeight : '',
            }}
            className={classNames(cls.list, listMods, [])}
          >
            {children}
          </div>
        )}
    </div>
  );
};

export default ExpandableContainer;
