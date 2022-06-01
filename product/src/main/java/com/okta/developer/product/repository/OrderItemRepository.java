package com.okta.developer.product.repository;

import com.okta.developer.product.domain.OrderItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OrderItem entity.
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    default Optional<OrderItem> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<OrderItem> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<OrderItem> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct orderItem from OrderItem orderItem left join fetch orderItem.product left join fetch orderItem.order",
        countQuery = "select count(distinct orderItem) from OrderItem orderItem"
    )
    Page<OrderItem> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct orderItem from OrderItem orderItem left join fetch orderItem.product left join fetch orderItem.order")
    List<OrderItem> findAllWithToOneRelationships();

    @Query(
        "select orderItem from OrderItem orderItem left join fetch orderItem.product left join fetch orderItem.order where orderItem.id =:id"
    )
    Optional<OrderItem> findOneWithToOneRelationships(@Param("id") Long id);
}
