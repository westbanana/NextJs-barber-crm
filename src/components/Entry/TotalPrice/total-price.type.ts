import { IBarberServices } from '@/constants/barber-services';

export type TotalPriceProps = {
  services: IBarberServices[],
  entryId: string,
  totalPrice: number,
}
