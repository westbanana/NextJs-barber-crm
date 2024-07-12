import React, {
  RefObject,
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { Portal } from '@mui/base';

import CardBackground from '@components/ui/Card/CardBackground/CardBackground';
import { outsideClick } from '@helpers/outSideClick';
import CardCloser from '@components/ui/Card/CardCloser/CardCloser';
import { CardContext } from '@components/ui/Card/provider';
import CardButton from '@components/ui/Card/CardButton/CardButton';

export type CardProps<T> = {
  children: React.ReactNode,
  onClose: () => void;
  loading?: boolean;
  disabledOutsideClick?: boolean
}
const CardComponent = <T, >({
  children,
  loading = false,
  onClose,
  disabledOutsideClick = false,
}: CardProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick({
      event: e,
      callback: onClose,
      ref,
      disableClick: disabledOutsideClick,
    });
  }, [onClose, disabledOutsideClick]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, onClose]);

  const memoizeContextValue = useMemo(() => ({
    onClose,
  }), [onClose]);

  return (
    <CardContext.Provider value={memoizeContextValue}>
      <Portal>
        <CardBackground>
          {!loading && (
            <div ref={ref}>
              {children}
            </div>
          )}
        </CardBackground>
      </Portal>
    </CardContext.Provider>
  );
};
const Card = Object.assign(CardComponent, {
  Closer: CardCloser,
  Button: CardButton,
});
export default Card;
