import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import CardBackground from '@components/ui/Card/CardBackground/CardBackground';
import { Portal } from '@mui/base';
import { Formik, FormikHandlers, FormikValues } from 'formik';
import { outsideClick } from '@helpers/outSideClick';
import CardCloser from '@components/ui/Card/CardCloser/CardCloser';
import { CardContext } from '@components/ui/Card/provider';
import CardButton from '@components/ui/Card/CardButton/CardButton';

import cls from './style.module.scss';

export type CardProps = {
  children: React.ReactNode | ((props: {
    values: FormikValues,
    handleChange: FormikHandlers['handleChange'],
    handleSubmit: FormikHandlers['handleSubmit'],
  }) => React.ReactNode),
  initialValues: any;
  onSubmit: (values: any) => void;
  onClose: () => void;
  outsideClickCondition?:boolean;
  validationSchema?: any;
  loading?: boolean;
}
const CardComponent = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  loading = false,
  outsideClickCondition = true,
  onClose,
}: CardProps) => {
  const refEditCard = useRef<HTMLFormElement>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (outsideClickCondition) {
      outsideClick(e, onClose, refEditCard);
    }
  }, [onClose, outsideClickCondition]);

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
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({
              handleSubmit,
              values,
              handleChange,
            }) => !loading && (
              (
                <form ref={refEditCard} className={cls.form} onSubmit={handleSubmit}>
                  {typeof children === 'function'
                    ? children({
                      values, handleChange, handleSubmit,
                    })
                    : children}
                </form>
              )
            )}
          </Formik>
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
