package com.ssafy.jazz_backend.domain.item.repository;

import com.ssafy.jazz_backend.domain.item.entity.Item;
import com.ssafy.jazz_backend.domain.item.entity.Kind;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemJpaRepository extends JpaRepository<Item, Integer> {
    Optional<List<Item>> findAllByKind(Kind kind);
}
