package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdHsRateVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdHsRateDao extends JpaRepository<SooMst_CdHsRateVO, BigDecimal> {
  List<SooMst_CdHsRateVO> findAll(Specification<SooMst_CdHsRateVO> specification, Pageable pageable);
}