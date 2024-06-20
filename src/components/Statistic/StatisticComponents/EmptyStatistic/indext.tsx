import React from 'react';

import cls from '../style.module.scss';

const EmptyStatistic = ({ description }: {description: string}) => (
  <div className={cls.emptyContainerInfo}>
    <span>
      {description}
    </span>
  </div>
);

export default EmptyStatistic;
