package com.ssafy.jazz_backend.domain.item.repository;

import com.ssafy.jazz_backend.domain.item.entity.ItemManagement;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagementId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemManagementJpaRepository extends JpaRepository<ItemManagement, ItemManagementId> {

}
