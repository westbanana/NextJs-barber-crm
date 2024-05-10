import React, { ComponentPropsWithoutRef } from 'react';
import { X } from 'lucide-react';
import { useCardContext } from '@components/ui/Card/provider';

import cls from './style.module.scss';

interface CardCloserProps extends ComponentPropsWithoutRef<'div'> {
  onClick?: () => void
}
const CardCloser = ({ onClick, ...props }:CardCloserProps) => {
  const { onClose } = useCardContext();
  const onClickHandler = () => {
    onClick?.();
    onClose();
    console.log('close card');
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
