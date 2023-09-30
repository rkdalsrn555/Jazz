package com.ssafy.jazz_backend.domain.item.title.repository;

import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagementId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuffixTitleManagementJpaRepostiory extends JpaRepository<SuffixTitleManagement, SuffixTitleManagementId> {

}
