import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import Input from '@/components/ui/Input/Input';
import { TimeSelectorProps } from '@/components/testPicker/time-picker.type';
import { outsideClick } from '@/helpers/outSideClick';

import cls from './style.module.scss';

const TimeSelector = React.forwardRef<HTMLDivElement, TimeSelectorProps>(({
  time, onChange, onClose, parentRef, opened, parentId,
}) => {
  const refTimeSelector = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOutside = useCallback((e: MouseEvent) => {
    if (opened && refTimeSelector.current && parentRef && parentRef.current) {
      outsideClick(e, onClose, refTimeSelector, parentId);
    }
  }, [opened, onClose, parentRef, parentId]);

  useEffect(() => {
    if (mounted) {
      document.addEventListener('click', handleOutside);
    }
    return () => {
      document.removeEventListener('click', handleOutside);
    };
  }, [onClose, mounted, handleOutside]);

  return (
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
    // <Portal element={document.getElementById(parentId) as Element}>
    //
    // </Portal>
  );
});
export default TimeSelector;
