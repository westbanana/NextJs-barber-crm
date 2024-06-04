import React from 'react';

import Loader from '@components/LoadingProvider/Loader';

export interface LoadingProviderProps {
  children: React.ReactNode,
  isLoading: boolean,
  toastMode?: boolean
}

const LoadingProvider = ({ children, isLoading, toastMode = false }:LoadingProviderProps) => (
  <>
    {isLoading
      ? (!toastMode && (
        <Loader />
      )
      )
      : children}
  </>
);

export default LoadingProvider;
