package com.okta.developer.store.repository;

import com.okta.developer.store.domain.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data SQL reactive repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends ReactiveCrudRepository<Customer, Long>, CustomerRepositoryInternal {
    Flux<Customer> findAllBy(Pageable pageable);

    @Override
    Mono<Customer> findOneWithEagerRelationships(Long id);

    @Override
    Flux<Customer> findAllWithEagerRelationships();

    @Override
    Flux<Customer> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM customer entity WHERE entity.user_id = :id")
    Flux<Customer> findByUser(Long id);

    @Query("SELECT * FROM customer entity WHERE entity.user_id IS NULL")
    Flux<Customer> findAllWhereUserIsNull();

    @Override
    <S extends Customer> Mono<S> save(S entity);

    @Override
    Flux<Customer> findAll();

    @Override
    Mono<Customer> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface CustomerRepositoryInternal {
    <S extends Customer> Mono<S> save(S entity);

    Flux<Customer> findAllBy(Pageable pageable);

    Flux<Customer> findAll();

    Mono<Customer> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Customer> findAllBy(Pageable pageable, Criteria criteria);

    Mono<Customer> findOneWithEagerRelationships(Long id);

    Flux<Customer> findAllWithEagerRelationships();

    Flux<Customer> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
