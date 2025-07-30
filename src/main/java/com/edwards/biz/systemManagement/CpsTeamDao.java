package com.edwards.biz.systemManagement;

import com.edwards.domains.CpsTeamVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsTeamDao extends JpaRepository<CpsTeamVO, BigDecimal> {
  List<CpsTeamVO> findAll(Specification<CpsTeamVO> specification, Pageable pageable);

  List<CpsTeamVO> findAll(Specification<CpsTeamVO> specification);
}