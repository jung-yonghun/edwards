package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdBasMbkCountryVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdBasMbkCountryDao extends JpaRepository<SooMst_CdBasMbkCountryVO, BigDecimal> {
  Page<SooMst_CdBasMbkCountryVO> findAll(Pageable pageable);

  List<SooMst_CdBasMbkCountryVO> findAll(Specification<SooMst_CdBasMbkCountryVO> specification, Sort sort);
}