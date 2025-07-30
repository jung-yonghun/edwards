package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdCstReDealVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdCstReDealDao extends JpaRepository<SooMst_CdCstReDealVO, BigDecimal> {
  Page<SooMst_CdCstReDealVO> findAll(Pageable pageable);

  List<SooMst_CdCstReDealVO> findAll(Specification<SooMst_CdCstReDealVO> specification, Sort sort);
}