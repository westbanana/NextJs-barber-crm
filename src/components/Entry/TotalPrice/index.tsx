'use client';

import React from 'react';

import cls from './style.module.scss';

import { TotalPriceProps } from '@/components/Entry/TotalPrice/total-price.type';
import { IBarberServices } from '@/constants/barber-services';
import Tooltip from '@/components/Tooltip/Tooltip';

const TotalPrice = ({ entry }:TotalPriceProps) => {
  const totalPrice = entry.services.reduce(
    (accumulator:number, currentValue:IBarberServices) => accumulator + currentValue.price,
    0,
  );
  return (
    <div className={cls.totalPriceContainer}>
      <span
        data-tooltip-id={`price-list-${entry.id}`}
      >
        {`${totalPrice}₴`}
      </span>
      <Tooltip id={`price-list-${entry.id}`} disabled={entry.completed}>
        <ul className={cls.pricesList}>
          {entry.services.map(({
            name,
            price,
            id,
          }: IBarberServices) => (
            <li
              className={cls.price}
              key={id}
            >
              {`${name}: ${price}₴`}
            </li>
          ))}
        </ul>
      </Tooltip>
    </div>
  );
};

export default TotalPrice;
