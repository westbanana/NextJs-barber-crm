import React, {
  Ref, RefObject, useEffect, useRef, useState,
} from 'react';

import Input from '@/components/ui/Input/Input';
import Portal from '@/components/Portal';
import { TimeSelectorProps } from '@/components/testPicker/time-picker.type';
import { outsideClick } from '@/helpers/outSideClick';

import cls from './style.module.scss';

const TimeSelector = React.forwardRef<HTMLDivElement, TimeSelectorProps>(({
  time, onChange, onClose, parentRef,
}) => {
  const refTimeSelector = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.addEventListener('click', (e) => {
        outsideClick(e, onClose, refTimeSelector);
      });
    }
    return () => {
      document.removeEventListener('click', (e) => {
        outsideClick(e, onClose, refTimeSelector);
      });
    };
  }, [onClose, mounted]);
  return (
    <Portal element={parentRef?.current}>
      <div className={cls.time} ref={refTimeSelector}>
        <Input
          min="0"
          max="24"
          onChange={(e) => onChange(e, 'from')}
          type="number"
          className={cls.input}
          label="Години"
          value={time.from}
        />
        :
        <Input
          onChange={(e) => onChange(e, 'to')}
          type="number"
          min="0"
          max="60"
          className={cls.input}
          label="Хвилини"
          value={time.to}
        />
      </div>
    </Portal>
  );
});
export default TimeSelector;
