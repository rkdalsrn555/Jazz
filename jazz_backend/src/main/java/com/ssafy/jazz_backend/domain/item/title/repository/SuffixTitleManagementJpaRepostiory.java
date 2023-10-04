package com.ssafy.jazz_backend.domain.item.title.repository;

import com.ssafy.jazz_backend.domain.item.title.entity.PreTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagementId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuffixTitleManagementJpaRepostiory extends JpaRepository<SuffixTitleManagement, SuffixTitleManagementId> {
    Optional<SuffixTitleManagement> findByMemberIdAndIsUsed(String memberId, boolean isUsed);
    List<SuffixTitleManagement> findAllByMemberIdAndIsOwn(String memberId, boolean isOwn);
}
