'use client';

import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import { TotalPriceProps } from '@/components/Entry/TotalPrice/total-price.type';
import { IBarberServices } from '@/constants/barber-services';

import cls from './style.module.scss';

const TotalPrice = ({ totalPrice, services, entryId }:TotalPriceProps) => {
  const [showPrices, setShowPrices] = useState<boolean>(false);
  const onMouseEnterHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrices(true);
  };

  const servicesList = services.map(({
    serviceName,
    price,
    id,
  }: IBarberServices) => (
    <li
      key={id}
    >
      {`${serviceName}: ${price}₴`}
    </li>
  ));
  const onMouseLeaveHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrices(false);
  };
  return (
    <div className={cls.totalPriceContainer}>
      <span
        data-tooltip-id={`my-tooltip${entryId}`}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {`${totalPrice}₴`}
      </span>
      <Tooltip id={`my-tooltip${entryId}`} place="bottom">
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
};

export default TotalPrice;
