import customer from 'app/entities/customer/customer.reducer';
import product from 'app/entities/product/product/product.reducer';
import productCategory from 'app/entities/product/product-category/product-category.reducer';
import productOrder from 'app/entities/product/product-order/product-order.reducer';
import orderItem from 'app/entities/product/order-item/order-item.reducer';
import invoice from 'app/entities/invoice/invoice/invoice.reducer';
import shipment from 'app/entities/invoice/shipment/shipment.reducer';
import notification from 'app/entities/notification/notification/notification.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  customer,
  product,
  productCategory,
  productOrder,
  orderItem,
  invoice,
  shipment,
  notification,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
