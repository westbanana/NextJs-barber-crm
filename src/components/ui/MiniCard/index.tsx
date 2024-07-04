import React, {
  ComponentPropsWithoutRef, ElementType, HTMLAttributes, ReactNode,
} from 'react';

import { classNames, Mods } from '@lib/classNames/classNames';

import cls from './style.module.scss';

interface Controller {
  onClick?: () => void;
  tooltipId: string;
  className?: string;
  tagType?: ElementType;
  tagProps?: any;
  text: string | ReactNode;
}

interface MiniCardProps extends ComponentPropsWithoutRef<'div'>{
  children: ReactNode;
  className?: string;
  controllers?: {
    data: Controller[],
    disabled?: boolean,
  };
}
const mods: Mods = {};
const MiniCard = ({
  children, controllers, className, ...otherProps
}: MiniCardProps) => (
  <div
    className={classNames(cls.card, mods, [className])}
    {...otherProps}
  >
    {children}
    {(controllers?.data && !controllers?.disabled) && (
      <div className={classNames(cls.buttons, {}, [className])}>
        {controllers.data.map((controller) => {
          const Tag = controller.tagType || 'div';
          return (
            <Tag
              key={controller.text + controller.tooltipId}
              {...controller.tagProps}
              className={classNames(cls.button, {}, [className])}
              onClick={controller?.onClick}
              data-tooltip-id={controller?.tooltipId}
            >
              {controller?.text}
            </Tag>
          );
        })}
      </div>
    )}
  </div>
);

export default MiniCard;
