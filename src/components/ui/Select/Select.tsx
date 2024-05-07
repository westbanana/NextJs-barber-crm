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
  data, callback, label, className, defaultValue = [], selectMode = SelectMode.SINGLESELECT, disabled,
}:SelectProps) => {
  const selectData = data.length ? data : defaultValue;
  const [result, setResult] = useState<SelectItem[] | SelectItem>(defaultValue);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const refContainer = useRef<HTMLDivElement>(null);
  const resultTypeObject = typeof result === 'object';
  const openSelectList = () => {
    if (disabled) return;
    setIsOpened(true);
    setIsClosing(false);
    clearTimeout(timerRef.current);
  };

  const closeHandler = useCallback(() => {
    if (isOpened) {
      if (selectMode === SelectMode.MULTISELECT && Array.isArray(result)) {
        const ids = result.map((el:SelectItem) => typeof el !== 'string' && el.id);
        callback?.(ids as string[]);
      }
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        setIsOpened(false);
      }, closeSelectTimeout);
    }
  }, [callback, isOpened, result, selectMode]);

  const selectItem = (el: SelectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const elTypeObject = typeof el === 'object';
    const element = elTypeObject ? el.id : el;
    if (selectMode === SelectMode.MULTISELECT) {
      setResult((prev) => {
        const contained = elTypeObject
          ? (prev as SelectItem[]).some((item) => typeof item !== 'string' && item.id === element)
          : (prev as SelectItem[]).some((item) => item === element);
        if (contained) {
          return (prev as SelectItem[]).filter((item) => typeof item !== 'string' && item.id !== element);
        }
        return [el, ...(prev as SelectItem[])];
      });
    } else {
      setResult(el);
      closeHandler();
      callback?.(el);
    }
  };
  console.log(result);
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

  // TODO переделать логику если работаем с строками
  const resultStroke = Array.isArray(result) && true
    ? result.map((item) => typeof item !== 'string' && item?.name).join(',')
    : resultTypeObject && result.name
      ? result.name
      : result;

  return (
    <div
      className={classNames(cls.mainContainer, mainContainerMods, [className])}
      ref={refContainer}
      onClick={openSelectList}
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
            return (
              <div
                key={itemTypeObject ? item.id : item}
                className={classNames(
                  cls.item,
                  {
                    // TODO переделать логику если работаем с строками
                    [cls.selectedItem]: Array.isArray(result)
                      ? result.includes(item)
                      : (itemTypeObject && resultTypeObject) && result.id === item.id
                        ? result === item
                        : false,
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
