package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdBLawCstmChkVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdBLawCstmChkDao extends JpaRepository<SooMst_CdBLawCstmChkVO, BigDecimal> {
  Page<SooMst_CdBLawCstmChkVO> findAll(Pageable pageable);

  List<SooMst_CdBLawCstmChkVO> findAll(Specification<SooMst_CdBLawCstmChkVO> specification, Sort sort);
}