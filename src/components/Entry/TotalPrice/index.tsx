'use client';

import React from 'react';

import { TotalPriceProps } from '@/components/Entry/TotalPrice/total-price.type';
import { IBarberServices } from '@/constants/barber-services';
import Tooltip from '@/components/Tooltip/Tooltip';

import cls from './style.module.scss';

const TotalPrice = ({ totalPrice, services, entryId }:TotalPriceProps) => (
  <div className={cls.totalPriceContainer}>
    <span
      data-tooltip-id={`price-list-${entryId}`}
    >
      {`${totalPrice}₴`}
    </span>
    <Tooltip id={`price-list-${entryId}`}>
      <ul className={cls.pricesList}>
        {services.map(({
          serviceName,
          price,
          id,
        }: IBarberServices) => (
          <li
            className={cls.price}
            key={id}
          >
            {`${serviceName}: ${price}₴`}
          </li>
        ))}
      </ul>
    </Tooltip>
  </div>
);

export default TotalPrice;
