package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdBasTransVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdBasTransDao extends JpaRepository<SooMst_CdBasTransVO, BigDecimal> {
  Page<SooMst_CdBasTransVO> findAll(Pageable pageable);

  List<SooMst_CdBasTransVO> findAll(Specification<SooMst_CdBasTransVO> specification, Sort sort);
}