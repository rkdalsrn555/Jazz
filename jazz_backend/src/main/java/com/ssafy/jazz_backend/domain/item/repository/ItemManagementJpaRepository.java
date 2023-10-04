package com.ssafy.jazz_backend.domain.item.repository;

import com.ssafy.jazz_backend.domain.item.entity.Item;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagement;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagementId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemManagementJpaRepository extends JpaRepository<ItemManagement, ItemManagementId> {
    @Query(value = "SELECT item_id FROM item_management WHERE member_id = :memberId AND is_used = true", nativeQuery = true)
    Optional<Integer> findItemIdByMemberIdAndIsUsed(@Param("memberId") String memberId);
    List<ItemManagement> findAllByMemberIdAndIsOwn(String memberId, boolean isOwn);
}
