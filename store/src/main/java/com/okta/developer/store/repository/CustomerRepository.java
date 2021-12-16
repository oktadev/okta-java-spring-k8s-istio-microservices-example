package com.okta.developer.store.repository;

import com.okta.developer.store.domain.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data SQL reactive repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends R2dbcRepository<Customer, Long>, CustomerRepositoryInternal {
    Flux<Customer> findAllBy(Pageable pageable);

    @Query("SELECT * FROM customer entity WHERE entity.user_id = :id")
    Flux<Customer> findByUser(Long id);

    @Query("SELECT * FROM customer entity WHERE entity.user_id IS NULL")
    Flux<Customer> findAllWhereUserIsNull();

    // just to avoid having unambigous methods
    @Override
    Flux<Customer> findAll();

    @Override
    Mono<Customer> findById(Long id);

    @Override
    <S extends Customer> Mono<S> save(S entity);
}

interface CustomerRepositoryInternal {
    <S extends Customer> Mono<S> insert(S entity);
    <S extends Customer> Mono<S> save(S entity);
    Mono<Integer> update(Customer entity);

    Flux<Customer> findAll();
    Mono<Customer> findById(Long id);
    Flux<Customer> findAllBy(Pageable pageable);
    Flux<Customer> findAllBy(Pageable pageable, Criteria criteria);
}
