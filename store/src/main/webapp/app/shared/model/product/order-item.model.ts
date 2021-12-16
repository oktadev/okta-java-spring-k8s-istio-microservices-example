import { IProduct } from 'app/shared/model/product/product.model';
import { IProductOrder } from 'app/shared/model/product/product-order.model';
import { OrderItemStatus } from 'app/shared/model/enumerations/order-item-status.model';

export interface IOrderItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  status?: OrderItemStatus;
  product?: IProduct;
  order?: IProductOrder;
}

export const defaultValue: Readonly<IOrderItem> = {};
