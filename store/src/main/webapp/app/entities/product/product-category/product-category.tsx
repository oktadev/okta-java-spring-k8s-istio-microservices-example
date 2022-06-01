import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProductCategory } from 'app/shared/model/product/product-category.model';
import { getEntities } from './product-category.reducer';

export const ProductCategory = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const productCategoryList = useAppSelector(state => state.store.productCategory.entities);
  const loading = useAppSelector(state => state.store.productCategory.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="product-category-heading" data-cy="ProductCategoryHeading">
        <Translate contentKey="storeApp.productProductCategory.home.title">Product Categories</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="storeApp.productProductCategory.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/product-category/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="storeApp.productProductCategory.home.createLabel">Create new Product Category</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {productCategoryList && productCategoryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="storeApp.productProductCategory.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="storeApp.productProductCategory.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="storeApp.productProductCategory.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productCategoryList.map((productCategory, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/product-category/${productCategory.id}`} color="link" size="sm">
                      {productCategory.id}
                    </Button>
                  </td>
                  <td>{productCategory.name}</td>
                  <td>{productCategory.description}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/product-category/${productCategory.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/product-category/${productCategory.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/product-category/${productCategory.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="storeApp.productProductCategory.home.notFound">No Product Categories found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
