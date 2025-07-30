package com.edwards.biz.complianceManagement;

import com.edwards.domains.CpsComplianceItemVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsComplianceItemDao extends JpaRepository<CpsComplianceItemVO, BigDecimal> {
  Page<CpsComplianceItemVO> findAll(Specification<CpsComplianceItemVO> specification, Pageable pageable);

  List<CpsComplianceItemVO> findAll(Specification<CpsComplianceItemVO> specification, Sort sort);

  List<CpsComplianceItemVO> findAll(Specification<CpsComplianceItemVO> specs);
}