package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdHsMate2VO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdHsMate2Dao extends JpaRepository<SooMst_CdHsMate2VO, BigDecimal> {
  Page<SooMst_CdHsMate2VO> findAll(Pageable pageable);

  List<SooMst_CdHsMate2VO> findAll(Specification<SooMst_CdHsMate2VO> specification, Sort sort);
}