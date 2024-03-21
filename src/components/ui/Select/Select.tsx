'use client';

import React, {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { ChevronDown } from 'lucide-react';

import { SelectProps } from '@/components/ui/Select/select.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import { outsideClick } from '@/helpers/outSideClick';
import Label from '@/components/Label/Label';

import { closeSelectTimeout } from './constants/close-select-timeout';
import cls from './style.module.scss';

const Select = ({
  data, callback, label, className, defaultValue = '',
}:SelectProps) => {
  const [result, setResult] = useState<string>(defaultValue || '');
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
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        setIsOpened(false);
      }, closeSelectTimeout);
    }
  }, [isOpened]);

  const selectItem = (el: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResult(el);
    closeHandler();
    callback?.(el);
  };

  const listMods: Mods = {
    [cls.isClosing]: isClosing,
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

  return (
    <div className={classNames(cls.mainContainer, {}, [className])} ref={refContainer}>
      <Label label={label} id={label} className={cls.label} />
      <div className={cls.resultWrapper} onClick={openSelectList}>
        <input type="text" readOnly className={cls.result} value={result} />
        {/* <span className={cls.result}>{result}</span> */}
        <ChevronDown className={cls.arrow} />
      </div>
      {isOpened && (
        <div className={classNames(cls.list, listMods, [])}>
          {data.map((item) => (
            <div
              key={item}
              className={cls.item}
              onClick={(e) => selectItem(item, e)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
