import { ReactNode } from 'react';

import cls from './styles.module.scss';

export type CardBackgroundProps = {
  children: ReactNode
}

const CardBackground = ({ children }: CardBackgroundProps) => (
  <div className={cls.CardBackground}>
    {children}
  </div>
);

export default CardBackground;
