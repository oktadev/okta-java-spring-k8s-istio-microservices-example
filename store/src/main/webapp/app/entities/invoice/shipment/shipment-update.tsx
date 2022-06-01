import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInvoice } from 'app/shared/model/invoice/invoice.model';
import { getEntities as getInvoices } from 'app/entities/invoice/invoice/invoice.reducer';
import { IShipment } from 'app/shared/model/invoice/shipment.model';
import { getEntity, updateEntity, createEntity, reset } from './shipment.reducer';

export const ShipmentUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const invoices = useAppSelector(state => state.store.invoice.entities);
  const shipmentEntity = useAppSelector(state => state.store.shipment.entity);
  const loading = useAppSelector(state => state.store.shipment.loading);
  const updating = useAppSelector(state => state.store.shipment.updating);
  const updateSuccess = useAppSelector(state => state.store.shipment.updateSuccess);
  const handleClose = () => {
    props.history.push('/shipment' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getInvoices({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...shipmentEntity,
      ...values,
      invoice: invoices.find(it => it.id.toString() === values.invoice.toString()),
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
          date: displayDefaultDateTime(),
        }
      : {
          ...shipmentEntity,
          date: convertDateTimeFromServer(shipmentEntity.date),
          invoice: shipmentEntity?.invoice?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="storeApp.invoiceShipment.home.createOrEditLabel" data-cy="ShipmentCreateUpdateHeading">
            <Translate contentKey="storeApp.invoiceShipment.home.createOrEditLabel">Create or edit a Shipment</Translate>
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
                  id="shipment-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('storeApp.invoiceShipment.trackingCode')}
                id="shipment-trackingCode"
                name="trackingCode"
                data-cy="trackingCode"
                type="text"
              />
              <ValidatedField
                label={translate('storeApp.invoiceShipment.date')}
                id="shipment-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('storeApp.invoiceShipment.details')}
                id="shipment-details"
                name="details"
                data-cy="details"
                type="text"
              />
              <ValidatedField
                id="shipment-invoice"
                name="invoice"
                data-cy="invoice"
                label={translate('storeApp.invoiceShipment.invoice')}
                type="select"
                required
              >
                <option value="" key="0" />
                {invoices
                  ? invoices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.code}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/shipment" replace color="info">
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

export default ShipmentUpdate;
