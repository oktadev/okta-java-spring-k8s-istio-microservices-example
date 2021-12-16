import dayjs from 'dayjs';
import { IOrderItem } from 'app/shared/model/product/order-item.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IProductOrder {
  id?: number;
  placedDate?: string;
  status?: OrderStatus;
  code?: string;
  invoiceId?: number | null;
  customer?: string;
  orderItems?: IOrderItem[] | null;
}

export const defaultValue: Readonly<IProductOrder> = {};
