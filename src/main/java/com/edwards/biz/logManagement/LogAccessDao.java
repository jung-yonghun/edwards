package com.edwards.biz.logManagement;

import com.edwards.domains.CpsLogAccessVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface LogAccessDao extends JpaRepository<CpsLogAccessVO, BigDecimal> {
  Page<CpsLogAccessVO> findAll(Specification<CpsLogAccessVO> specification, Pageable pageable);

  CpsLogAccessVO findTop1ByUserEmailOrderByLogKeyDesc(String userEmail);

  CpsLogAccessVO findTop1ByUserEmailAndSessionIdOrderByLogKeyDesc(String userEmail, String sessionId);

  int countByUserEmail(String userEmail);
}