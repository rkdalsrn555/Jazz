package com.ssafy.jazz_backend.domain.item.title.repository;

import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuffixTitleJpaRepository extends JpaRepository<SuffixTitle, Integer> {

}
