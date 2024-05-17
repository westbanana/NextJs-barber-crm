import React, { ComponentPropsWithoutRef, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

import { useCardContext } from '@components/ui/Card/provider';

import cls from './style.module.scss';

interface CardCloserProps extends ComponentPropsWithoutRef<'div'> {
  onClick?: () => void
}
const CardCloser = ({ onClick, ...props }:CardCloserProps) => {
  const { onClose } = useCardContext();

  const onEscapePress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', onEscapePress);
    return () => {
      document.removeEventListener('keydown', onEscapePress);
    };
  }, [onEscapePress]);
  const onClickHandler = () => {
    onClick?.();
    onClose();
  };
  return (
    <div
      onClick={onClickHandler}
      className={cls.xMark}
      {...props}
    >
      <X />
    </div>
  );
};

export default CardCloser;
