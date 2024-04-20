'use client';

import React, {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { ChevronDown } from 'lucide-react';

import { SelectItem, SelectMode, SelectProps } from '@/components/ui/Select/select.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import { outsideClick } from '@/helpers/outSideClick';
import Label from '@/components/Label/Label';

import { closeSelectTimeout } from './constants/close-select-timeout';
import cls from './style.module.scss';

const Select = ({
  data, callback, label, className, defaultValue = [], selectMode = SelectMode.SINGLESELECT,
}:SelectProps) => {
  const selectData = data.length ? data : defaultValue;
  const [result, setResult] = useState<SelectItem[]>(defaultValue);
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
        callback?.(result);
      }
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        setIsOpened(false);
      }, closeSelectTimeout);
    }
  }, [callback, isOpened, result, selectMode]);

  const selectItem = (el: SelectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectMode === SelectMode.MULTISELECT) {
      setResult((prev) => {
        const contained = typeof el === 'object'
          ? prev.some((item) => item.id === el.id)
          : prev.some((item) => item === el);
        if (contained) {
          return prev.filter((item) => item.id !== el.id);
        }
        return [el, ...prev];
      });
    } else {
      setResult([el]);
      closeHandler();
      callback?.([el]);
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

  const resultStroke = typeof result[0] === 'string'
    ? result.join(',')
    : result.map((item) => item?.name).join(',');

  return (
    <div
      className={classNames(cls.mainContainer, mainContainerMods, [className])}
      ref={refContainer}
      onClick={openSelectList}
    >
      <Label label={label} id={label} className={cls.label} />
      <div className={cls.resultWrapper}>
        <div className={cls.result}>{resultStroke}</div>
        {/* <span className={cls.result}>{result}</span> */}
        <ChevronDown className={classNames(cls.arrow, arrowMods, [])} />
      </div>
      {isOpened && (
        <div className={classNames(cls.list, listMods, [])}>
          {selectData.map((item) => (
            <div
              key={typeof item === 'object' ? item.id : item}
              className={classNames(cls.item, { [cls.selectedItem]: result.some((el) => el.id === item.id) }, [])}
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
