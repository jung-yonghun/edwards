package com.edwards.biz.complianceManagement;

import com.edwards.domains.CpsComplianceApplyVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsComplianceApplyDao extends JpaRepository<CpsComplianceApplyVO, BigDecimal> {
  Page<CpsComplianceApplyVO> findAll(Specification<CpsComplianceApplyVO> specification, Pageable pageable);

  List<CpsComplianceApplyVO> findAll(Specification<CpsComplianceApplyVO> specification, Sort sort);

  List<CpsComplianceApplyVO> findAll(Specification<CpsComplianceApplyVO> specs);
}