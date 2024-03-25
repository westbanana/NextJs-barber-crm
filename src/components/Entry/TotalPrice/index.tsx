'use client';

import React, { useState } from 'react';

import { TotalPriceProps } from '@/components/Entry/TotalPrice/total-price.type';
import { IBarberServices } from '@/constants/barber-services';

import cls from './style.module.scss';

const TotalPrice = ({ totalPrice, services }:TotalPriceProps) => {
  const [showPrices, setShowPrices] = useState<boolean>(false);
  const onMouseEnterHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrices(true);
  };

  const onMouseLeaveHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrices(false);
  };
  return (
    <div className={cls.totalPriceContainer}>
      <span
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {`${totalPrice}₴`}
      </span>
      {showPrices && (
        <div className={cls.pricesContainer}>
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
        </div>
      )}
    </div>
  );
};

export default TotalPrice;
