import React from 'react';
import CardBackground from '@components/ui/Card/CardBackground/CardBackground';
import { Portal } from '@mui/base';

const Card = ({ children }: {children: React.ReactNode}) => (
  <Portal>
    <CardBackground>
      {children}
    </CardBackground>
  </Portal>
);

export default Card;
