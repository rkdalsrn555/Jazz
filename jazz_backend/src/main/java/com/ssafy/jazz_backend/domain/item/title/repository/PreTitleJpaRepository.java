package com.ssafy.jazz_backend.domain.item.title.repository;

import com.ssafy.jazz_backend.domain.item.title.entity.PreTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreTitleJpaRepository extends JpaRepository<PreTitle, Integer> {

}
