'use client';

import React from 'react';
import entry from 'next/dist/server/typescript/rules/entry';

import { TotalPriceProps } from '@/components/Entry/TotalPrice/total-price.type';
import { IBarberServices } from '@/constants/barber-services';
import Tooltip from '@/components/Tooltip/Tooltip';

import cls from './style.module.scss';

const TotalPrice = ({ entry }:TotalPriceProps) => {
  const totalPrice = entry?.services.reduce(
  // @ts-ignore
    (accumulator:number, currentValue:IBarberServices) => accumulator + (currentValue.price),
    0,
  );

  // переделать
  // @ts-ignore
  const servList: IBarberServices[] = entry.services;
  return (
    <div className={cls.totalPriceContainer}>
      <span
        data-tooltip-id={`price-list-${entry.id}`}
      >
        {`${totalPrice}₴`}
      </span>
      <Tooltip id={`price-list-${entry.id}`} disabled={entry.completed}>
        <ul className={cls.pricesList}>
          {servList.map(({
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
