import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

import cls from '@components/LoadingProvider/style.module.scss';

const Loader = () => (
  <div className={cls.loaderBlock}>
    <LoaderIcon className={cls.loader} />
  </div>
);

export default Loader;
