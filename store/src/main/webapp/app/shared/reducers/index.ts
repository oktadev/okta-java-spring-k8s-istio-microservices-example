import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from './user-management';
// prettier-ignore
import customer from 'app/entities/customer/customer.reducer';
// prettier-ignore
import product from 'app/entities/product/product/product.reducer';
// prettier-ignore
import productCategory from 'app/entities/product/product-category/product-category.reducer';
// prettier-ignore
import productOrder from 'app/entities/product/product-order/product-order.reducer';
// prettier-ignore
import orderItem from 'app/entities/product/order-item/order-item.reducer';
// prettier-ignore
import invoice from 'app/entities/invoice/invoice/invoice.reducer';
// prettier-ignore
import shipment from 'app/entities/invoice/shipment/shipment.reducer';
// prettier-ignore
import notification from 'app/entities/notification/notification/notification.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  customer,
  product,
  productCategory,
  productOrder,
  orderItem,
  invoice,
  shipment,
  notification,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
