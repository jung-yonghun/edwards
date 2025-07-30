package com.edwards.biz.complianceManagement;

import com.edwards.domains.CpsComplianceMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsComplianceMasterDao extends JpaRepository<CpsComplianceMasterVO, BigDecimal> {
  Page<CpsComplianceMasterVO> findAll(Specification<CpsComplianceMasterVO> specification, Pageable pageable);

  List<CpsComplianceMasterVO> findAll(Specification<CpsComplianceMasterVO> specification, Sort sort);

  List<CpsComplianceMasterVO> findAll(Specification<CpsComplianceMasterVO> specs);
}