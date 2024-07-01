'use client';

import React, {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { ChevronDown, Plus } from 'lucide-react';

import { SelectMode, SelectProps } from '@/components/ui/Select/select.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import { outsideClick } from '@/helpers/outSideClick';
import Label from '@/components/Label/Label';

import cls from './style.module.scss';
import { closeSelectTimeout } from './constants/close-select-timeout';

const Select = <T extends {id: string | undefined, name: string | undefined} >({
  data, callback, label, className, defaultValue = [], selectMode = SelectMode.SINGLESELECT, disabled,
}:SelectProps<T>) => {
  const selectData = data.length ? data : defaultValue;
  const [result, setResult] = useState<T[]>(defaultValue);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const refContainer = useRef<HTMLDivElement>(null);

  const closeHandler = useCallback(() => {
    if (isOpened) {
      if (selectMode === SelectMode.MULTISELECT && Array.isArray(result)) {
        callback?.(result);
      }
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        setIsOpened(false);
      }, closeSelectTimeout);
    }
  }, [isOpened, selectMode, result, callback]);

  const selectListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpened) {
      if (disabled) return;
      setIsOpened(true);
      setIsClosing(false);
      clearTimeout(timerRef.current);
    } else {
      closeHandler();
    }
  };

  const selectItem = (element: T, event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectMode === SelectMode.MULTISELECT) {
      const contained = result.some((item) => (item.id === element.id));
      if (contained) {
        setResult((prev) => prev.filter((item) => (item.id !== element.id)));
      } else {
        setResult((prev) => [element, ...prev]);
      }
    } else {
      setResult([element]);
      closeHandler();
      callback?.([element]);
    }
  };

  const listMods: Mods = {
    [cls.isClosing]: isClosing,
  };

  const arrowMods: Mods = {
    // [cls.hiddenArrow]: !data.length,
  };

  const mainContainerMods: Mods = {
    [cls.disabled]: disabled,
    // [cls.mainContainerDisabled]: !data.length,
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick({
      event: e,
      callback: closeHandler,
      ref: refContainer,
    });
  }, [closeHandler]);

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, isOpened]);

  const getResultStroke = (input: any): string => {
    if (Array.isArray(input)) {
      return input.map((item) => (item.name)).join(',');
    }
    return input.name;
  };
  const resultStroke = getResultStroke(result);
  return (
    <div
      className={classNames(cls.mainContainer, mainContainerMods, [className])}
      ref={refContainer}
      onClick={selectListToggle}
    >
      <Label label={label} id={label} className={cls.label} />
      <div className={cls.resultWrapper}>
        <div className={cls.result}>{resultStroke as string}</div>
        <ChevronDown className={classNames(cls.arrow, arrowMods, [])} />
      </div>
      {isOpened && (
        <div className={classNames(cls.list, listMods, [])}>
          {selectData.map((item) => {
            const itemTypeObject = typeof item === 'object';
            const key = itemTypeObject ? item.id : item;
            const selectedItem = result.find((element) => element.id === item.id);
            return (
              <div
                key={key}
                className={classNames(
                  cls.item,
                  {
                    [cls.selectedItem]: Boolean(selectedItem),
                  },
                  [],
                )}
                onClick={(e) => selectItem(item, e)}
              >
                {itemTypeObject ? item?.name : item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
