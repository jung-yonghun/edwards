package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdHsStdDtlVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdHsStdDtlDao extends JpaRepository<SooMst_CdHsStdDtlVO, BigDecimal> {
  Page<SooMst_CdHsStdDtlVO> findAll(Pageable pageable);

  List<SooMst_CdHsStdDtlVO> findAll(Specification<SooMst_CdHsStdDtlVO> specification, Sort sort);
}