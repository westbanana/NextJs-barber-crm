import React, { ComponentPropsWithoutRef } from 'react';

import Button from '@components/ui/Button/Button';

interface CardButtonProps extends ComponentPropsWithoutRef<'button'> {
    onClick?: () => void;
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
      style={{
        color: 'var(--text-color)',
      }}
    >
      {children}
    </Button>
  );
};

export default CardButton;
