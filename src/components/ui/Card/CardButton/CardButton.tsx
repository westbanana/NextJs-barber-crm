import React, { ComponentPropsWithoutRef } from 'react';
import Button from '@components/ui/Button/Button';
import { useCardContext } from '@components/ui/Card/provider';

interface CardButtonProps extends ComponentPropsWithoutRef<'button'> {
    onClick: () => void;
    loading?: boolean;
    children: React.ReactNode
}
const CardButton = ({ onClick, loading, children }:CardButtonProps) => {
  const onClickHandler = () => {
    onClick?.();
  };
  return (
    <Button
      onClick={onClickHandler}
      loading={loading}
    >
      {children}
    </Button>
  );
};

export default CardButton;
