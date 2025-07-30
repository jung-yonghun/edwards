package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdNaegukVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdNaegukDao extends JpaRepository<SooMst_CdNaegukVO, BigDecimal> {
  Page<SooMst_CdNaegukVO> findAll(Pageable pageable);

  List<SooMst_CdNaegukVO> findAll(Specification<SooMst_CdNaegukVO> specification, Sort sort);
}