import React, { Ref, RefObject } from 'react';

export type Time = {
  from: string;
  to: string;
};

export interface TimeSelectorProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Time) => void;
  time: Time;
  onClose: () => void;
  parentRef: RefObject<HTMLDivElement>| undefined;
}
