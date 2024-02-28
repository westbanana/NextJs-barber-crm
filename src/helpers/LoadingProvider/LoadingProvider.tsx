import React from 'react';
import { Loader } from 'lucide-react';

import cls from './style.module.scss';

export interface LoadingProviderProps {
  children: React.ReactNode,
  isLoading: boolean
}

const LoadingProvider = ({ children, isLoading }:LoadingProviderProps) => (
  <>
    {isLoading
      ? (
        <div className={cls.loaderBlock}>
          <Loader className={cls.loader} />
          Loading...
        </div>
      )
      : children}
  </>
);

export default LoadingProvider;
