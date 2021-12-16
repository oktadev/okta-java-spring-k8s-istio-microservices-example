import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import Product from './product/product';
import ProductCategory from './product/product-category';
import ProductOrder from './product/product-order';
import OrderItem from './product/order-item';
import Invoice from './invoice/invoice';
import Shipment from './invoice/shipment';
import Notification from './notification/notification';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}product-category`} component={ProductCategory} />
      <ErrorBoundaryRoute path={`${match.url}product-order`} component={ProductOrder} />
      <ErrorBoundaryRoute path={`${match.url}order-item`} component={OrderItem} />
      <ErrorBoundaryRoute path={`${match.url}invoice`} component={Invoice} />
      <ErrorBoundaryRoute path={`${match.url}shipment`} component={Shipment} />
      <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
