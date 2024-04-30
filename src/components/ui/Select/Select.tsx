'use client';

import React, {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { ChevronDown } from 'lucide-react';

import { closeSelectTimeout } from './constants/close-select-timeout';
import cls from './style.module.scss';

import { SelectItem, SelectMode, SelectProps } from '@/components/ui/Select/select.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import { outsideClick } from '@/helpers/outSideClick';
import Label from '@/components/Label/Label';

const Select = ({
  data, callback, label, className, defaultValue = [], selectMode = SelectMode.SINGLESELECT,
}:SelectProps) => {
  const selectData = data.length ? data : defaultValue;
  const [result, setResult] = useState<SelectItem[] | SelectItem>(defaultValue);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const refContainer = useRef<HTMLDivElement>(null);
  const openSelectList = () => {
    setIsOpened(true);
    setIsClosing(false);
    clearTimeout(timerRef.current);
  };

  const closeHandler = useCallback(() => {
    if (isOpened) {
      if (selectMode === SelectMode.MULTISELECT) {
        const ids = result.map((el:Sele) => el.id);
        callback?.(ids);
      }
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        setIsOpened(false);
      }, closeSelectTimeout);
    }
  }, [callback, isOpened, result, selectMode]);

  const selectItem = (el: SelectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = el.id || el;
    if (selectMode === SelectMode.MULTISELECT) {
      setResult((prev) => {
        const contained = typeof el === 'object'
          ? (prev as SelectItem[]).some((item) => item.id === element)
          : (prev as SelectItem[]).some((item) => item === element);
        if (contained) {
          return (prev as SelectItem[]).filter((item) => item.id !== element);
        }
        return [el, ...(prev as SelectItem[])];
      });
    } else {
      setResult(el);
      closeHandler();
      callback?.(el);
    }
  };

  const listMods: Mods = {
    [cls.isClosing]: isClosing,
  };

  const arrowMods: Mods = {
    // [cls.hiddenArrow]: !data.length,
  };

  const mainContainerMods: Mods = {
    // [cls.mainContainerDisabled]: !data.length,
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick(e, closeHandler, refContainer);
  }, [closeHandler]);

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, isOpened]);

  const resultStroke = Array.isArray(result) ? result.map((item) => item?.name).join(',') : result.name;

  return (
    <div
      className={classNames(cls.mainContainer, mainContainerMods, [className])}
      ref={refContainer}
      onClick={openSelectList}
    >
      <Label label={label} id={label} className={cls.label} />
      <div className={cls.resultWrapper}>
        <div className={cls.result}>{resultStroke}</div>
        <ChevronDown className={classNames(cls.arrow, arrowMods, [])} />
      </div>
      {isOpened && (
        <div className={classNames(cls.list, listMods, [])}>
          {selectData.map((item) => (
            <div
              key={typeof item === 'object' ? item.id : item}
              className={classNames(
                cls.item,
                {
                  [cls.selectedItem]: Array.isArray(result) ? result.includes(item) : result.id === item.id,
                },
                [],
              )}
              onClick={(e) => selectItem(item, e)}
            >
              {typeof item === 'object' ? item?.name : item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
