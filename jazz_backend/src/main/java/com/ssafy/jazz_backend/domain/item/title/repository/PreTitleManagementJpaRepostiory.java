package com.ssafy.jazz_backend.domain.item.title.repository;

import com.ssafy.jazz_backend.domain.item.title.entity.PreTitle;
import com.ssafy.jazz_backend.domain.item.title.entity.PreTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.PreTitleManagementId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreTitleManagementJpaRepostiory extends JpaRepository<PreTitleManagement, PreTitleManagementId> {
    Optional<PreTitleManagement> findByMemberIdAndIsUsed(String memberId, boolean isUsed);
    List<PreTitleManagement> findAllByMemberIdAndIsOwn(String memberId, boolean isOwn);
}
