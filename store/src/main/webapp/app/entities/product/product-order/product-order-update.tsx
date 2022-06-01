import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProductOrder } from 'app/shared/model/product/product-order.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { getEntity, updateEntity, createEntity, reset } from './product-order.reducer';

export const ProductOrderUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const productOrderEntity = useAppSelector(state => state.store.productOrder.entity);
  const loading = useAppSelector(state => state.store.productOrder.loading);
  const updating = useAppSelector(state => state.store.productOrder.updating);
  const updateSuccess = useAppSelector(state => state.store.productOrder.updateSuccess);
  const orderStatusValues = Object.keys(OrderStatus);
  const handleClose = () => {
    props.history.push('/product-order' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.placedDate = convertDateTimeToServer(values.placedDate);

    const entity = {
      ...productOrderEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          placedDate: displayDefaultDateTime(),
        }
      : {
          status: 'COMPLETED',
          ...productOrderEntity,
          placedDate: convertDateTimeFromServer(productOrderEntity.placedDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="storeApp.productProductOrder.home.createOrEditLabel" data-cy="ProductOrderCreateUpdateHeading">
            <Translate contentKey="storeApp.productProductOrder.home.createOrEditLabel">Create or edit a ProductOrder</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="product-order-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('storeApp.productProductOrder.placedDate')}
                id="product-order-placedDate"
                name="placedDate"
                data-cy="placedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('storeApp.productProductOrder.status')}
                id="product-order-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {orderStatusValues.map(orderStatus => (
                  <option value={orderStatus} key={orderStatus}>
                    {translate('storeApp.OrderStatus.' + orderStatus)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('storeApp.productProductOrder.code')}
                id="product-order-code"
                name="code"
                data-cy="code"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('storeApp.productProductOrder.invoiceId')}
                id="product-order-invoiceId"
                name="invoiceId"
                data-cy="invoiceId"
                type="text"
              />
              <ValidatedField
                label={translate('storeApp.productProductOrder.customer')}
                id="product-order-customer"
                name="customer"
                data-cy="customer"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/product-order" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductOrderUpdate;
