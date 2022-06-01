import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/customer">
        <Translate contentKey="global.menu.entities.customer" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/product">
        <Translate contentKey="global.menu.entities.productProduct" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/product-category">
        <Translate contentKey="global.menu.entities.productProductCategory" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/product-order">
        <Translate contentKey="global.menu.entities.productProductOrder" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/order-item">
        <Translate contentKey="global.menu.entities.productOrderItem" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/invoice">
        <Translate contentKey="global.menu.entities.invoiceInvoice" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/shipment">
        <Translate contentKey="global.menu.entities.invoiceShipment" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/notification">
        <Translate contentKey="global.menu.entities.notificationNotification" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
