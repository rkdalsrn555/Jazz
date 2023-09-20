package com.ssafy.jazz_backend.domain.member.repository;

import com.ssafy.jazz_backend.domain.member.entity.Token;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {

    Optional<Token> findByRefreshToken(String refreshToken);
}

